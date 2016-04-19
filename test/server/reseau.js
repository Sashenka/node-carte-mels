
var should = require('chai').should(),
    request = require('supertest'),
    app = require('../../server.js'),
    MELS_RESEAUX = require('../../app/models/MELS_RESEAUX.json');

describe('GET /reseau', function() {
    it('retourne la liste des Reseau', function(done) {
        request(app)
            .get('/api/reseau')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                res.body.should.have.property('types');
              })
            .expect(200, done);
    });

});

describe('GET /reseau/:sType', function() {
    it('erreur 404 si le paramètre ne fait pas partie de la liste des réseaux', function(done) {
        request(app)
            .get('/api/reseau/bob')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    
    MELS_RESEAUX.types.forEach(function(element) {
        it('retourne les points géographiques des établissements du réseau: ' + element.descr, function(done) {
            request(app)
                .get('/api/reseau/' + element.routeParamName)
                .expect('Content-Type', /geojson/)
                .expect(function(res) {
                    res.body.should.have.all.keys('type', 'crs', 'features');
                    res.body.features[0].properties.should.have.any.keys('adresse', 'nom', 'commission_scolaire', 'nom_immeuble');
                })
                .expect(200, done);
        });
    });
});

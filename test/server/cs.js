var should = require('chai').should(),
    request = require('supertest'),
    app = require('../../server.js');

describe('GET /cs', function() {
    it('retourne la liste des CS', function(done) {
        request(app)
            .get('/api/cs')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                res.body.should.have.property('types');
              })
            .expect(200, done);
    });

});

describe('GET /cs/:iCodeCS', function() {
    it('erreur 400 si le paramètre n\'est pas un entier (int)', function(done) {
        request(app)
            .get('/api/cs/bob')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
    
    it('retourne la Commission Scolaire qui correspond au code passé en paramètre', function(done) {
        request(app)
            .get('/api/cs/864000')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                res.body.should.have.all.keys('typeName', 'code_cs', 'nom_officiel_cs');
              })
            .expect(200, done);
    });

});

describe('GET /cs/:iCodeCS/limites', function() {
    it('erreur 400 si le paramètre n\'est pas un entier (int)', function(done) {
        request(app)
            .get('/api/cs/bob/limites')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
    
    it('retourne les limites géographiques de la Commission Scolaire qui correspond au code passé en paramètre', function(done) {
        request(app)
            .get('/api/cs/864000/limites')
            .expect('Content-Type', /geojson/)
            .expect(function(res) {
                res.body.should.have.all.keys('type', 'crs', 'features');
                res.body.features[0].properties.should.have.all.keys('code_cs', 'nom_officiel_cs', 'site_web');
              })
            .expect(200, done);
    });

});

describe('GET /cs/:iCodeCS/limites - CACHED', function() {
    it('retourne les limites géographiques de la Commission Scolaire qui correspond au code passé en paramètre', function(done) {
        request(app)
            .get('/api/cs/864000/limites')
            .expect('X-CACHED-RESPONSE', 1)
            .expect('Content-Type', /geojson/)
            .expect(200, done);
    });

});


describe('GET /cs/:iCodeCS/etablissements', function() {
    it('erreur 400 si le paramètre n\'est pas un entier (int)', function(done) {
        request(app)
            .get('/api/cs/bob/etablissements')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
    
    it('retourne les points géographiques des établissements de la Commission Scolaire qui correspond au code passé en paramètre', function(done) {
        request(app)
            .get('/api/cs/864000/etablissements')
            .expect('Content-Type', /geojson/)
            .expect(function(res) {
                res.body.should.have.all.keys('type', 'crs', 'features');
                res.body.features[0].properties.should.have.any.keys('commission_scolaire', 'nom_immeuble');
              })
            .expect(200, done);
    });

});

describe('GET /cs/:iCodeCS/etablissements - CACHED', function() {
    it('retourne les limites géographiques de la Commission Scolaire qui correspond au code passé en paramètre', function(done) {
        request(app)
            .get('/api/cs/864000/etablissements')
            .expect('X-CACHED-RESPONSE', 1)
            .expect('Content-Type', /geojson/)
            .expect(200, done);
    });

});
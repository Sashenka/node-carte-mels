Carte du réseau scolaire du Québec
=========

Cette application utilise les données ouvertes du gouvernement du Québec pour afficher une carte interactive du réseau scolaire de la province. Elle est disponible sur Heroku ([https://murmuring-springs-57223.herokuapp.com/](https://murmuring-springs-57223.herokuapp.com/)).

## API

### Commission scolaires

#### GET /api/cs
Retourne une liste des Commission scolaires du Québec, cette liste est maintenue manuellement dans un [fichier JSON](app/models/MELS_CS.json).

#### GET /api/cs/:CodeCS
Retourne une Commission scolaire spécifié par son Code CS. Par exemple, la CS Marie-Victorin est identifié par le code 864000.

Exemple:
```
GET /api/cs/864000
```

#### GET /api/cs/:CodeCS/limites
Retourne les limites géographiques de la Commission scolaire spécifier par son Code CS. Le format est en GeoJSON et utilise la projection EPSG:4326.

Exemple:
```
GET /api/cs/864000/limites
```

#### GET /api/cs/:CodeCS/etablissements
Retourne les établissements de la Commission scolaire spécifier par son Code CS. Le format est en GeoJSON et utilise la projection EPSG:4326.

Exemple:
```
GET /api/cs/864000/etablissements
```

### Réseaux

#### GET /api/reseau
Retourne une liste des réseaux scolaires du Québec, cette liste est maintenue manuellement dans un [fichier JSON](app/models/MELS_RESEAUX.json).

#### GET /api/reseau/:Type
Retourne les établissements du réseau spécifié par le type. Le format est en GeoJSON et utilise la projection EPSG:4326. Pour le moment les types de réseaux disponibles sont: ```public```, ```prive```, ```collegial``` et ```universitaire```.

Exemple:
```
GET /api/reseau/collegial
```

## Site Web
Le site web est assez simple. L'utilisateur peut choisir un réseau ou une Commission scolaire. Si une Commission scolaire est choisie, le polygone de ses limite géographiques sera dessiné sur la map et les marqueurs d'établissements rajoutés ensuite. Pour les réseaux, seuls les marqueurs d'établissements sont rajoutés puisque leur territoire est l'ensemble du Québec.

## Liens utiles

* Données ouvertes du gouvernement du Québec - [[LIEN]](https://www.donneesquebec.ca/fr/)
* La documentation d'un serveur WFS - [[LIEN]](http://docs.geoserver.org/stable/en/user/services/wfs/reference.html)
* La documentation sur les projections disponibles - [[LIEN]](http://spatialreference.org/)

## License
The MIT License (MIT)

Copyright (c) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
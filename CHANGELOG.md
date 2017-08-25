## [1.4.1] - 2017-08-25
### Modifié
- L'URL pour le serveur WFS a été modifié pour refléter les changements apportés par le MSPQ.

## [1.4.0] - 2016-11-03
### Ajouté
- L'adresse d'un établissement public est maintenant disponible et affiché lorsqu'il est sélectionné. Cette fonctionnalité était auparavant disponible seulement pour les établissements des autres réseaux.
- La liste des établissements est maintenant affiché dans une barre de navigation à droite de l'écran.

### Modifié
- La fonction ```buildUrl``` a été modifié. Elle construit le URL maintenant avec la fonction de filtrage ```PropertyIsEqualTo``` au lieu de ```PropertyIsLike``` puisque le Code CS est maintenant attribué aux établissements. Ceci permet une recherche par Code CS plutôt que par le nom de la CS.
- Dans l'optique de la modification précédente, la fonction ```replaceDiacritics``` n'est plus nécessaire et va être retiré.
- Correction de quelques fautes d'orthographes.
- Les deux encadrés d'information ainsi que l'attribution ont été déplacés dans le coin inférieur gauche pour laisser de l'espace pour la liste des établissements.
- ```server.all``` a été remplacé par ```server.get``` puisque seule les requête ```GET``` sont utilisés dans ce projet.
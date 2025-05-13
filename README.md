# Démarrage du projet en local

## Prérequis

- Node.js (version recommandée : 18.x ou supérieure)
- npm (généralement installé avec Node.js)
- Base de données (si nécessaire, configurez-la selon la documentation du projet)

## Installation

1.Installez les dépendances :
```bash
    npm install
```
    
2.Configurez les variables d'environnement :

    - Créez un fichier `.env` à la racine du projet.
    - Ajoutez les variables d'environnement nécessaires (voir `.env.example` pour un exemple).

4. Lancez le docker de développement :
```bash
   npm run docker:dev
```
   
6. Accédez à l'application dans votre navigateur à l'adresse suivante :
```
http://localhost:3000
```
   
# accéder à la Prod : 
```
https://cinemapi.voisincommecochon.fr/
```

# Swagger
```
https://cinemapi.voisincommecochon.fr/openapi
```

# Grafana
```
https://grafana.cinemapi.voisincommecochon.fr/
```

# Minio
```
https://minio.cinemapi.voisincommecochon.fr/
```
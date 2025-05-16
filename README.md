# CinemAPI

CinemAPI est une API RESTful développée dans le cadre d’un projet étudiant, permettant de gérer les films, les séances,
les réservations et le stockage de médias. Elle est construite avec NestJS et TypeScript, packagée et orchestrée en
Docker, et exposée via une documentation Swagger.

---

## Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Architecture & technologies](#architecture--technologies)
- [Installation & configuration](#installation--configuration)
- [Démarrage en développement](#démarrage-en-développement)
- [Docker & Docker Compose](#docker--docker-compose)
- [Qualité de code](#qualité-de-code)
- [Scripts utilitaires](#scripts-utilitaires)
- [Documentation de l’API](#documentation-de-lapi)
- [Surveillance & monitoring](#surveillance--monitoring)
- [Les contributeurs](#les-contributeurs)
- [Licence](#licence)

---

## Description

CinemAPI est une API back-end modulaire pour :

- 🚀 Gestion des films, des salles et des séances
- 🎟️ Réservations et billetterie
- 👤 Gestion des comptes utilisateurs et authentification JWT
- 📦 Stockage d’objets (images, affiches…) via MinIO
- 📊 Monitoring par Prometheus & Grafana

---

## Fonctionnalités

- **CRUD** complet pour chaque entité (films, séances, utilisateurs…)
- **Authentification** et **autorisation** via JWT
- **Validation** des entrées et gestion centralisée des erreurs
- **Sécurité** (CORS, helmet, rate limiting…)
- **Swagger (OpenAPI)** pour la doc interactive
- **Prometheus & Grafana** pour la collecte et la visualisation des métriques
- **GitHub Actions** pour l’intégration continue (lint, tests)

---

## Architecture & technologies

```bash
.
├── src/
│   ├── modules/       # Modules (Films, Séances, Utilisateurs…)
│   ├── common/        # Pipes, Guards, Interceptors, Filters…
│   └── main.ts        # Point d’entrée de l’application
├── scripts/
│   └── data-creator/  # Génération automatique de données de test
├── test/              # Tests e2e
├── compose.dev.yml    # Docker Compose pour le dev
├── compose.prod.yml   # Docker Compose pour la prod
├── Dockerfile         # Containerisation de l’API
├── CinemAPI.postman_collection.json
└── .env.example
```

- **Langage**: TypeScript
- **Framework**: [NestJS](https://nestjs.com/)
- **Base de données**: PostgreSQL (via TypeORM)
- **Stockage d’objets**: MinIO
- **Conteneurs**: Docker & Docker Compose
- **Monitoring**: Prometheus & Grafana
- **Tests**: Jest (unitaires & e2e)
- **Qualité de code**: ESLint, Prettier
- **CI/CD**: GitHub Actions

---

## Installation & configuration

### Prérequis

- Node.js ≥ 20.x
- npm (ou yarn)
- Docker & Docker Compose

### Étapes

1. **Cloner le projet**
   ```bash
   git clone https://github.com/enzomoy/CinemAPI.git
   cd CinemAPI
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d’environnement**
   ```bash
   cp .env.example .env
   ```
   Puis éditez `.env` pour renseigner vos accès à la base, à MinIO, au JWT, etc.

#### Exemple de `.env`

```dotenv
# PostgreSQL
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=cinemapi

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=minio123

# Auth
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=3600s

# Monitoring
PROMETHEUS_ENDPOINT=http://localhost:9090
GRAFANA_ENDPOINT=http://localhost:3001
```

---

## Démarrage en développement

```bash
npm run start:dev
```

L’API écoute par défaut sur `http://localhost:3000`.

---

## Docker & Docker Compose

Une stack prête à l’emploi est fournie pour lancer l’API et ses dépendances.

- **Développement**
  ```bash
  docker-compose -f compose.dev.yml up -d
  ```

- **Production (exemple)**
  ```bash
  docker-compose -f compose.prod.yml up -d
  ```

---

## Qualité de code

- **Lint** :
  ```bash
  npm run lint
  ```

- **Format** :
  ```bash
  npm run format
  ```

---

## Scripts utilitaires

- **Générer des données de test**
  ```bash
  node scripts/data-creator/index.js
  ```

- **Collection Postman**  
  Importez `CinemAPI.postman_collection.json` dans Postman pour tester rapidement tous les endpoints.

---

## Documentation de l’API

Une interface Swagger est disponible à :

```
http://localhost:3000/openapi
```

---

## Surveillance & monitoring

- **Prometheus** : `http://localhost:9090`
- **Grafana** : `http://localhost:3001`
- **MinIO Console** : `http://localhost:9001`

---

## Les contributeurs

- [Mathis Fremiot](https://github.com/Spykoninho)
- [Enzo Moy](https://github.com/enzomoy)
- [Yoran Thierry](https://github.com/Yoploo)

---

## Licence

Ce projet est sous licence **MIT**.  
Voir [LICENSE](LICENSE) pour les détails.

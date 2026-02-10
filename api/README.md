# 🔌 API Keystone.js - Test Technique Mü être

Cette API est **déjà configurée** pour vous ! Vous n'avez pas besoin de modifier ce code.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Lancer l'API en mode développement
npm run dev
```

L'API sera accessible sur **http://localhost:3000**

## 🎮 Interface d'administration

Une fois l'API lancée, vous pouvez accéder à :

- **Admin UI** : http://localhost:3000 (pour gérer les données manuellement)
- **GraphQL Playground** : http://localhost:3000/api/graphql (pour tester vos requêtes)

## 📊 Modèle de données

### Survey (Sondage)
- `id` : Identifiant unique
- `title` : Titre du sondage
- `description` : Description du sondage
- `questions` : Liste des questions associées
- `createdAt` : Date de création

### Question
- `id` : Identifiant unique
- `text` : Texte de la question
- `survey` : Sondage parent
- `responses` : Liste des réponses reçues

### Response (Réponse)
- `id` : Identifiant unique
- `question` : Question associée
- `rating` : Note de 1 à 5
- `userName` : Nom de l'utilisateur (optionnel)
- `createdAt` : Date de réponse

## 🎯 Données de test

Au premier lancement, l'API créera automatiquement un sondage d'exemple avec quelques questions pour vous permettre de tester rapidement.

Si vous voulez ajouter plus de données, utilisez l'interface d'administration : http://localhost:3000

## 📝 Exemples de requêtes GraphQL

### Récupérer tous les sondages

```graphql
query {
  surveys {
    id
    title
    description
    questions {
      id
      text
    }
  }
}
```

### Récupérer un sondage spécifique

```graphql
query GetSurvey($id: ID!) {
  survey(where: { id: $id }) {
    id
    title
    description
    questions {
      id
      text
    }
  }
}
```

Variables :
```json
{
  "id": "clxxx..."
}
```

### Créer une réponse

```graphql
mutation CreateResponse($questionId: ID!, $rating: Int!, $userName: String) {
  createResponse(data: {
    question: { connect: { id: $questionId } }
    rating: $rating
    userName: $userName
  }) {
    id
    rating
    createdAt
  }
}
```

Variables :
```json
{
  "questionId": "clxxx...",
  "rating": 4,
  "userName": "Jean Dupont"
}
```

### Obtenir les statistiques

```graphql
query GetStats {
  questions {
    id
    text
    responses {
      rating
    }
  }
}
```

Ensuite, calculez les moyennes côté frontend :
```javascript
const averageRating = responses.reduce((sum, r) => sum + r.rating, 0) / responses.length;
```

## 🔧 Configuration CORS

L'API est configurée pour accepter les requêtes depuis :
- `http://localhost:3001` (votre frontend Next.js)

Si vous utilisez un autre port, modifiez le fichier `keystone.ts`.

## ⚠️ Note importante

**Vous n'avez PAS besoin de modifier le code de cette API** pour réussir le test. Elle est déjà complète et fonctionnelle.

Concentrez-vous sur le développement du frontend Next.js !

---

Bon développement ! 🚀

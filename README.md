# 🎯 Test Technique - Mü être

Bienvenue dans le test technique pour le poste de stagiaire développeur chez Mü être !

## 📝 Contexte

Vous allez créer une mini-application de **sondage bien-être** permettant aux employés d'une entreprise de répondre à des questions quotidiennes sur leur état d'esprit au travail.

## 🎯 Objectif

Développer une interface frontend en **Next.js** qui communique avec l'API Keystone.js fournie pour :

- Afficher les sondages disponibles
- Permettre aux utilisateurs de répondre aux questions
- Visualiser les résultats de manière simple

## ⏱️ Durée estimée

**3 à 4 heures** (vous pouvez prendre plus de temps si nécessaire)

## 🚀 Installation

### Prérequis

- Node.js 18+ installé
- npm ou yarn

### Étapes

1. **Cloner le repository**

```bash
git clone [URL_DU_REPO]
cd test-technique-muetre
```

2. **Installer les dépendances de l'API**

```bash
cd api
npm install
```

3. **Créer le fichier .env pour l'API**

```bash
cp .env.example .env
```

4. **Lancer l'API Keystone.js**

```bash
npm run dev
```

L'API sera accessible sur http://localhost:3000

5. **Installer les dépendances du frontend (dans un nouveau terminal)**

```bash
cd ../frontend
npm install
```

6. **Créer le fichier .env.local pour le frontend**

```bash
cp .env.example .env.local
```

7. **Lancer le frontend Next.js**

```bash
npm run dev
```

Le frontend sera accessible sur http://localhost:3001

## 📋 Fonctionnalités attendues

### 🎨 Frontend (Next.js)

#### Page 1 : Liste des sondages (`/`)

- Afficher tous les sondages disponibles
- Chaque sondage doit montrer : titre, description, nombre de questions
- Bouton "Répondre" pour accéder au sondage

#### Page 2 : Questionnaire (`/survey/[id]`)

- Afficher les questions du sondage sélectionné
- Pour chaque question : afficher le texte et permettre de noter de 1 à 5 étoiles
- Bouton "Soumettre" pour envoyer les réponses
- Rediriger vers la page de remerciement après soumission

#### Page 3 : Résultats (`/results`)

- Afficher les statistiques globales des réponses
- Pour chaque question : montrer la note moyenne
- Bonus : graphique simple (barre ou ligne)

### 🔌 API GraphQL (déjà fournie)

L'API Keystone.js est déjà configurée avec :

**Schéma de données** :

```graphql
type Survey {
  id: ID!
  title: String!
  description: String
  questions: [Question]
  createdAt: DateTime
}

type Question {
  id: ID!
  text: String!
  survey: Survey
  responses: [Response]
}

type Response {
  id: ID!
  question: Question
  rating: Int! # Note de 1 à 5
  userName: String
  createdAt: DateTime
}
```

**Requêtes GraphQL disponibles** :

1. Récupérer tous les sondages :

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

2. Récupérer un sondage spécifique :

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

3. Créer une réponse :

```graphql
mutation CreateResponse($questionId: ID!, $rating: Int!, $userName: String) {
  createResponse(
    data: {
      question: { connect: { id: $questionId } }
      rating: $rating
      userName: $userName
    }
  ) {
    id
    rating
  }
}
```

4. Obtenir les statistiques :

```graphql
query {
  questions {
    id
    text
    responses {
      rating
    }
  }
}
```

## 🎨 Contraintes techniques

- **Framework Frontend** : Next.js 14+ (App Router ou Pages Router, au choix)
- **Styling** : Tailwind CSS (déjà configuré) ou CSS modules
- **Client GraphQL** : Apollo Client, urql, ou fetch natif
- **TypeScript** : Optionnel mais apprécié

## 🎁 Fonctionnalités bonus (optionnelles)

- ✨ Animations fluides lors de la navigation
- 📊 Graphiques pour visualiser les résultats (Chart.js, Recharts...)
- ✅ Validation des formulaires
- ⚡ États de chargement et messages d'erreur
- 🧪 Tests unitaires (Jest, React Testing Library)
- 📱 Design mobile-first impeccable
- 🎨 Mode sombre
- 💾 Persistance locale des réponses en cours (localStorage)

## 📤 Livraison

1. Créer un fork de ce repository
2. Développer votre solution
3. Commit régulièrement avec des messages clairs
4. Envoyer le lien du repo GitHub par email

**OU**

1. Télécharger le zip de votre code
2. Envoyer par email avec un README expliquant votre approche

## 💡 Conseils

- **Commencez simple** : Faites d'abord fonctionner les fonctionnalités de base
- **Testez régulièrement** : Vérifiez que l'API répond correctement avec GraphQL Playground (http://localhost:3000/api/graphql)
- **Design épuré** : Pas besoin d'être trop complexe, privilégiez la clarté
- **Documentation** : Commentez votre code et expliquez vos choix dans le README
- **Git** : Faites des commits réguliers et explicites

## 🆘 Besoin d'aide ?

- Documentation Keystone.js : https://keystonejs.com/docs
- Documentation Next.js : https://nextjs.org/docs
- GraphQL Playground : http://localhost:3000/api/graphql (une fois l'API lancée)

## 📞 Contact

En cas de problème technique bloquant, n'hésitez pas à nous contacter : [muetre08@gmail.com]

---

**Bon courage ! 🚀**

Nous avons hâte de voir votre travail !

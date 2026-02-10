# 🎨 Frontend Next.js - Test Technique Mü être

C'est ici que vous allez développer votre solution !

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur **http://localhost:3001**

## 📁 Structure du projet

```
frontend/
├── pages/              # Pages Next.js (Pages Router)
│   ├── index.tsx      # Page d'accueil - Liste des sondages
│   ├── survey/
│   │   └── [id].tsx   # Page de questionnaire
│   └── results.tsx    # Page des résultats
├── components/         # Composants réutilisables
├── lib/               # Utilitaires et configuration
│   └── graphql.ts     # Client GraphQL
└── styles/            # Styles globaux
```

**OU** si vous préférez App Router :

```
frontend/
├── app/
│   ├── page.tsx           # Page d'accueil
│   ├── survey/
│   │   └── [id]/page.tsx  # Page de questionnaire
│   └── results/page.tsx   # Page des résultats
├── components/
└── lib/
```

## 🎯 Votre mission

Développer les 3 pages suivantes qui communiquent avec l'API Keystone.js :

### 1️⃣ Page d'accueil (`/`)

- Afficher la liste des sondages
- Pour chaque sondage : titre, description, nombre de questions
- Bouton "Répondre" qui redirige vers `/survey/[id]`

### 2️⃣ Page de questionnaire (`/survey/[id]`)

- Afficher le titre et la description du sondage
- Lister toutes les questions
- Pour chaque question : système de notation 1-5 étoiles
- Champ optionnel pour le nom de l'utilisateur
- Bouton "Soumettre" qui envoie les réponses
- Redirection vers une page de confirmation

### 3️⃣ Page de résultats (`/results`)

- Afficher les statistiques globales
- Pour chaque question : note moyenne
- Bonus : graphique visuel des résultats

## 🔌 Connexion à l'API

### Option 1 : graphql-request (simple)

```typescript
// lib/graphql.ts
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql",
);
```

```typescript
// Exemple d'utilisation dans une page
import { client } from "@/lib/graphql";

const GET_SURVEYS = `
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
`;

export async function getServerSideProps() {
  const data = await client.request(GET_SURVEYS);
  return { props: { surveys: data.surveys } };
}
```

### Option 2 : fetch natif

```typescript
const response = await fetch("http://localhost:3000/api/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      query {
        surveys {
          id
          title
        }
      }
    `,
  }),
});
const { data } = await response.json();
```

## 🎨 Design

Vous êtes libre dans votre approche design, mais voici quelques suggestions :

- **Couleurs** : Violet (#7C3AED) et Jaune (#FBBF24) pour rappeler Mü être
- **Typographie** : Police claire et moderne (Inter, Poppins, etc.)
- **Espacements** : Interface aérée et lisible
- **Mobile-first** : Pensez responsive dès le début

## ✅ Checklist

Avant de soumettre, vérifiez que :

- [ ] L'application se lance sans erreur (`npm run dev`)
- [ ] Les 3 pages principales sont fonctionnelles
- [ ] Les données sont correctement récupérées depuis l'API
- [ ] Les réponses sont bien enregistrées dans la base
- [ ] L'interface est responsive (mobile + desktop)
- [ ] Le code est propre et commenté si nécessaire
- [ ] Les états de chargement sont gérés
- [ ] Les erreurs sont affichées à l'utilisateur

## 🎁 Bonus (optionnels)

- [ ] Animations fluides (transitions, hover effects)
- [ ] Validation des formulaires
- [ ] Graphiques pour les résultats (Chart.js, Recharts)
- [ ] Tests unitaires
- [ ] Mode sombre
- [ ] Persistance locale (localStorage)
- [ ] Progressive Web App (PWA)

## 📚 Ressources utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [graphql-request](https://github.com/jasonkuhrt/graphql-request)
- [Recharts (graphiques)](https://recharts.org/)

---

**Bon courage ! 🚀**

N'oubliez pas : commencez simple et ajoutez des fonctionnalités progressivement.

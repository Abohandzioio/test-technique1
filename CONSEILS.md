# 💡 Conseils & Astuces - Test Technique

Ce document contient des conseils utiles pour vous aider à réussir le test.

---

## 🚀 Par où commencer ?

### Étape 1 : Vérifier que tout fonctionne

1. Lancer l'API Keystone (`cd api && npm run dev`)
2. Vérifier que l'API répond sur http://localhost:3000
3. Tester une requête dans GraphQL Playground : http://localhost:3000/api/graphql
4. Lancer le frontend (`cd frontend && npm run dev`)
5. Vérifier que la page d'accueil s'affiche sur http://localhost:3001

### Étape 2 : Comprendre l'architecture

- L'API est **déjà prête**, vous n'avez rien à modifier
- Votre travail se concentre sur le **dossier frontend/**
- Utilisez les exemples de requêtes GraphQL fournis dans `lib/graphql.ts`

### Étape 3 : Développer progressivement

1. **D'abord la page d'accueil** (liste des sondages)
2. **Ensuite la page de questionnaire** (formulaire de réponses)
3. **Enfin la page de résultats** (statistiques)

## 📚 Ressources utiles

### Documentation officielle

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GraphQL](https://graphql.org/learn/)

### Outils de développement

- **React Developer Tools** (Extension Chrome/Firefox)
- **Console du navigateur** (F12) pour voir les erreurs
- **GraphQL Playground** http://localhost:3000/api/graphql

### Recherche d'aide

Si vous bloquez :

1. Relisez la documentation du test
2. Consultez les exemples de code fournis
3. Cherchez sur Google / Stack Overflow

**Astuce :** Soyez précis dans vos recherches :

- ❌ "Comment faire une API ?"
- ✅ "How to fetch GraphQL data in Next.js useEffect"

---

## ✅ Checklist avant de soumettre

- [ ] L'application se lance sans erreur (`npm run dev`)
- [ ] Les 3 pages principales sont accessibles
- [ ] Les données sont récupérées depuis l'API
- [ ] Les réponses sont bien enregistrées
- [ ] L'interface est responsive (tester sur mobile)
- [ ] Le code est propre (pas de console.log inutiles)
- [ ] Les états de chargement sont gérés
- [ ] Les erreurs sont affichées à l'utilisateur
- [ ] Le README a été mis à jour (optionnel)
- [ ] Les commits Git sont clairs

---

**Bon courage ! Vous avez tout ce qu'il faut pour réussir ! 🚀**

import { Context } from '.keystone/types';

export async function insertSeedData(context: Context) {
  console.log('🌱 Insertion des données de test...');

  // Vérifier si des sondages existent déjà
  const existingSurveys = await context.query.Survey.findMany();
  
  if (existingSurveys.length > 0) {
    console.log('✅ Des données existent déjà, seed ignoré.');
    return;
  }

  // Créer un sondage avec questions
  const survey = await context.query.Survey.createOne({
    data: {
      title: 'Sondage bien-être quotidien',
      description: 'Quelques questions pour évaluer votre bien-être au travail aujourd\'hui',
      questions: {
        create: [
          { text: 'Comment vous sentez-vous aujourd\'hui au travail ?' },
          { text: 'Êtes-vous satisfait de votre charge de travail ?' },
          { text: 'Comment évaluez-vous votre équilibre vie pro/vie perso ?' },
          { text: 'Vous sentez-vous soutenu par votre équipe ?' },
          { text: 'Recommanderiez-vous votre entreprise comme lieu de travail ?' },
        ],
      },
    },
    query: 'id title questions { id text }',
  });

  console.log('✅ Sondage créé avec succès !');
  console.log(`   Titre: ${survey.title}`);
  console.log(`   Nombre de questions: ${survey.questions.length}`);

  // Ajouter quelques réponses fictives pour tester les statistiques
  const questionIds = survey.questions.map((q: any) => q.id);
  
  for (const questionId of questionIds) {
    // Créer 5 réponses aléatoires pour chaque question
    for (let i = 0; i < 5; i++) {
      const randomRating = Math.floor(Math.random() * 5) + 1; // 1 à 5
      await context.query.Response.createOne({
        data: {
          question: { connect: { id: questionId } },
          rating: randomRating,
          userName: `Utilisateur ${i + 1}`,
        },
      });
    }
  }

  console.log('✅ 25 réponses fictives créées pour les statistiques');
  console.log('🎉 Base de données initialisée avec succès !');
}

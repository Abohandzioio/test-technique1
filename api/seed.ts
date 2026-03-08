import { Context } from '.keystone/types';

export async function insertSeedData(context: Context) {
  console.log('🌱 Insertion des données de test...');

  // Vérifier si des sondages existent déjà
  const existingSurveys = await context.query.Survey.findMany();

  if (existingSurveys.length > 0) {
    console.log('✅ Des données existent déjà, seed ignoré.');
    return;
  }

  const surveysToCreate = [
    {
      title: 'Sondage bien-être quotidien',
      description: 'Quelques questions pour évaluer votre bien-être au travail aujourd\'hui',
      questions: [
        'Comment vous sentez-vous aujourd\'hui au travail ?',
        'Êtes-vous satisfait de votre charge de travail ?',
        'Comment évaluez-vous votre équilibre vie pro/vie perso ?',
        'Vous sentez-vous soutenu par votre équipe ?',
        'Recommanderiez-vous votre entreprise comme lieu de travail ?',
      ],
    },
    {
      title: 'Évaluation du Télétravail',
      description: 'Donnez-nous votre avis sur l\'organisation du travail à distance.',
      questions: [
        'Avez-vous tout l\'équipement nécessaire pour télétravailler ?',
        'Arrivez-vous à vous déconnecter en fin de journée ?',
        'La communication avec vos collègues est-elle fluide à distance ?',
        'Préférez-vous le présentiel ou le distanciel ?',
      ],
    },
    {
      title: 'Développement Professionnel',
      description: 'Sondage sur vos perspectives d\'évolution et vos besoins en formation.',
      questions: [
        'Pensez-vous avoir des perspectives de croissance dans l\'entreprise ?',
        'Êtes-vous satisfait des formations proposées ?',
        'Avez-vous des objectifs clairs pour l\'année à venir ?',
        'Votre manager vous aide-t-il dans votre progression ?',
      ],
    },
    {
      title: 'Ambiance et Culture d\'Entreprise',
      description: 'Évaluons ensemble l\'atmosphère au sein de nos locaux.',
      questions: [
        'Trouvez-vous les locaux agréables ?',
        'Partagez-vous les valeurs de l\'entreprise ?',
        'Y a-t-il une bonne cohésion au sein de votre service ?',
        'Vous sentez-vous libre d\'exprimer vos idées ?',
      ],
    },
    {
      title: 'Équilibre et Santé',
      description: 'Un court sondage sur votre santé physique et mentale au quotidien.',
      questions: [
        'Prenez-vous des pauses régulières ?',
        'Votre environnement de travail est-il trop bruyant ?',
        'Ressentez-vous du stress lié à vos objectifs ?',
        'Dormez-vous suffisamment les jours de travail ?',
      ],
    },
  ];

  for (const surveyData of surveysToCreate) {
    // Créer un sondage avec questions
    const survey = await context.query.Survey.createOne({
      data: {
        title: surveyData.title,
        description: surveyData.description,
        questions: {
          create: surveyData.questions.map(text => ({ text })),
        },
      },
      query: 'id title questions { id text }',
    });

    console.log(`✅ Sondage "${survey.title}" créé avec ${survey.questions.length} questions.`);

    // Ajouter quelques réponses fictives pour tester les statistiques
    for (const question of survey.questions) {
      // Créer 5 réponses aléatoires pour chaque question
      for (let i = 0; i < 5; i++) {
        const randomRating = Math.floor(Math.random() * 5) + 1; // 1 à 5
        await context.query.Response.createOne({
          data: {
            question: { connect: { id: question.id } },
            rating: randomRating,
            userName: `Utilisateur ${i + 1}`,
          },
        });
      }
    }
  }

  console.log('✅ Réponses fictives créées pour tous les sondages.');
  console.log('🎉 Base de données initialisée avec succès !');
}


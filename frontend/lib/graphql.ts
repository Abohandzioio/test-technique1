// Exemple de configuration du client GraphQL
// Vous pouvez utiliser graphql-request ou fetch natif

import { GraphQLClient } from "graphql-request";

// Client GraphQL pour communiquer avec l'API Keystone
export const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql",
  {
    headers: {
      "Content-Type": "application/json",
    },
  },
);

// Exemples de requêtes GraphQL que vous pouvez utiliser

export const GET_SURVEYS = `
  query GetSurveys {
    surveys {
      id
      title
      description
      createdAt
      questions {
        id
        text
      }
    }
  }
`;

export const GET_SURVEY_BY_ID = `
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
`;

export const CREATE_RESPONSE = `
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
      userName
      createdAt
    }
  }
`;

export const GET_QUESTIONS_WITH_RESPONSES = `
  query GetQuestionsWithResponses {
    questions {
      id
      text
      survey {
        id
        title
      }
      responses {
        id
        rating
        userName
        createdAt
      }
    }
  }
`;

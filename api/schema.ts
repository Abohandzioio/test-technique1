import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  timestamp,
  integer,
} from '@keystone-6/core/fields';

export const lists = {
  Survey: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: 'textarea' } }),
      questions: relationship({
        ref: 'Question.survey',
        many: true,
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Question: list({
    access: allowAll,
    fields: {
      text: text({ validation: { isRequired: true } }),
      survey: relationship({
        ref: 'Survey.questions',
      }),
      responses: relationship({
        ref: 'Response.question',
        many: true,
      }),
    },
  }),

  Response: list({
    access: allowAll,
    fields: {
      question: relationship({
        ref: 'Question.responses',
      }),
      rating: integer({
        validation: {
          isRequired: true,
          min: 1,
          max: 5,
        },
      }),
      userName: text(),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
};

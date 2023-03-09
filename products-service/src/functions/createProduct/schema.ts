export default {
  type: 'object',
  properties: {
    id: 'String',
    title: 'string',
    description: 'string',
    price: 'number',
    count: 'number',
  },
  required: ['id', 'title', 'description', 'price', 'count'],
} as const;

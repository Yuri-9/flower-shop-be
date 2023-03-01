import { getProductById } from './handler';
import { productList } from '@model/data-product-list';
import { Context } from 'aws-lambda';
import { defaultHeaders } from '@libs/api-gateway';

const getMockEvent = (productId) => {
  return {
    pathParameters: { productId },
    httpMethod: 'GET',
    path: 'products',
    headers: undefined,
    multiValueHeaders: undefined,
    isBase64Encoded: false,
    queryStringParameters: undefined,
    multiValueQueryStringParameters: undefined,
    stageVariables: undefined,
    requestContext: undefined,
    resource: '',
    body: undefined,
  };
};

describe('getProductById', () => {
  let event;
  let product;
  let response;

  beforeEach(async () => {
    event = getMockEvent(productList[Math.floor(Math.random() * productList.length)].id);

    response = await getProductById(event, {} as Context, jest.fn());
    product = JSON.parse(response.body);
  });

  test('should return a current product from list of products', async () => {
    expect(product.id).toEqual(event.pathParameters.productId);
  });

  test('should be return single object', async () => {
    expect(product).not.toBeInstanceOf(Array);
    expect(product).toBeInstanceOf(Object);
  });

  test('should return a status code 403 and error message', async () => {
    const badUUID = 'badId';
    const event = getMockEvent(badUUID);
    const response = await getProductById(event, {} as Context, jest.fn());

    expect(response).toEqual({
      statusCode: 403,
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify({ message: `Product with id:${badUUID} not founded` }),
    });
  });
});

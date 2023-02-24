import { errorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productList } from '@model/data-product-list';
import { Product } from '@model/index';

import schema from './schema';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    if (!event.pathParameters || !event.pathParameters.productId) {
      return errorResponse({ statusCode: 400, message: 'missing productId in the path' });
    }

    const { productId } = event.pathParameters;
    const product = productList.find((product) => product.id === productId);

    if (!product) {
      return errorResponse({ statusCode: 403, message: `Product with id:${productId} not founded` });
    }

    return successResponse<Product>(product);
  } catch (err) {
    return errorResponse(err);
  }
};

export const main = middyfy(getProductById);

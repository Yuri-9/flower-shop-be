import { errorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ResponseError } from '@libs/requestError';
import { productList } from '@model/data-product-list';
import { Product } from '@model/index';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { productId } = event.queryStringParameters;
    const product = productList.find((product) => product.id === productId);

    if (!product) {
      throw new ResponseError({message: 'Item not founded', statusCode: 403});
    }

    return successResponse<Product>(product);

  } catch(err) {
    return errorResponse(err);
  }

  
};

export const main = middyfy(getProductById);

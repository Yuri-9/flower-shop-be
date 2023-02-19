import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productList } from '@model/data-product-list';
import { Product } from '@model/index';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { productId } = event.queryStringParameters;
  const product = productList.find((product) => product.id === productId);

  return formatJSONResponse<Product>(product);
};

export const main = middyfy(getProductById);

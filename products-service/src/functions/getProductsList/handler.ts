import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productList } from '@model/data-product-list';
import { Product } from '@model/index';

import schema from './schema';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return successResponse<Product[]>(productList);
};

export const main = middyfy(getProductsList);

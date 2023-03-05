import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Product } from '@model/index';
import { dataBase, getScanParams } from '@db/db';
import { arrayToMapByField } from '@utils/arrayToMapByField.js';

import schema from './schema';

const { TABLE_NAME_PRODUCT, TABLE_NAME_STOCK } = process.env;

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const products = await dataBase.scan(getScanParams(TABLE_NAME_PRODUCT));
  const productsStock = await dataBase.scan(getScanParams(TABLE_NAME_STOCK));

  const productsStockMapById = arrayToMapByField('product_id', productsStock.Items);

  const productsListFullData: Product[] = products.Items?.map((product) => ({
    ...product,
    count: productsStockMapById.get(product.id)?.count,
  }));

  return successResponse<Product[]>(productsListFullData);
};

export const main = middyfy(getProductsList);

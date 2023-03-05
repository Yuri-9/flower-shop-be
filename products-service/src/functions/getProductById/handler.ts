import { errorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productList } from '@model/data-product-list';
import { Product } from '@model/index';
import { dataBase, getQueryParams } from '@db/db';
import schema from './schema';

const { TABLE_NAME_PRODUCT, TABLE_NAME_STOCK } = process.env;

export const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    if (!event.pathParameters || !event.pathParameters.productId) {
      return errorResponse({ statusCode: 400, message: 'Missing productId in the path' });
    }

    const { productId } = event.pathParameters;

    const product = await dataBase.query(getQueryParams(TABLE_NAME_PRODUCT, 'id', productId));
    const productStock = await dataBase.query(getQueryParams(TABLE_NAME_STOCK, 'product_id', productId));

    if (!product || !productStock) {
      return errorResponse({ statusCode: 403, message: `Product with id:${productId} not founded` });
    }

    const productFullData = { ...product.Items[0], count: productStock.Items[0]?.count };

    return successResponse<Product>(productFullData);
  } catch (err) {
    return errorResponse(err);
  }
};

export const main = middyfy(getProductById);

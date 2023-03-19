import { dataBase, getPutParams } from '@db/db';
import { randomUUID } from 'crypto';
const { TABLE_NAME_PRODUCT, TABLE_NAME_STOCK } = process.env;

class ProductService {
  isValidProduct(product) {
    const { title, description, price, count } = product || {};
    if (
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      !['number', 'string'].includes(typeof price) ||
      !['number', 'string'].includes(typeof count)
    ) {
      console.log(`ProductService.isValidProduct product ${product} is invalid: `);
      return false;
    }
    return true;
  }

  async putProductToDB(product) {
    try {
      const { title, description, price, count } = product || {};
      const id = randomUUID();

      const productItem = { id, title, description, price: +price };
      const stockItem = { product_id: id, count: +count };

      console.log(`putProductToDB: start put item to DB ${TABLE_NAME_PRODUCT}, ${TABLE_NAME_STOCK}`);

      await dataBase.put(getPutParams(TABLE_NAME_PRODUCT, productItem));
      console.log(`putProductToDB: item ${title} ${id} added successfully to DynamoDB table ${TABLE_NAME_PRODUCT}`);

      await dataBase.put(getPutParams(TABLE_NAME_STOCK, stockItem));
      console.log(`putProductToDB: item ${title} ${id} added successfully to DynamoDB table ${TABLE_NAME_STOCK}`);
    } catch (err) {
      console.log('putProductToDB:', err);
      throw new Error(err);
    }
  }
}

export default new ProductService();

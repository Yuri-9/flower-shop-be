import ProductService from '@service/product';

export const catalogBatchProcess = async (event) => {
  console.log(' --event:', JSON.stringify(event));
  try {
    const products = event.Records || [];

    const productsValid = products
      .map(({ body }) => JSON.parse(body))
      .filter((product) => ProductService.isValidProduct(product));

    for await (const product of productsValid) {
      await ProductService.putProductToDB(product);
    }
  } catch (err) {
    console.log('catalogBatchProcess: error', err);
  }
};

export const main = catalogBatchProcess;

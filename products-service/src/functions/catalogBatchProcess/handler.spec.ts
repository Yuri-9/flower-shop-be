import { catalogBatchProcess } from './handler';
const AWSMock = require('aws-sdk-mock');

// if need to mock ProductService

// jest.mock('@service/product', () => ({
//   isValidProduct: () => true,
//   putProductToDB: jest.fn(),
// }));

describe('catalogBatchProcess', () => {
  test('publish should be called with the correct parameters', async () => {
    const sendMessage = jest.fn();
    AWSMock.mock('SNS', 'publish', (params, callback) => {
      callback(null, sendMessage(params));
    });

    const event = {
      Records: [
        {
          body: '{"title":"Lily","description":"description2","price":"123","count":"20"}',
        },
      ],
    };

    await catalogBatchProcess(event);
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledWith({
      Message: '[{"title":"Lily","description":"description2","price":"123","count":"20"}]',
      MessageAttributes: {
        title: {
          DataType: 'String',
          StringValue: '',
        },
      },
      Subject: 'SNS reports that the products have been created successfully ',
      TopicArn: 'arn:aws:sns:eu-west-1:717882164865:createProductTopic',
    });
  });
});

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getScanParams = (TableName) => ({ TableName });

export const getQueryParams = (TableName, id) => ({
  TableName,
  KeyConditionExpression: 'id = :id',
  ExpressionAttributeValues: { ':id': id },
});

export const getPutParams = (TableName, Item) => ({ TableName, Item });

const scan = async (params) => {
  try {
    const data = await dynamo.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
};

const query = async (params) => {
  const queryResults = await dynamo.query(params).promise();
  return queryResults;
};

const put = async (params) => {
  return dynamo.put(params).promise();
};

export const dataBase = { scan, query, put };

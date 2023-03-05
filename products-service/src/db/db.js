const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getScanParams = (TableName) => ({ TableName });

export const getQueryParams = (TableName, felidName, value) => ({
  TableName,
  KeyConditionExpression: `${felidName} = :id`,
  ExpressionAttributeValues: { ':id': value },
});

export const getPutParams = (TableName, Item) => ({ TableName, Item });

const scan = async (params) => {
  const data = await dynamo.scan(params).promise();
  return data;
};

const query = async (params) => {
  const queryResults = await dynamo.query(params).promise();
  return queryResults;
};

const put = async (params) => {
  return dynamo.put(params).promise();
};

export const dataBase = { scan, query, put };

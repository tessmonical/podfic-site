'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getAll = async (event, context) => {

  const params = {
    TableName: process.env.PODFIC_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getAll = (event, context, callback) => {
  const params = {
    TableName: process.env.PODFIC_TABLE
  };

  dynamoDb
    .scan(params)
    .promise()
    .then(items => items.Items)
    .then(items => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(items)
      };
      callback(null, response);
    })
    .catch(err => {
      const response = {
        statusCode: 500,
        body: JSON.stringify(err)
      };
      console.error(err);
      callback(null, response);
    });
};

module.exports.getOne = (event, context, callback) => {
  const params = {
    TableName: process.env.PODFIC_TABLE,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": event.pathParameters.id
    }
  };

  dynamoDb
    .query(params)
    .promise()
    .then(items => items.Items)
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result)
      };
      callback(null, response);
    });
};

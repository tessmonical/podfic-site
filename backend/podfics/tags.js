const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getOne = (event, context, callback) => {
  const params = {
    TableName: process.env.TAGS_TABLE,
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
        body: JSON.stringify(result),
        headers: { "Access-Control-Allow-Origin": "*" }
      };
      callback(null, response);
    });
};

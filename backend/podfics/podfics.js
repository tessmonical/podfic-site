const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const getOneTag = require("./tags").getOne;

module.exports.getAll = (event, context, callback) => {
  const params = {
    TableName: process.env.PODFIC_TABLE
  };

  dynamoDb
    .scan(params)
    .promise()
    .then(items => items.Items)
    .then(items => {
      // get a list of all tags we need to fetch
      const totalTags = items.reduce((acc, item) => {
        item.tagIds.forEach(tag => {
          acc[tag] = true;
        });
        return acc;
      }, {});

      // fetch 'em
      const tagList = Object.keys(totalTags);
      const tagPromises = tagList.map(tag => {
        const tagParams = {
          TableName: process.env.TAGS_TABLE,
          KeyConditionExpression: "id = :id",
          ExpressionAttributeValues: {
            ":id": tag
          }
        };
        return dynamoDb
          .query(tagParams)
          .promise()
          .then(tag => tag.Items);
      });

      return Promise.all([items, Promise.all(tagPromises)]);
    })
    .then(([podfics, tags]) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          podfics,
          tags
        })
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

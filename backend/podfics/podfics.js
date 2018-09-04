const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// helper function to fetch tags
const fetchTags = tagList => {
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
      .then(tags => tags.Items[0]);
  });

  return Promise.all(tagPromises);
};

const mergeTagsAndPodfics = (tags, podfics) => {
  const tagObj = tags.reduce((acc, tag) => {
    acc[tag.id] = tag;
    return acc;
  }, {});

  return podfics.map(podfic => {
    podfic.tags = podfic.tagIds.map(tagId => tagObj[tagId]);
    return podfic;
  });
};

module.exports.getAll = (event, context, callback) => {
  const params = {
    TableName: process.env.PODFIC_TABLE
  };

  dynamoDb
    .scan(params)
    .promise()
    .then(items => items.Items)
    .then(podfics => {
      // get a list of all tags we need to fetch
      const totalTags = podfics.reduce((acc, podfic) => {
        podfic.tagIds.forEach(tagId => {
          acc[tagId] = true;
        });
        return acc;
      }, {});

      const tagList = Object.keys(totalTags);
      const tagPromises = fetchTags(tagList);

      return Promise.all([podfics, tagPromises]);
    })
    .then(([podfics, tags]) => {

      podfics = mergeTagsAndPodfics(tags, podfics);

      const response = {
        statusCode: 200,
        body: JSON.stringify(podfics)
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
    .then(podfic => {
      return Promise.all([podfic, fetchTags(result.tagIds)]);
    })
    .then(([podfic, tags]) => {
      podfic = mergeTagsAndPodfics(tags, [podfic])[0];
      const response = {
        statusCode: 200,
        body: JSON.stringify(podfic)
      };
      callback(null, response);
    });
};

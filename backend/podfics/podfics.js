const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const uuid = require("uuid/v5");

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
        body: JSON.stringify(podfics),
        headers: { "Access-Control-Allow-Origin": "*" }
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
    .then(items => items.Items[0])
    .then(podfic => {
      return Promise.all([podfic, fetchTags(podfic.tagIds)]);
    })
    .then(([podfic, tags]) => {
      podfic = mergeTagsAndPodfics(tags, [podfic])[0];
      const response = {
        statusCode: 200,
        body: JSON.stringify(podfic),
        headers: { "Access-Control-Allow-Origin": "*" }
      };
      callback(null, response);
    });
};


module.exports.postOne = (event, context, callback) => {
  // we explicity select only the fields we would like from the body
  const {
    title,
    textUrl,
    imageFile,
    filesDescriptions,
    writer,
    writerUrl,
    reader,
    readerUrl,
    contactEmail,
    files
  } = event.body;

  const imageKey = uuid("podfics", uuid.URL);

  // upload image file to bucket
  const s3ParamsImages = {
    Bucket: S3_BUCKET_IMAGES,
    Key: imageKey,
    Body: imageFile
  };
  const imagePromise = s3.upload(s3ParamsImages).promise();

  // upload sound files to bucket
  const fileKeys = files.map(file => uuid("podfics", uuid.URL));

  const filePromises = Promise.all(
    files.map((file, i) => {
      const s3ParamsImages = {
        Bucket: S3_BUCKET_PODFICS,
        Key: fileKeys[i],
        Body: file
      };
      return s3.upload(s3ParamsImages).promise();
    })
  );
  const ready = Promise.all([imagePromise, filePromises]);

  //create a record of the podfic in our database
  ready.then(() => {
    const podfic = {
      title,
      textUrl,
      filesDescriptions,
      writer,
      writerUrl,
      reader,
      readerUrl,
      approved: false
    };
    var params = {
      TableName: process.env.PODFIC_TABLE,
      Item: podfic
    };

  })
  .then(() => {
    console.log('seems to be working!')
    // email me and the person who uploaded the podfic
  })
  .catch(() => {
    // something went wrong
    console.log('oh no! something went wrong!')
  })
};

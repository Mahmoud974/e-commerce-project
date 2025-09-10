// const AWS = require("aws-sdk");
// const dynamoDB = new AWS.DynamoDB.DocumentClient();
// const TABLE_NAME = process.env.DYNAMO_TABLE;

// exports.handler = async (event) => {
//   if (event.httpMethod === "GET") {
//     const data = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
//     return {
//       statusCode: 200,
//       body: JSON.stringify(data.Items)
//     };
//   }

//   return {
//     statusCode: 405,
//     body: JSON.stringify({ message: "Méthode non autorisée" })
//   };
// };


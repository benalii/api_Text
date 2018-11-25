const { get } = require("lodash/fp");
const gql = require("graphql-tag");

const client = require("../connectors/apollo");

const getUserQuery = `query getUser($email:String!){
  User(email:$email){
    id
    credit
    offer {
      id
      name
      description
      limite
    }
  }
}`;

const updateCredit = `mutation updateCredit($userId: ID!, $credit: Int!) {
  updateUser(id: $userId, credit: $credit) {
    id
    email
    credit
  }
}`;

const decrease = async email => {
  try {
    console.log("teehee", email);
    const result = await client.query({
      query: gql(getUserQuery),
      variables: { email }
    });
    const userId = get("data.User.id", result);
    const oldCredit = get("data.User.credit", result);
    const newCredit = oldCredit - 1;
    const resultMutation = await client.mutate({
      mutation: gql(updateCredit),
      variables: { userId, credit: newCredit }
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { decrease };

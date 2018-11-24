const { get, isNil, isString } = require("lodash/fp")
const gql = require("graphql-tag")

const client = require("../connectors/apollo")

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
}`

const authentication = async (req, res, next )=>{
  try{
    const email = get("body.email", req);

    if(!isString(email)){
      throw "Input error expected user email"
    }else {

      const result = await client.query({
        query:gql(getUserQuery),
        variables:{email}
      });
      // console.log(JSON.stringify(result, null,2));
      const user = get("data.User", result);
      
      if(isNil(user)){
        throw `Can't find a user with email: ${email}`
      }
      const credit = get("credit", user);
      if(credit <= 0){
        throw `You don't have enough credit for this operation please upgrade your acount`
      }
      next();
    }
  }catch(err){
    res.send({Status:500, error: err})
  }
}
module.exports = authentication

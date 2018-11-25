const express = require("express");
const gql = require("graphql-tag");
const bodyParser = require("body-parser");

const justify = require("justified");
const { isString, get, isNil } = require("lodash/fp");

const client = require("./connectors/apollo");
const authentication = require("./middleware/authentication");
const credit = require("./utils/credit");

const app = express();
const port = 3000;

app.use(bodyParser.json()); // to support JSON-encoded bodies

// app.post("/graph",async function(req, res) {
//   const result = await client.query({query: gql`query user {
//   allUsers {
//     id
//     email
//   }
// }
// `})
//   res.send(result)
// })

app.post("/", authentication, async (req, res) => {
  try {
    const text = get("body.text", req);
    const email = get("body.email", req);
    if (!isString(text)) {
      throw "input error";
    } else {
      const output = justify(text, { width: 80 });
      await credit.decrease(email);
      res.send({
        Status: 200,
        body: {
          text: output
        }
      });
    }
  } catch (err) {
    res.sent({ Status: 500, error: err });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const fetch = require("node-fetch");

const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { setContext } = require("apollo-link-context");
const { InMemoryCache } = require("apollo-cache-inmemory");

const httpLink = new HttpLink({ uri: "https://api.graph.cool/simple/v1/cjoqd9ot8f9ik0156frgojck5",
  fetch
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

module.exports = client

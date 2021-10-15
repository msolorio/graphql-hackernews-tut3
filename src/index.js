const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');

let links = [
  {
    id: '1',
    url: 'howtographql.com',
    description: 'tuts for geeks'
  }
];

let linksCount = 1;

const resolvers = {
  Query: {
    info: () => "This is the real hackernews website",
    feed: () => links
  },

  Mutation: {
    post: (parent, args) => {
      linksCount += 1;

      const newLink = {
        id: linksCount,
        description: args.description,
        url: args.url
      }

      links.push(newLink);

      return newLink;
    }
  }

  // Link: {
  //   id: (parent) => parent.id,
  //   url: (parent) => parent.url,
  //   description: (parent) => parent.description
  // }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers
});


server
  .listen()
  .then((response) => {
    console.log('Server listening at ==>', response.url);
  });

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const typeDefs = require("./src/types");
const resolvers = require("./src/resolvers");

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const port = process.env.PORT || 4002;
  const subgraphName = "basket";

  try {
    const { url } = await startStandaloneServer(server, {
      context: ({ req }) => {
        const userId = req.headers.userId || "";
        return { userId };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}
startApolloServer();

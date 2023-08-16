const { GraphQLError } = require("graphql");

const { getBasket, addItem } = require("./libs/basket");

const resolvers = {
  Query: {
    basket: (_, { id }) => getBasket(id),
  },
  Mutation: {
    addItem: (_, { item }, context) => {
      console.log(context);
      const { userId } = context;
      if (!userId) {
        throw new GraphQLError("Invalid user id", {
          extensions: { code: "INVALID_USER_ID" },
        });
      }
      addItem(item, userId);
    },
  },
  Basket: {
    user: ({ userId }) => {
      return { id: userId };
    },
    entries: ({ entries }) => {
      return entries.map((entry) => {
        const { productId, ...rest } = entry;
        return {
          ...rest,
          product: {
            id: productId,
          },
        };
      });
    },
  },
};

module.exports = resolvers;

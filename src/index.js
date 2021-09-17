import pkg from "../package.json";
import mutations from "./mutations/index.js";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import queries from "./queries/index.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Draft Orders",
    name: "plugin-draft-orders",
    version: pkg.version,
    collections: {
      DraftOrders: {
        name: "DraftOrders"
      }
    },
    mutations,
    queries,
    graphQL: {
      schemas,
      resolvers
    }
  });
}

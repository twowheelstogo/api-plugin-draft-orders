import pkg from "../package.json";
import mutations from "./mutations/index.js";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import queries from "./queries/index.js";
import startup from "./startup.js";
import i18n from "./i18n/index.js";

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
    i18n,
    collections: {
      DraftOrders: {
        name: "DraftOrders"
      }
    },
    functionsByType: {
      startup: [startup]
    },
    mutations,
    queries,
    graphQL: {
      schemas,
      resolvers
    }
  });
}

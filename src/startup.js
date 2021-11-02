import cron from "node-cron";

/**
 * @summary called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined} 
 */
export default async function scheduledOrdersStartup(context) {
    cron.schedule("* * * * *", () => {
        console.log("scheduled task every minute");
    })
}
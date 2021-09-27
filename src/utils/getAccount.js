
/**
 * @method getAccount
 * @summary gets a single account by id
 * @param {context} - request context
 * @param {accountId} - the accountId
 * @returns {Promise<Object>} returns a single Account object
 */
export default async function getAccount(context, accountId) {
    const { collections } = context;
    const { Accounts } = collections;

    return Accounts.findOne({ _id: accountId });
}
//= Functions & Modules
// Packages
import { promisify } from "util";

export default (redisClient) => {
    if (!redisClient.getAsync) redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
    if (!redisClient.delAsync) redisClient.delAsync = promisify(redisClient.del).bind(redisClient);

    let functions = {
        getSession: async (sessionVariableName, req) => {
            return await redisClient.getAsync(sessionVariableName);
        },
        saveSession: async (sessionVariableName, value, req) => {
            redisClient.set(sessionVariableName, value);
        },
        cleanSession: async (sessionVariableName, req) => {
            await redisClient.delAsync(sessionVariableName);
        }
    };

    functions.checkSession = functions.getSession;

    return functions;
}
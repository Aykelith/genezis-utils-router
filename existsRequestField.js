import RequestError from "./RequestError";

export default (data, statusCode, message) => {
    if (data === undefined) {
        throw new RequestError(statusCode, message);
    }
}
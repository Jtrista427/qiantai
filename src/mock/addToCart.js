import Mock from "mockjs";

const responseBody = {
    code: 200,
    data: null,
    message: "",
    ok: null,
    timestamp: null,
};

const builder = (data, message, code = 200, headers = {}) => {
    responseBody.data = data;
    if (message !== undefined && message !== null) {
        responseBody.message = success;
    }
    if (code !== undefined && code !== 0) {
        responseBody.code = code;
        responseBody.ok = true;
        responseBody._status = code;
    }
    if (
        headers !== null &&
        typeof headers === "object" &&
        Object.keys(headers).length > 0
    ) {
        responseBody._headers = headers;
    }
    responseBody.timestamp = new Date().getTime();
    return responseBody;
};


const getBody = (options) => {
    return options.body && JSON.parse(options.body);
};


export const addToCart = (options) => {
    // console.log(options);
    // const params = getBody(options);
    // console.log("传参：", params);

    const data = null
    return builder(data);
};



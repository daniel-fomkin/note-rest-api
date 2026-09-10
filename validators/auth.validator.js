function notEmpty(data, dataName){
    if(typeof data !== "string" || !data.trim()){
        const err = new Error(`${dataName} can't be empty`);
        err.status = 400;

        throw err;
    }
}

function lengthValidation(data, dataName, minLen){
    if(data.length < minLen){
        const err = new Error(`The ${dataName} must be at least ${minLen} characters long`);
        err.status = 400;

        throw err;
    }
}

function emailValidation(email){
    notEmpty(email, "Email");

    const etaPosition = email.indexOf("@");

    if(etaPosition === -1){
        const err = new Error("Email must be writen email format");
        err.status = 400;

        throw err;
    }
}

function dbNotFound(dbResponse, whatNotFound) {
    if (!dbResponse) {
        const err = new Error(`${whatNotFound} not found`);
        err.status = 404;

        throw err;
    }
}

module.exports = {
    emailValidation,
    notEmpty,
    lengthValidation,
    dbNotFound
}
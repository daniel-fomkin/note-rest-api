function stringValidation(str, strName) {
    if (typeof str !== "string") {
        const err = new Error(`Note ${strName} must be a string`);
        err.status = 400;

        throw err;
    }

    if (!str.trim()) {
        const err = new Error(`Note ${strName} can't be empty`);
        err.status = 400;

        throw err;
    }
}

function idValidation(id, idName) {
    if (!Number(id) || id <= 0) {
        const err = new Error(`${idName} id must be a positive number`);
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

function allEmptyValidation(parametrs, parametrNames) {
    if (parametrs.every(parametr => parametr === undefined)) {
        const err = new Error(`At least one of the parameters must be (${parametrNames.join(", ")})`);
        err.status = 400;

        throw err
    }
}

function isPositiveNumber(num, numName){
    if(!Number(num) && num < 0){
        const err = new Error(`${numName} must be a positive number or zero`);
        err.status = 400;

        throw err;
    }
}


module.exports = {
    stringValidation,
    idValidation,
    allEmptyValidation,
    dbNotFound,
    isPositiveNumber
}
import validator from "validator";

export function validate(name, value) {
    if (name === "name") {
        return validateName(value)
    }
    if (name === "email") {
        return validateEmail(value)
    } else {
        return {
            isOk: true,
            message: ""
        }
    }
}

function validateName(name) {
    if (name.length < 2) {
        return {
            isOk: false, 
            message: "Минимум 2 символа"
        }
    } else if (name.length > 30) {
        return {
            isOk: false,
            message: "Максимум 30 символоа"
        }
    } else if (!name.match(/^[а-яА-Яa-zA-Z-]*$/)){
        return {
            isOk: false,
            message: "Только латиница, кириллица и дефис"
        }
    } else {
        return {
            isOk: true,
            message: ""
        }
    }
};

function validateEmail(email) {
    if (!validator.isEmail(email)) {
        return {
            isOk: false,
            message: "Некорректный email"
        }
    } else {
        return {
            isOk: true,
            message: ""
        }
    }
}

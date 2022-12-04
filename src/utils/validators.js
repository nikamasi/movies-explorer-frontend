import validator from "validator";

export function validate(name, value) {
    if (name === "name") {
        return validateName(value)
    }
    if (name === "email") {
        return validateEmail(value)
    } else {
        return ""
    }
}

function validateName(name) {
    if (name.length < 2) {
        return "Минимум 2 символа"
    } else if (name.length > 30) {
        return "Максимум 30 символоа"
    } else if (!name.match(/^[а-яА-Яa-zA-Z-]*$/)){
        return "Только латиница, кириллица и дефис"
    } else {
        return ""
    }
};

function validateEmail(email) {
    if (!validator.isEmail(email)) {
        return "Некорректный email"
    } else {
        return ""
    }
}

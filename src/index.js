import { useState, useEffect } from "react";
//constants
const VALIDATION_TYPES = {
    REQUIRED: "REQUIRED",
    ASYNC: "ASYNC",
    RANGE: "RANGE",
    LENGTH: "LENGTH",
    REGEX: "REGEX"
};

const ERR_MESSAGES = {
    [VALIDATION_TYPES.REQUIRED]: "The input is required",
    [VALIDATION_TYPES.ASYNC]: "Error running custom validator for {value}",
    [VALIDATION_TYPES.RANGE]: "The input value length exceeds {max} or less than {min}",
    [VALIDATION_TYPES.LENGTH]: "The input length exceeds {max} or less than {min}",
    [VALIDATION_TYPES.REGEX]: "The value entered ({value}) does not maches the pattern ({pattern})"
};
//Validator constructs
export const requiredValidation = errorMessage => ({
    type: VALIDATION_TYPES.REQUIRED,
    errorMessage: errorMessage || ERR_MESSAGES[VALIDATION_TYPES.REQUIRED]
});
export const asyncValidation = (asyncFunction, errorMessage) => ({
    type: VALIDATION_TYPES.ASYNC,
    errorMessage: errorMessage || ERR_MESSAGES[VALIDATION_TYPES.ASYNC],
    asyncFunction
});
export const rangeValidation = (min, max, errorMessage) => ({
    type: VALIDATION_TYPES.RANGE,
    errorMessage: errorMessage || ERR_MESSAGES[VALIDATION_TYPES.RANGE],
    min,
    max
});
export const lengthValidation = (min, max, errorMessage) => ({
    type: VALIDATION_TYPES.LENGTH,
    errorMessage: errorMessage || ERR_MESSAGES[VALIDATION_TYPES.LENGTH],
    min,
    max
});
export const regexValidation = ({ pattern, errorMessage }) => ({
    type: VALIDATION_TYPES.REGEX,
    errorMessage: errorMessage || ERR_MESSAGES[VALIDATION_TYPES.REGEX],
    pattern
});

//hook API
export const useValidator = (validators, defaultValue) => {
    if (Object.prototype.toString.call(validators) !== "[object Array]") {
        throw new Error("validators must be an Array");
    }
    if (!validators.length) {
        throw new Error("validators should not be empty Array");
    }

    const [error, setError] = useState([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        asyncValidate(defaultValue).then(res => {
            setPending(false);
            setError(res);
        });
    }, [])

    const onChange = (changeHandler, valueMapper) => e => {
        const value = valueMapper ? valueMapper(e) : e.target.value;
        changeHandler(e);
        setPending(true);
        asyncValidate(value).then(res => {
            setPending(false);
            setError(res);
        });
    };

    const asyncValidate = async value => {
        const res = [];
        for (let i = 0; i < validators.length; i++) {
            let error = "";
            try {
                switch (validators[i].type) {
                    case VALIDATION_TYPES.REQUIRED:
                        await Promise.resolve(requiredValidator(value, validators[i]));
                        break;
                    case VALIDATION_TYPES.LENGTH:
                        await Promise.resolve(lengthValidator(value, validators[i]));
                        break;
                    case VALIDATION_TYPES.RANGE:
                        await Promise.resolve(rangeValidator(value, validators[i]));
                        break;
                    case VALIDATION_TYPES.ASYNC:
                        await asyncValidator(value, validators[i]);
                        break;
                    case VALIDATION_TYPES.REGEX:
                        await Promise.resolve(regexValidator(value, validators[i]));
                        break;
                    default:
                        break;
                }
            } catch (e) {
                error = e.message;
            } finally {
                if (error) res.push(error);
            }
        }
        return Promise.resolve(res);
    };

    return { error, onChange, pending };
};

//validation handlers
const requiredValidator = (value, context) => {
    if (!value) {
        throw new Error(format(value, context));
    }
};
const lengthValidator = (value, context) => {
    const l = String(value).length;
    if (l < (context.min || 0) || l > context.max) {
        throw new Error(format(value, context));
    }
};
const rangeValidator = (value, context) => {
    if (value < context.min || value > context.max) {
        throw new Error(format(value, context));
    }
};
const regexValidator = (value, context) => {
    if (!new RegExp(context.pattern).test(value)) {
        throw new Error(format(value, context));
    }
};

const asyncValidator = async(value, context) => {
    await context.asyncFunction.call(this, value, context);
};

const format = (value, context) => {
    let message = context.errorMessage;
    Object.keys({...context, value }).forEach(i => {
        message = message.replace(`{${i}}`, context[i]);
    });
    return message;
}
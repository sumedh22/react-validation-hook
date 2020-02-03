import { useState, useEffect } from "react";
//constants
const VALIDATION_TYPES = {
    REQUIRED: "REQUIRED",
    ASYNC: "ASYNC",
    RANGE: "RANGE",
    LENGTH: "LENGTH",
    REGEX: "REGEX",
    CUSTOM: "CUSTOM"
};

const ERR_MESSAGES = {
    [VALIDATION_TYPES.REQUIRED]: "Value is required",
    [VALIDATION_TYPES.ASYNC]: "Error running custom validator with {value}",
    [VALIDATION_TYPES.RANGE]: {
        min: "Value is less than {min}",
        max: "Value exceeds {max}"
    },
    [VALIDATION_TYPES.LENGTH]: {
        min: "Length is less than {min}",
        max: "Length exceeds {max}"
    },
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
export const rangeValidation = (min, max, messages) => ({
    type: VALIDATION_TYPES.RANGE,
    messages: messages || ERR_MESSAGES[VALIDATION_TYPES.RANGE],
    min,
    max
});
export const lengthValidation = (min, max, messages) => ({
    type: VALIDATION_TYPES.LENGTH,
    messages: messages || ERR_MESSAGES[VALIDATION_TYPES.LENGTH],
    min,
    max
});
export const regexValidation = (pattern, errorMessage) => ({
    type: VALIDATION_TYPES.REGEX,
    errorMessage: errorMessage || ERR_MESSAGES[VALIDATION_TYPES.REGEX],
    pattern
});
export const customValidation = (syncFunction, errorMessage) => ({
    type: VALIDATION_TYPES.CUSTOM,
    errorMessage: errorMessage,
    syncFunction
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
    }, []);

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
                    case VALIDATION_TYPES.CUSTOM:
                        await Promise.resolve(customValidator(value, validators[i]));
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
        throw new Error(format(value, context, context.errorMessage));
    }
};
const lengthValidator = (value, context) => {
    const l = String(value || '').length;
    if (context.min) {
        if (l < context.min) {
            throw new Error(format(value, context, context.messages.min));
        }
    }

    if (context.max) {
        if (l > context.max) {
            throw new Error(format(value, context, context.messages.max));
        }
    }
};
const rangeValidator = (value, context) => {
    if (value < context.min) {
        throw new Error(format(value, context, context.messages.min));
    }
    if (value > context.max) {
        throw new Error(format(value, context, context.messages.max));
    }
};
const regexValidator = (value, context) => {
    if (!new RegExp(context.pattern).test(value)) {
        throw new Error(format(value, context, context.errorMessage));
    }
};

const asyncValidator = async(value, context) => {
    await context.asyncFunction.call(this, value, context);
};
const customValidator = async(value, context) => {
    await context.syncFunction.call(this, value, context);
};

const format = (value, context, message) => {
    const ctx = {...context, value };
    Object.keys(ctx).forEach(i => {
        message = message.replace(`{${i}}`, ctx[i]);
    });
    return message;
};
# react-validation-hook

> React hook for sync and async validation in forms

[![NPM](https://img.shields.io/npm/v/react-validation-hook.svg)](https://www.npmjs.com/package/react-validation-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# Website

Visit the [website](https://sumedh22.github.io/react-validation-hook/) for demo and docs
# Features
* Nice and Easy hook based interface
* Supports both Synchronous and Asynchronous validation
* Supports validators like range, required, length, regex out of the box
* Specify custom validators!
* Out of the box formatted error messages, which could be overwritten

## Install

```bash
npm install --save react-validation-hook
```

## Usage

```jsx
import React, { useEffect } from "react";

import {
  useValidator,
  requiredValidation,
  lengthValidation,
  asyncValidation
} from "react-validation-hook";

export default () => {
  const asyncFunction = async (value, context) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const res = await response.json();
    if (value.length < 3) {
      throw new Error("Custom error " + value);
    }
  };
  const validators = [
    requiredValidation(),
    lengthValidation(2, 5),
    asyncValidation(asyncFunction)
  ];
  const { error, onChange, pending } = useValidator(validators);

  const changeHandler = e => {
    console.log(e.target.value);
  };

  return (
    <div>
      <ul>
        {error.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
      <input onChange={onChange(changeHandler)} />
    </div>
  );
};

```

## License

MIT © [sumedh22](https://github.com/sumedh22)

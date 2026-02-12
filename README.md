<p align="center">
<img width="400" alt="122" src="https://github.com/user-attachments/assets/bf270702-5b07-4489-a1ea-a18a3368172c" />
</p>

![NPM Package Version](https://img.shields.io/npm/v/unreadable-typescript?color=black)


# unreadable-typescript


```
npm i --save-dev unreadable-typescript
```

Small helper / utility library to simplify and manipulate TypeScript's complex and awkward syntax.

## Structure

```graphql
src/
├── enum/       # useEnum - work with enums (keys, values, entries, hasKey, hasValue)
├── interface/  # isTSInterface - runtime check if object conforms to a TS interface
├── type/       # extend, set - curried type builders to compose object types from unknown
└── utils/      # Type guards (isString, isNumber, isArray, isObject, ...) + withoutKey
```



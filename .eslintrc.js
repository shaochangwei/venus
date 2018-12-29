module.exports = {
    "parser":"babel-eslint",
    "plugins": [
        "react",
        "flowtype"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node":true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "modules":true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-uses-react":[
            2
        ],
        "react/jsx-uses-vars":[
            2
        ]
    }
};
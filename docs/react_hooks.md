class: center, middle

# Introduction of React Hooks

Zhongyuan Zheng

2020-04-10

---

# Agenda

#### 1. Function Component and class Component
#### 2. React Hooks
#### 3. Named export and default export
#### 4. Type checking with `PropTypes`
#### 5. ESLint

---
### Function Component and Class Component

1. Life Cycle - `componentDidAmount, render..`
2. `this`
3. Reconciliation and UI Rendering ([React as A UI Time](https://overreacted.io/react-as-a-ui-runtime/))
4. Demo `Navbar.js`, `Login.js`

---
### React Hooks

1. Commonly Used Hooks
+ `useContext`
+ `useState`
+ `useEffect`

2. [Rules to use Hooks](https://reactjs.org/docs/hooks-rules.html)
+ Call Hooks At the Top Level
+ Call Hooks From React Functions
+ Call Hooks From custom Hooks

3. Custom Hooks
+ `useFormInput`
+ `useAPIRequest`

4. Plugin Support - `eslint-plugin-react-hooks`

---
### `export`

#### Named Export
```
// Home.js
import { Login } from './Login';

// Login.js
export function Login() {
...
}
```

---
### `export`

#### Default Export
```
// Home.js
import Login from './Login';

// Login.js
export default function Login() {
...
}
// or
function Login() {
...
}
export default Login
```

[More On export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)

---
### Type checking with `PropTypes`

```
function DisorderResult(props) {
...
return (<div>...</div>);
}

DisorderResult.propTypes = {
title: PropTypes.string.isRequired,
category: PropTypes.string.isRequired,
subCategory: PropTypes.string,
other: PropTypes.arrayOf(PropTypes.string)
};

export default DisorderResult;
```

[More On Typechecking](https://reactjs.org/docs/typechecking-with-proptypes.html)

---
### ESLint

+ Problems:
- unused variables,
- inconsistent coding style
- not following best practice
+ Linter and Formatter
+ `.eslintrc`
+ Demo
+ Enforce linting before commit ??

[More On ESLint](https://eslint.org/)

---
### Conclusion

#### Simplicity
#### Reuseability
#### Consistency

---
class: center, middle

### Thanks

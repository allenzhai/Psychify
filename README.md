# 308-Project
Psychology Group 1

View Storyboard Presentation: https://www.figma.com/proto/744FuVSeNm89ZIQ5JLpMo7/Psychology-Search-Project?node-id=28%3A6&scaling=min-zoom

UI Prototype Line: https://www.figma.com/file/744FuVSeNm89ZIQ5JLpMo7/Psychology-Search-Project?node-id=0%3A1


### Coding Style
In the project, we adopt `eslint` ands javascript style guide from `airbnb`. Before you make a contribution, be sure to run `npm run lint` to check and fix any fixable errors or warnings. Here are links to related tools

+ [eslint](https://eslint.org/)
+ [airbnb javascript style guide](https://github.com/airbnb/javascript)

### Test
To run test cases. (Dont forget to install new dependencies first.)
```
// Install new dependencies regarding test
npm install
npm test
```

#### Testing Techniques
Examples of different testing techniques are provided in the project. **More examples are to added.**

##### Frontend
1. Whether a component contains some key dom element in it.
  + E.g. `Navbar.test.js`
2. Whether a specific function is called.
  + E.g. `Searchbar.test.js`

##### Backend
1. Whehter a particular API endpoint is available.
  + E.g. `app.test.js`

#### References
+ [How to test Express.js with Jest and Supertest](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)
+ [React Testing Examples](https://react-testing-examples.com/jest-rtl/)
+ [How to mock history.push](https://stackoverflow.com/questions/58524183/how-to-mock-history-push-with-the-new-react-router-hooks-using-jest)
+ [expect](https://jestjs.io/docs/en/expect)
+ [Firing Events](https://testing-library.com/docs/dom-testing-library/api-events)
+ [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
+ [Inside Fiber: an in-depth overview of the new reconciliation algorithm in React](https://blog.ag-grid.com/inside-fiber-an-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/)
+ [How Does setState Know What to Do?](https://overreacted.io/how-does-setstate-know-what-to-do/)
+ [Under the hood of React’s hooks system](https://medium.com/the-guild/under-the-hood-of-reacts-hooks-system-eb59638c9dba)

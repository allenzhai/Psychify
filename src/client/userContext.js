import React from 'react';

// Needs token here
const token = 1111;


// user context
const UserContext = React.createContext({
  token: { token },
  changeToken: () => {}
  // ^ dependdent on our implementation and whether or not we will need this method
  // This is automatically passed with the context.

});

export default UserContext;


// Will be providing in App.js by wrapping child components with a provider:
/* <UserContext.Provider value={token, changeToken}>
          <Layout />
        </UserContext.Provider> */

// on value change of 'token', child props will be rerendered

// For context consumption:
/* <UserContext.Consumer>
          {token => (
            <childElement token = {token} />
          )}
        </UserContext.Consumer> */

// response.code == 0 //succeeded
// response.code == 1 //failed
// response.code == 2 //invalid_token
// see more in file server/router/code.js
function login(username, password) {
  const data = { username, password };
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.toString().length.toString()
    },
    body: JSON.stringify(data)
  };
  return fetch('/api/login', request).then(res => res.json())
    .then((response) => {
      console.log('login successful');
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    }).catch((err) => {
      console.log('login unsuccessful');
      console.log(err);
    });
}

const UserService = {
  login
};

export default UserService;

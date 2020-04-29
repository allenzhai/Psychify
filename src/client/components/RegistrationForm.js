import React from 'react';
export const RegistrationForm = ({ onSubmit, setUsername, setEmail, setPassword }) => {
  return (
  <form onSubmit={onSubmit}>
    <div className="form-group">
        <label htmlFor="name">Name</label>
      <input className="form-control" id="name" onChange={(e) => setUsername(e)}/>
    </div>

    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input type="email" className="form-control" id="email"
       placeholder="name@example.com"
      />
  </div>
    <div className="form-group">
      <button className="form-control btn btn-primary" type="submit">
        Submit
      </button>
  </div>
  </form>
  );
};
export default RegistrationForm;

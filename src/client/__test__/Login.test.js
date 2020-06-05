import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Login from '../pages/Login';
import { UserContextProvider } from '../context/UserContext';

jest.mock('../service/UserService');

const mockHistoryPush = jest.fn();
jest.mock('history', () => ({
  ...jest.requireActual('history'),
  createBrowserHistory: () => ({
    push: mockHistoryPush
  })
}));

function containsLogin() {
  expect.assertions(1);
  const { container } = render(
    <UserContextProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </UserContextProvider>
  );
  const loginPage = container.querySelector('#login-body');
  expect(loginPage).toBeDefined();
}

describe('test client routers', () => {
  it('should render Login page', containsLogin);
});

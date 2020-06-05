import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Home from '../pages/Home';
import Registration from '../pages/Registration';
import DSM from '../pages/DSM';
import Profile from '../pages/Profile';
import { UserContextProvider } from '../context/UserContext';

function containsHome() {
  expect.assertions(1);
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const homePage = container.querySelector('#home-content');
  expect(homePage).toBeDefined();
}

function containsRegistration() {
  expect.assertions(1);
  const { container } = render(
    <MemoryRouter>
      <Registration />
    </MemoryRouter>
  );
  const registration = container.querySelector('#registration-body');
  expect(registration).toBeDefined();
}

function containsDSM() {
  expect.assertions(1);
  const { container } = render(
    <MemoryRouter>
      <DSM />
    </MemoryRouter>
  );
  const dsm = container.querySelector('#dsm-body');
  expect(dsm).toBeDefined();
}

const useFetchMock = jest.fn();
useFetchMock.mockReturnValue([false, null, {}]);

jest.mock('../hooks/useFetch');
const useFetch = require('../hooks/useFetch');

useFetch.default.mockImplementation(() => {
  const mockIsLoading = false;
  const mockData = [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }];
  const mockError = null;
  return [mockIsLoading, mockData, mockError];
});

function containsProfile() {
  expect.assertions(1);
  const { container } = render(
    <UserContextProvider>
      <Profile />
    </UserContextProvider>
  );
  const dsm = container.querySelector('#dsm-body');
  expect(dsm).toBeDefined();
}

describe('test client routers', () => {
  it('should contain Home page', containsHome);
  it('should contain Registration page', containsRegistration);
  it('should contain DSM page', containsDSM);
  it('should contain Profile page', containsProfile);
});

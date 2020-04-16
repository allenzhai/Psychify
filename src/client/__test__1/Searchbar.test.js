import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Searchbar from '../pages/components/Searchbar';

const mockHistoryPush = jest.fn();
jest.mock('history', () => ({
  ...jest.requireActual("history"),
  createBrowserHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('test suite of Searchbar', () => {
  it('should contain a form and an input', () => {
    expect.assertions(2);
    const { container } = render(<Searchbar />);
    const form = container.querySelector("form");
    const input = container.querySelector("input");
    expect(form).toBeDefined();
    expect(input).toBeDefined();
  });

  it('should contain call history.push on form submit', () => {
    expect.assertions(1);
    const { container } = render(<MemoryRouter><Searchbar /></MemoryRouter>);
    const form = container.querySelector("form");
    fireEvent.submit(form);
    expect(mockHistoryPush).toBeCalled();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Forum from '../pages/Forum';

// const mockHistoryPush = jest.fn();
// jest.mock('history', () => ({
//   ...jest.requireActual('history'),
//   createBrowserHistory: () => ({
//     push: mockHistoryPush
//   })
// }));

describe('test suite of Forum', () => {
  it('should contain ForumPosts', () => {
    expect.assertions(1);
    const { container } = render(<Forum />);
    const forumPosts = container.querySelector('ForumPosts');
    expect(forumPosts).toBeDefined();
  });

  // it('should contain call history.push on form submit', () => {
  //   expect.assertions(1);
  //   const { container } = render(<MemoryRouter><Searchbar /></MemoryRouter>);
  //   const form = container.querySelector('form');
  //   fireEvent.submit(form);
  //   expect(mockHistoryPush).toHaveBeenCalledWith({
  //     pathname: '/results',
  //     search: '?terms='
  //   });
  // });
});

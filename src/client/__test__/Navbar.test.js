import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Navbar from '../components/Navbar';

describe('test suite of Navbar', () => {
  it('should contain forum and dsm links', () => {
    expect.assertions(2);
    render(<Navbar />);
    const forumLink = document.querySelector('a[href="/forum"]');
    const dsm = document.querySelector('a[href="/dsm"]');
    expect(forumLink).toBeInTheDocument();
    expect(dsm).toBeInTheDocument();
  });
});

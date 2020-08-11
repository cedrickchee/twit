import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from './Feed';

describe('Feed', () => {
  test('renders Feed component', () => {
    render(<Feed />);
    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});

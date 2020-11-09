import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const ProperAppComponent = () => <Router>
  <App />
</Router>;

test('renders Hacker Rank link as general', () => {
  // const { getByText } = render(<App />);
  const testMessage = 'Hacker News';
  render(<ProperAppComponent />);
  expect(screen.getByText(testMessage)).toBeInTheDocument();
});




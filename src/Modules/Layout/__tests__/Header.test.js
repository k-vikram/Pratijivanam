import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Views/Header';

const RoutedComponent = () => <Router>
  <Header />
</Router>;

test('renders Header component', () => {
    // const { getByText } = render(<App />);
    const testMessage = 'Hacker News';
    render(<RoutedComponent />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
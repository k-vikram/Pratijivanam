import React from 'react';

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node'

// import react-testing methods
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { render, screen, waitFor } from '../../../utils/WrappedTestingLibrary';

import Home from '../Views/Home';
import MockTopStories from '../../../mockTopStories.json';
import { any } from 'prop-types';


// declare which API requests to mock
const server = setupServer(
    // capture "GET /topstories.json?print=pretty" requests
    rest.get('/topstories.json?print=pretty', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json(MockTopStories))
    })
  )

beforeAll(() => {
    server.listen();
    render(<Home />);
  });
  

  afterEach(() => server.resetHandlers())
  
  afterAll(() => server.close())


test('fetches all the top story ids', async () => {
    //Arrange
   
  
    //Act 
    await waitFor(() =>
    // getByRole throws an error if it cannot find an element
    expect(screen.getByRole('Content')).toBeVisible()
  )
    
  //Assert
   // expect(screen.getByRole('Content')).toHaveValue();
  });

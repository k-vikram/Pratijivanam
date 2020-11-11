// test-utils.js

import React, { useReducer } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react'

import { AppWideContext, Story, initialState } from '../App'

const { Provider: AppWideProvider } = AppWideContext;

const AllTheProviders = ({ children }) => {
    const [globalState, dispatch] = useReducer(Story, initialState);
    return (
        <Router>
            <AppWideProvider value={{ globalState, dispatch }}>
                {children}
            </AppWideProvider>
        </Router>
    )
}

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
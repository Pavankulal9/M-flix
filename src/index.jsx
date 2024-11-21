import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import MovieProvider from './context/MovieContext';
import SearchTermProvider from './context/SearchContext';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
      <MovieProvider>
        <SearchTermProvider>
          <QueryClientProvider client={queryClient}>
            <App/>
          </QueryClientProvider>
        </SearchTermProvider>
      </MovieProvider>
    </React.StrictMode>
);

import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import MovieProvider from './utils/context';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
      <MovieProvider>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </MovieProvider>
    </React.StrictMode>
);

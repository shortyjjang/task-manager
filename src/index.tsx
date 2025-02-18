import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { Provider as JotaiProvider } from 'jotai';
import reportWebVitals from './reportWebVitals';
import './assets/styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </JotaiProvider>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import { LoginPage } from './pages/login-page/login-page';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
          <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <LoginPage />
    </QueryClientProvider>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

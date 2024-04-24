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
    </div>
  );
}

export default App;

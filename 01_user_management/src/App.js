import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./pages/login-page/login-page";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <LoginPage />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
            </div>
        </QueryClientProvider>
    );
}

export default App;

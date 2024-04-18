import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProvider } from "./mocks/renderWithProviders";

test("renders learn react link", () => {
    renderWithProvider(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

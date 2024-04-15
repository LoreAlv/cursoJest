import { render, screen } from "@testing-library/react";
import { LoginPage } from "./login-page";

describe("pruebas de login-page", () => {
    test("it should render login title", () => {
        render(<LoginPage />);
        screen.debug();
        //miramos que esté el texto login ignore-case
        expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    });

    test("should render the form elements", () => {
        render(<LoginPage />);
        screen.debug();
        //miramos que esté el campo email ignore-case
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        //miramos que esté el campo password ignore-case
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        //miramos que esté el botón submit ignore-case
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });
});

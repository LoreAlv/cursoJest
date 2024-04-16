import { act, fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "./login-page";

describe("pruebas de login-page", () => {
    test("it should render login title", () => {
        render(<LoginPage />);
        // screen.debug();
        //miramos que esté el texto login ignore-case
        expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    });

    test("should render the form elements", () => {
        render(<LoginPage />);
        // screen.debug();
        //miramos que esté el campo email ignore-case
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        //miramos que esté el campo password ignore-case
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        //miramos que esté el botón submit ignore-case
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    test("should validate the inputs as required", async () => {
        render(<LoginPage />);
        //submit del form
        await act(() => {
            fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
        });
        //validar los errores
        // screen.debug();
        expect(screen.getByText(/The email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/The password is required/i)).toBeInTheDocument();
    });
});

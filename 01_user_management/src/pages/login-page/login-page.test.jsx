import { act, fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "./login-page";

const getSubmitBtn = () => {
    return screen.getByRole("button", { name: /submit/i });
};

const getEmailInput = () => {
    return screen.getByLabelText(/email/i);
};

const getPasswordInput = () => {
    return screen.getByLabelText(/password/i);
};

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
        expect(getEmailInput()).toBeInTheDocument();
        //miramos que esté el campo password ignore-case
        expect(getPasswordInput()).toBeInTheDocument();
        //miramos que esté el botón submit ignore-case
        expect(getSubmitBtn()).toBeInTheDocument();
    });

    test("should validate the inputs as required", async () => {
        render(<LoginPage />);
        //submit del form
        await act(() => {
            fireEvent.submit(getSubmitBtn());
        });
        //validar los errores
        // screen.debug();
        expect(screen.getByText(/The email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/The password is required/i)).toBeInTheDocument();
    });

    test("should validate the email format", async () => {
        render(<LoginPage />);
        await act(() => {
            //type an invalid email
            fireEvent.change(getEmailInput(), { target: { value: "a" } });
            //submit del form
            fireEvent.submit(getSubmitBtn());
        });
        //validar los errores
        // screen.debug();
        expect(screen.getByText(/The email is not valid/i)).toBeInTheDocument();
    });
});

import { act, fireEvent, screen } from "@testing-library/react";
import { LoginPage } from "./login-page";
import { renderWithProvider } from "../../mocks/renderWithProviders";

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
        renderWithProvider(<LoginPage />);
        // screen.debug();
        //miramos que esté el texto login ignore-case
        expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    });

    test("should render the form elements", () => {
        renderWithProvider(<LoginPage />);
        // screen.debug();
        //miramos que esté el campo email ignore-case
        expect(getEmailInput()).toBeInTheDocument();
        //miramos que esté el campo password ignore-case
        expect(getPasswordInput()).toBeInTheDocument();
        //miramos que esté el botón submit ignore-case
        expect(getSubmitBtn()).toBeInTheDocument();
    });

    test("should validate the inputs as required", async () => {
        renderWithProvider(<LoginPage />);
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
        renderWithProvider(<LoginPage />);
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

    test("should disable submit button while fetching data", async () => {
        renderWithProvider(<LoginPage />);
        expect(getSubmitBtn()).not.toBeDisabled();
        await act(() => {
            //type valid email and pass
            fireEvent.change(getEmailInput(), { target: { value: "a@la.com" } });
            fireEvent.change(getPasswordInput(), { target: { value: "1234" } });
            //submit del form
            fireEvent.submit(getSubmitBtn());
        });
        //validar los errores
        // screen.debug();
        expect(getSubmitBtn()).toBeDisabled();
    });
});

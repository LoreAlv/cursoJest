import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginPage } from "./login-page";
import { renderWithProviders } from "../../mocks/render-with-providers";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";

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
    const logIn = async (email = "test@example.com", password = "correct") => {
        //type valid email and pass
        fireEvent.change(getEmailInput(), { target: { value: email } });
        fireEvent.change(getPasswordInput(), { target: { value: password } });
        //submit del form
        fireEvent.submit(getSubmitBtn());
    };

        const logInUser = async (email = "test@example.com", password = "correct") => {
        //type valid email and pass
        userEvent.type(getEmailInput(),  email);
        userEvent.type(getPasswordInput(), password);
        //submit del form
  await userEvent.click(getSubmitBtn())
    };




    test("it should render login title", () => {
        renderWithProviders(<LoginPage />);
        // screen.debug();
        //miramos que esté el texto login ignore-case
        expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    });

    test("should render the form elements", () => {
        renderWithProviders(<LoginPage />);
        // screen.debug();
        //miramos que esté el campo email ignore-case
        expect(getEmailInput()).toBeInTheDocument();
        //miramos que esté el campo password ignore-case
        expect(getPasswordInput()).toBeInTheDocument();
        //miramos que esté el botón submit ignore-case
        expect(getSubmitBtn()).toBeInTheDocument();
    });

    test("should validate the inputs as required", async () => {
        renderWithProviders(<LoginPage />);
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
        renderWithProviders(<LoginPage />);
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
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <LoginPage />
            </QueryClientProvider>
        );

        expect(getSubmitBtn()).not.toBeDisabled();
        await logIn("lo@a.es", "correct");

        // screen.debug();
        // no le sale de los webs ir
        // expect(getSubmitBtn()).toBeDisabled();

    });

    test('it should disable the submit button while is fetching', async () => {
  renderWithProviders(<LoginPage />)
  expect(getSubmitBtn()).not.toBeDisabled()
  await userEvent.type(screen.getByLabelText(/email/i), 'john.doe@mail.com')
  await userEvent.type(screen.getByLabelText(/password/i), '123456')
  await userEvent.click(getSubmitBtn())

  await waitFor(() => expect(getSubmitBtn()).toBeDisabled())
})

    test("should show a loading indicator while fetching login", async () => {
        renderWithProviders(<LoginPage />);
        expect(screen.queryByRole("progressbar", { name: /loading/i })).not.toBeInTheDocument();
        await logIn();
        //validar los errores
        // screen.debug();
        expect(await screen.findByRole("progressbar", { name: /loading/i })).toBeInTheDocument();
    });

    test("should display 'unexpected error, please try again' when there is an error on the login", async () => {
        renderWithProviders(<LoginPage />);
//provocar error
        act( () => {logInUser('ala@a.es', 'error500')})
        screen.debug()
        expect(await screen.findByText("Unexpected error, please try again")).toBeInTheDocument();
    });
});

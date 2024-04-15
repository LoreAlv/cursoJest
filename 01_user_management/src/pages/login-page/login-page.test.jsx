import { render, screen } from "@testing-library/react";
import { LoginPage } from "./login-page";

describe("pruebas de login-page", () => {
    test("it should render login title", () => {
        render(<LoginPage />);
        screen.debug();
        //miramos que esté el texto login ignore-case
        expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    });
});

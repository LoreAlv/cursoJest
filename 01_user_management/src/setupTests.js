// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { queryClient } from "./mocks/renderWithProviders";
// import { server } from "./mocks/server";

// jest.mock("axios", () => require("../__mocks__/axios"));

beforeEach(async () => {
    //para limpiar cada test
    queryClient.clear();
    await queryClient.resetQueries();
    // console.log("me ejecuto para limpiar");
});

beforeAll(() => {
    //para limpiar cada test
    queryClient.clear();
    // server.listen();
});

afterEach(() => {
    //para limpiar cada test
    queryClient.clear();
    // server.resetHandlers();
});

afterAll(() => {
    //para limpiar cada test
    queryClient.clear();
    // server.close();
});

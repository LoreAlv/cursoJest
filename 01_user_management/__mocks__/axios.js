// __mocks__/axios.js

const axiosMock = {
    post: jest.fn((url, data) => {
        console.log("vamos con un mockito");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("vamos con un mockito");
                // if (data.email === "test@example.com" && data.password === "correct") {
                if (data.email && data.password === "correct") {
                    resolve({ data: { message: "Login successful" } });
                } else {
                    reject(new Error("Login failed"));
                }
            }, 100); // Delay de 30 segundos
        });
    }),
};

jest.mock("axios", () => ({
    post: jest.fn((url, data) => {
        console.log("vamos con un inline");
        return new Promise((resolve, reject) => {
            console.log("vamos con un mockito");
            setTimeout(() => {
                // if (data.email === "test@example.com" && data.password === "correct") {
                if (data.email && data.password === "correct") {
                    resolve({ data: { message: "Login successful" } });
                } else {
                    reject(new Error("Login failed"));
                }
            }, 500); // Delay de 30 segundos
        });
    }),
}));

console.log("mockeando AXIOS");

export default axiosMock;

import axios from "axios";
import { useMutation } from "react-query";

const loginService = async (email, password) => {
    console.log("login.post", { email, password });
    return axios.post("/login", { email, password });
    // try {
    //     const response = await axios.post("/login", { email, password });
    //     console.log(response);
    //     return response.data;
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
};

export const useLoginMutation = () => useMutation(({ email, password }) => loginService(email, password));

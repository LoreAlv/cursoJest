import axios from "axios";
import { useMutation } from "react-query";

const loginService = async (email, password) => {
    const response = await axios.post("/login", { email, password });
    console.log({ response });
};

export const useLoginMutation = () => {
    return useMutation(({ email, password }) => loginService(email, password));
};

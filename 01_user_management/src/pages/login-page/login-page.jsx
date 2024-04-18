import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./login-schema";
import axios from "axios";
import { useMutation } from "react-query";

const loginService = async (email, password) => {
    const response = await axios.post("/login", { email, password });
    console.log({ response });
};

export const LoginPage = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const mutation = useMutation(({ email, password }) => loginService(email, password));
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async ({ email, password }) => {
        // const onSubmit = async (data) => {
        // setIsLoading(true);
        // console.log(data);
        // await loginService(data.email, data.password);
        mutation.mutate({ email, password });
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formElement = event.currentTarget;
    //     const { email, password } = formElement.elements;
    //     if (!email.value) {
    //         setEmailErrorMsg("The email is required");
    //     }
    //     if (!password.value) {
    //         setPasswordErrorMsg("The password is required");
    //     }
    // };
    return (
        <>
            <Typography component="h1">login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Email" {...register("email", { required: true })} helperText={errors.email?.message} />
                <TextField label="Password" {...register("password", { required: true })} helperText={errors.password?.message} />
                <Button disabled={mutation.isLoading}>Submit</Button>
            </form>
        </>
    );
};

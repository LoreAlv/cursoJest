import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./login-schema";
import { useLoginMutation } from "./use-login-mutation";

export const LoginPage = () => {
    const mutation = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async ({ email, password }) => {
        mutation.mutate({ email, password });
    };

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

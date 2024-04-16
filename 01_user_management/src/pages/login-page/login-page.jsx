import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

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
                <TextField label="Email" {...register("email", { required: true })} helperText={errors.email && "The email is required"} />
                <TextField label="Password" {...register("password", { required: true })} helperText={errors.password && "The password is required"} />
                <Button>Submit</Button>
            </form>
        </>
    );
};

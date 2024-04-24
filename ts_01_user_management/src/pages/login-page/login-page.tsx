import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./login-schema";
import { useLoginMutation } from "./use-login-mutation";
import { StyledLoadder } from "../../components/loader";
import { Inputs } from "./login-page.interfaces";
import axios from "axios";

export const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const mutation = useLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(loginSchema),
    })
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        setErrorMessage('')
        mutation.mutate({ email, password }, {
            onError(error, variables, context) {
                let _errorMessage = 'Unexpected error, please try again'
                //error status code
                if (axios.isAxiosError(error)) {
                    if (error?.response?.status === 401) {
                        _errorMessage = 'The email or password are not correct'
                    }
                    setErrorMessage(_errorMessage)

                }
            },
        })
    }


    // if (mutation.isLoading)
    console.log(mutation.isLoading, mutation.error, mutation.isError);
    return (
        <>
            <Typography component="h1">login</Typography>
            {mutation.isLoading && <StyledLoadder role="progressbar" aria-label="loading" />}
            {mutation.error &&
                <Typography component="h2">{errorMessage}</Typography>

            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Email" {...register("email", { required: true })} helperText={errors.email?.message} />
                <TextField label="Password" {...register("password", { required: true })} helperText={errors.password?.message} />
                <Button disabled={mutation.isLoading} type="submit">
                    Submit
                </Button>
            </form>
        </>
    );
};

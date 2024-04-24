import React, { useState } from "react";
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./login-schema";
import { useLoginMutation } from "./use-login-mutation";
import { StyledLoadder } from "../../components/loader";
import { Inputs } from "./login-page.interfaces";
import axios from "axios";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    {mutation.isLoading && <StyledLoadder role="progressbar" aria-label="loading" />}
                    {mutation.isError &&
                        <Typography component="h2">{errorMessage}</Typography>

                    }
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            {...register('email', { required: true })}
                            helperText={errors.email?.message}
                            error={!!errors.email}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            {...register('password', { required: true })}
                            helperText={errors.password?.message}
                            error={!!errors.password}
                        />
                        <Button
                            disabled={mutation.isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./login-schema";
import { useLoginMutation } from "./use-login-mutation";
import { StyledLoadder } from "../../components/loader";
import { Inputs } from "./login-page.interfaces";

export const LoginPage = () => {
 const mutation = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
  })
  const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
    mutation.mutate({email, password})
  }


    // if (mutation.isLoading)
    console.log(mutation.isLoading, mutation.error, mutation.isError);
    return (
        <>
            <Typography component="h1">login</Typography>
            {mutation.isLoading && <StyledLoadder role="progressbar" aria-label="loading" />}
            {mutation.error && 
                        <Typography component="h2">Unexpected error, please try again</Typography>

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

import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

export const LoginPage = () => {
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const { email, password } = formElement.elements;
        if (!email.value) {
            setEmailErrorMsg("The email is required");
        }
        if (!password.value) {
            setPasswordErrorMsg("The password is required");
        }
    };
    return (
        <>
            <Typography component="h1">login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email" name="email" helperText={emailErrorMsg} />
                <TextField label="Password" name="password" helperText={passwordErrorMsg} />
                <Button>Submit</Button>
            </form>
        </>
    );
};

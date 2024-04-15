import React from "react";
import { Button, TextField, Typography } from "@mui/material";

export const LoginPage = () => {
    return (
        <>
            <Typography component="h1">login</Typography>
            <TextField label="Email" />
            <TextField label="Password" />
            <Button>Submit</Button>
        </>
    );
};

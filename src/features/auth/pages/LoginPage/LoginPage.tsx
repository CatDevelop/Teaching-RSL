import { Input } from "../../../../components/Input";
import { typedMemo } from "../../../../core/utils/typedMemo";
import React, { FC } from "react";
import { LoginForm } from "./components/LoginForm";

export const LoginPage: FC = typedMemo(function LoginPage(){
    return (
        <LoginForm/>
    )
})
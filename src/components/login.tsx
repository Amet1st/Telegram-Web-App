import React from 'react';
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';
import {useAuth} from "../services/authProvider";
import {environment} from "../evn";

const TelegramAuth = () => {
    const {login} = useAuth()

    return (
        <TelegramLoginButton
            className="flex items-center justify-center"
            dataOnauth={login}
            botName={environment.telegramBotName}
            buttonSize="large"
            usePic={true}
        />
    );
};

export default TelegramAuth;
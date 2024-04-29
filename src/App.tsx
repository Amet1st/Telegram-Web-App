import React, {useEffect} from 'react';
import TelegramAuth from "./components/login";
import AppLayout from "./components/appLayout";
import {Route, Routes, Navigate, useLocation, useSearchParams} from "react-router-dom";
import UserInfo from "./components/user/userInfo";
import {useAuth} from "./services/authProvider";
import {useGlobalStateContext} from "./services/globalStateProvider";
import Channel from "./components/channel/channel";
import ChannelInfo from "./components/channel/channelInfo";
import TelegramService from "./services/telegramService";
import AuthUserInfoButton from "./components/user/authUserInfoButton";
import {TelegramSearchParams, TelegramSearchPathType} from "./models/interfaces";
import {DEFAULT_START, DEFAULT_COUNT, ZERO_POSITION} from "./models/constants";
import Home from "./components/home";

export default function App() {
    const {user} = useAuth();
    const {dispatch} = useGlobalStateContext();
    const pathname = useLocation().pathname as TelegramSearchPathType;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const [id, start, count] = getSearchParams();


        if (!id || !user || (pathname !== TelegramSearchPathType.Messages && pathname !== TelegramSearchPathType.User && pathname !== TelegramSearchPathType.Channel)) return;


        const fetchAndDispatchChannelMessages = async () => {
            const allMessages = await TelegramService.getChannelMessages(start);
            const channelInfo = await TelegramService.getChannelInfo(id);
            const channelMembersCount = await TelegramService.getChannelMemberCount(id);
            const activeMessages = allMessages.slice(ZERO_POSITION, count);
            dispatch({allMessages, channelInfo, activeMessages, channelMembersCount, count, start});
        }

        const fetchAndDispatchUserData = async () => {
            const activeUser = await TelegramService.getUserInfo(id);
            dispatch({activeUser});
        }

        const fetchAndDispatchChannelInfo = async () => {
            const channelInfo = await TelegramService.getChannelInfo(id);
            const channelMembersCount = await TelegramService.getChannelMemberCount(id);
            dispatch({channelInfo, channelMembersCount});
        }

        switch (pathname) {
            case TelegramSearchPathType.User:
                fetchAndDispatchUserData();
                break;
            case TelegramSearchPathType.Messages:
                fetchAndDispatchChannelMessages();
                break;
            case TelegramSearchPathType.Channel:
                fetchAndDispatchChannelInfo();
                break;
        }

    }, [pathname, searchParams]);

    const getSearchParams = (): [string, number, number] => {
        const id = searchParams.get(TelegramSearchParams.Id) ?? '';
        const start = searchParams.get(TelegramSearchParams.Start) ?? DEFAULT_START;
        const count = searchParams.get(TelegramSearchParams.Count) ?? DEFAULT_COUNT;

        return [id, +start, +count];
    }

    return (
        <>
            <AppLayout/>
            <Routes>
                <Route index path="/home" element={user ? <Home/> : <Navigate to="/login"/>}></Route>
                <Route path="/login" element={user ? <Navigate to="/home"/> : <TelegramAuth/>}></Route>
                <Route path="/messages" element={user ? <Channel/> : <Navigate to="/login"/>}/>
                <Route path="/user" element={user ? <UserInfo/> : <Navigate to="/login"/>}/>
                <Route path="/channel" element={user ? <ChannelInfo/> : <Navigate to="/login"/>}/>
                <Route path="*" element={<Navigate to="/home"/>}/>
            </Routes>
            <AuthUserInfoButton user={user}></AuthUserInfoButton>
        </>
    );
}


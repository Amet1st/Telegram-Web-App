import {createContext, useState, ReactNode, useContext} from "react";
import {IMessage, IChannelInfo, IMockUser} from "../models/interfaces";
import {DEFAULT_START, DEFAULT_COUNT, DEFAULT_INDEX} from "../models/constants";

interface IGroupContext {
    allMessages: IMessage[]
    activeMessages: IMessage[];
    activeUser?: IMockUser;
    channelInfo?: IChannelInfo;
    channelMembersCount?: number;
    index: number;
    start: number;
    count: number;
    dispatch: (data: Partial<IGroupContext>) => void;
}

const defaultState: IGroupContext = {
    allMessages: [],
    activeMessages: [],
    index: DEFAULT_INDEX,
    start: DEFAULT_START,
    count: DEFAULT_COUNT,
    dispatch: () => {
    },
}

export const GlobalStateContext = createContext<IGroupContext>(defaultState);

export const GlobalStateProvider = ({children}: { children: ReactNode }) => {
    const [state, setState] = useState<IGroupContext>(defaultState);

    const dispatch = (data: Partial<IGroupContext>) => {

        const {activeUser, channelInfo, channelMembersCount, activeMessages, allMessages, index, count, start} = data;

        if (activeUser) {
            setState((prev) => {
                return {...prev, activeUser};
            });
        }

        if (channelInfo) {
            setState((prev) => {
                return {...prev, channelInfo};
            });
        }

        if (channelMembersCount) {
            setState((prev) => {
                return {...prev, channelMembersCount};
            });
        }

        if (allMessages) {
            setState((prev) => {
                return {...prev, allMessages: allMessages as IMessage[]};
            });
        }

        if (activeMessages) {
            setState((prev) => {
                return {...prev, activeMessages: activeMessages as IMessage[]};
            });
        }

        if (index !== undefined) {

            if (index < 0 || index > Math.floor(state.allMessages.length / state.count)) {
                return;
            }

            const activeMessages = state.allMessages.slice(index * state.count, index * state.count + state.count);

            setState((prev) => {
                return {...prev, index, activeMessages};
            });
        }

        if (count) {
            setState((prev) => {
                return {...prev, count: count as number};
            });
        }

        if (start) {
            setState((prev) => {
                return {...prev, start: start as number};
            });
        }
    }

    return (
        <GlobalStateContext.Provider value={{...state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);



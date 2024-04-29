import ChannelHeader from "./channelHeader";
import MessageList from "./messageList";
import NavigationArrows from "./navigationArrows";
import React from "react";
import {useGlobalStateContext} from "../../services/globalStateProvider";

export default function Channel() {
    const {start, count} = useGlobalStateContext();

    return (
        <div className="flex flex-col items-center gap-3 px-[30px]">
            <ChannelHeader/>
            {start || count ? <NavigationArrows/> : null}
            <MessageList/>
        </div>
    )
}
import Message from "./message";
import React from "react";
import {useGlobalStateContext} from "../../services/globalStateProvider";

export default function MessageList() {
    const {activeMessages: messages} = useGlobalStateContext();

    return (<ul className="flex flex-col gap-3 max-h-[850px] px-3 overflow-y-auto">
            {messages.map((message) => <Message key={message.id} text={message.text} authorId={message.authorId}/>)}
        </ul>
    );
}
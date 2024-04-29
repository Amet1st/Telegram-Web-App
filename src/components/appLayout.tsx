import React from "react";
import {Link} from "react-router-dom";
import telegram from "../assets/telegram.png";

export default function AppLayout() {
    return (
        <div className="container mx-auto flex flex-col gap-3 p-6">
            <header className="flex justify-center items-center gap-3">
                <h1 className="flex items-center justify-center text-3xl font-bold">Test Telegram App</h1>
                <Link to="/home"><img className="w-[36px] h-[36px]" src={telegram} alt="Home"/></Link>
            </header>
        </div>
    );
}
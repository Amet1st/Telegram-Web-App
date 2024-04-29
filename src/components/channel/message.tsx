import {ReactElement} from "react";
import user from "../../assets/user.png";
import {Link} from "react-router-dom";
import HTMLReactParser from "html-react-parser";

export default function Message({text, authorId}: { text: string, authorId: string }): ReactElement {
    return (
        <div className="message flex justify-center items-center gap-3">
            <Link className="contents" to={{pathname: "/user", search: `?id=${authorId}`}}>
                <img className="block w-[40px] h-[40px] self-end" src={user} alt="User"/>
            </Link>
            <div className="border p-3 rounded-xl bg-white text-black">{HTMLReactParser(text)}</div>
        </div>
    );
}
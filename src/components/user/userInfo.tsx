import userImg from "../../assets/user.png";
import {useSearchParams, Link} from "react-router-dom";
import {useAuth} from "../../services/authProvider";
import {useGlobalStateContext} from "../../services/globalStateProvider";

export default function UserInfo() {
    const {activeUser, channelInfo} = useGlobalStateContext();
    const [searchParams] = useSearchParams();
    const {user: me} = useAuth();
    const isMe = searchParams.has("me");

    return (
        <div className="flex items-center bg-violet-900 flex-col w-[300px] gap-4 py-4 mx-auto rounded-md shadow-lg">
            <header className="flex items-center flex-col">
                <img src={userImg} alt="user"/>
                <p className="text-2xl font-bold">{isMe ? me?.first_name : activeUser?.name}</p>
                <p className="text-sm">{isMe ? "last seen recently" : activeUser?.status}</p>
            </header>
            <div className="flex flex-col gap-3">
                <p className="cursor-pointer">{isMe ? me?.username : activeUser?.username}</p>
                {isMe ? null : <p>{activeUser?.bio}</p>}
            </div>

            {isMe ? null :
                <div className="flex flex-col">Common groups:
                    <i><Link
                        to={{pathname: "/channel", search: `?id=${channelInfo?.id}`}}>{channelInfo?.title}</Link></i>
                </div>
            }
        </div>
    );
}
import groupImg from "../../assets/group.png";
import {useGlobalStateContext} from "../../services/globalStateProvider";
import {Link} from "react-router-dom";

export default function ChannelInfo() {

    const {channelInfo, channelMembersCount} = useGlobalStateContext();

    return (
        <div className="flex items-center bg-violet-900 flex-col w-[300px] gap-4 p-[30px] mx-auto rounded-md shadow-lg">
            <header className="flex items-center flex-col gap-3">
                <img src={groupImg} alt="Group"/>
                <Link to={{pathname: "/messages", search: `?id=${channelInfo?.id}`}}>
                    <div className="text-xl font-bold text-center">{channelInfo?.title}</div>
                </Link>
                <div className="text-base italic">{channelMembersCount} Subscribers</div>
            </header>
        </div>
    );
}
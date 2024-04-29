import {Link} from "react-router-dom";
import {useGlobalStateContext} from "../../services/globalStateProvider";

export default function ChannelHeader() {
    const {channelInfo, channelMembersCount} = useGlobalStateContext();

    return (
        <Link to={{pathname: "/channel", search: `?id=${channelInfo?.id}`}}
              className="flex items-center flex-col w-fit">
            <header className="flex justify-center items-center flex-col border-4 rounded-xl w-fit px-[50px]">
                <div className="text-xl font-bold">{channelInfo?.title}</div>
                <div className="text-base italic">{channelMembersCount} Subscribers</div>
            </header>
        </Link>
    );
}
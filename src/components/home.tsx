export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold">Please use URL search field to retrieve Telegram public channel
                messages</h2>
            <ul className="text-l">
                Available formats:
                <li><i>/messages?id=xxx</i> - first 20 messages from channel</li>
                <li><i>/messages?id=xxx&start=N&count=N</i> - custom numbers of messages per page with start position
                </li>
                <li><i>/user?id=xxx</i> - search among the predefined users. You can find list of predefined user Ids in
                    GitHub repo
                </li>
            </ul>
        </div>

    );
}
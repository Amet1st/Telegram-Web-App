import {ITelegramUser} from "../../models/interfaces";
import {Link} from "react-router-dom";

export default function AuthUserInfoButton({user}: { user: ITelegramUser | null }) {

    if (!user) return null;

    return (
        <Link to={{pathname: "/user", search: `?me=true`}}
              className="min-w-[80px] p-4 text-xl rounded-xl bg-violet-900 absolute top-3 right-3">
            {user.username}
        </Link>
    );
}
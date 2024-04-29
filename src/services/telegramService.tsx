import axios from "axios";
import {IMessage, IChannelInfo, IMockUser} from "../models/interfaces";
import {environment} from "../evn";
import {mockMessagesData, mockUsersData} from "../models/mockData";

type ChannelRequestResult = { result: IChannelInfo };
type MemberCountRequestResult = { result: number };

export default class TelegramService {

    public static async getChannelMessages(start: number): Promise<IMessage[]> {
        await axios.get(environment.mockRequestUrl);

        return mockMessagesData.slice(start);
    }

    public static async getUserInfo(userId: string): Promise<IMockUser | undefined> {
        await axios.get(environment.mockRequestUrl);

        return mockUsersData.find(user => user.id === userId);
    }

    public static async getChannelInfo(channelId: string): Promise<IChannelInfo> {
        const response = await axios.get<IChannelInfo & ChannelRequestResult>(`${environment.telegramBotApiUrl}/getChat?chat_id=${channelId}`)

        return response.data.result;
    }

    public static async getChannelMemberCount(channelId: string): Promise<number> {
        const response = await axios.get<number & MemberCountRequestResult>(`${environment.telegramBotApiUrl}/getChatMemberCount?chat_id=${channelId}`)

        return response.data.result;
    }
}

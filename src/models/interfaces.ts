export enum TelegramSearchParams {
    Id = "id",
    Start = "start",
    Count = "count"
}

export enum TelegramSearchPathType {
    Messages = "/messages",
    User = "/user",
    Channel = "/channel"
}

export interface IChannelInfo {
    id: string;
    title: string;
    // Not actually "user" name; it is Telegram Bot API field naming specificity
    username: string;
}

export interface IMessage {
    id: string;
    authorId: string;
    text: string;
}

export interface IMockUser {
    id: string;
    name: string;
    status: string;
    username?: string;
    bio?: string;
}

export interface ITelegramUser {
    id: number;
    username: string;
    auth_date: number;
    first_name: string;
}


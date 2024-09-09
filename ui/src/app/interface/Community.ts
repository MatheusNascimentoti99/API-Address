import { User } from "./User";

export interface CommunityForm {
    name: string,
    description: string
}

export interface Community {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
}

export interface Dashboard {
    countUsersWithCommunity: number;
    countCommunities: number;
    avgAddressByCommunity: number
}
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
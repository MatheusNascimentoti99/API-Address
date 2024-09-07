import { Community } from "./Community";

export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    complement: string;
    number: number;
    communities: Community[];
}
import { Missing } from "@sap/unified-store";

export interface Data {
    status: string;
    currentUser: string | Missing;
    userWon: string | Missing;
}
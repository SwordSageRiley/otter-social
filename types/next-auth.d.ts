import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user_id: string,
        email: string,
        username: string,
    }
    interface User {
        user_id: string,
        email: string,
        username: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user_id: string,
        email: string,
        username: string
    }
}
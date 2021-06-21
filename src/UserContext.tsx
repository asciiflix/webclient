import { createContext } from "react";

export default interface UserLoginContext{
    jwtToken: string
    username: string
}

export const UserContext = createContext<UserLoginContext | null>(null);
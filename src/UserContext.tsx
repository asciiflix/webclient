import { createContext } from "react";

export default class UserLoginContext{
    jwtToken: string
    username: string
    rerender: Function

    constructor(jwtToken: string, username: string, rerender: Function) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.rerender = rerender;
    }

    setUsername = (name:string) => {
        this.username = name
    }

    setJwtToken = (jwt: string) => {
        this.jwtToken = jwt;
    }
}

export const EMPTY_USER_CONTEXT =  new UserLoginContext("", "", () => {});

export const UserContext = createContext<UserLoginContext>(new UserLoginContext("", "", () => {}));
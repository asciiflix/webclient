import React from "react";
import jwt_decode, { JwtStored } from "../Helper/JwtDecoder";
import { getUserNameFromAPI } from "../Helper/UsernameApi";

export interface JwtUserInfo {
    username: string
    jwtToken: string
}

export interface JwtUserContext {
    jwtUserInfo: JwtUserInfo
    changeJwt: Function
}

export function saveJwtToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
}

export function clearJwtToken() {
    localStorage.removeItem('jwt');
}

export function saveUsername(username: string) {
    localStorage.setItem('uname', username)
}

export function getUsernameFromStorage(): string {
    return localStorage.getItem('uname') as string
}

export function getJwtTokenFromStorage(): string {
    let jwtToken = localStorage.getItem('jwt') as string;
    if (jwtToken === null){
      jwtToken = "";
    }
    return jwtToken as string
}

export async function updateUsername(updateComponent: Function, jwt: string) {
    let jwtDecoded: JwtStored = jwt_decode(jwt);
    if (jwtDecoded.User_ID !== "") {
        let username: string | null = await getUserNameFromAPI(jwt_decode(jwt).User_ID);
        if (username !== null){
            saveJwtToken(jwt);
            saveUsername(username);
            updateComponent(username);
        }
    } else if (jwt === "") {
        // for logout
        updateComponent("");
    }
}

export function clearUnameToken() {
    localStorage.removeItem('uname');
}

export const JwtConext = React.createContext<JwtUserContext>({jwtUserInfo: {username: "", jwtToken: ""}, changeJwt: (newJwt: string) => {}});
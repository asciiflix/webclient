import { createContext } from "react";

export const UserContext = createContext<string | null>("");

export default function Handler() {
    return (
        <UserContext.Provider value={null}>
        </UserContext.Provider>
    )
}
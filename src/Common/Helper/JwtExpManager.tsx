import { getJwtTokenFromStorage } from "../JwtContext/JwtContext";
import jwt_decode from "./JwtDecoder";

export default function jwtExpManager() {
    let jwtToken: any = getJwtTokenFromStorage();
    if (jwtToken !== null) {
        let jwtDecoded: any = jwt_decode(jwtToken);
        let dateNow = new Date();

        //Remove JWT-Token if expired
        if (jwtDecoded !== null && jwtDecoded["exp"]*1000 < dateNow.getTime()) {
            localStorage.removeItem("jwt");
        }
    }
}
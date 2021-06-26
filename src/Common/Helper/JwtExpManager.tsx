import jwt_decode from "./JwtDecoder";

export default function jwtExpManager() {
    let jwtToken: any = localStorage.getItem("jwt");
    if (jwtToken !== null) {
        let jwtDecoded: any = jwt_decode(jwtToken);
        let dateNow = new Date();

        //Remove JWT-Token if expired
        if (jwtDecoded["exp"]*1000 < dateNow.getTime()) {
            localStorage.removeItem("jwt");
        }
    }
}
export interface JwtStored {
  User_ID: string
  User_email: string
}

export default function jwt_decode(input: string): JwtStored {
    if (input !== null && input !== "") {
      var parts = input.split('.'); // header, payload, signature
      return JSON.parse(atob(parts[1])) as JwtStored;
    } else {
      return {User_ID: "", User_email: ""}
    }
  }
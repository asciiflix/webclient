import { backendURL } from "../../Config";

export async function getUserNameFromAPI(userID: string) {
    let httpCode: number = 0;
    let fetchedUsername: string = "";
    await fetch(backendURL + "/user/getUser?id=" + userID)
      .then(response => {
        httpCode = response.status;
        return response.json();
      })
      .then(json => fetchedUsername = json.Name);
    if (httpCode === 200) {
      return fetchedUsername;
    } else {
      return "UltraSecretUser";
    }
  }
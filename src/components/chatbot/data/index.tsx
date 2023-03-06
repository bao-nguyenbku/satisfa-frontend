const baseURL = "https://developers.zomato.com/api/v2.1/";
import axios from "axios";

export async function getTable(fromTime: Date, toTime: Date, customerAmount: number){
    let data = await axios.get<String[]>(
        `${baseURL}search?from=${fromTime}&to=${toTime}&amount=${customerAmount}`,
        {headers: {
            Accept: "application/json",
            "user-key": "443cebb0c149559671b6093778226894",
          }
        }
    )
    console.log(data)
    return data
}
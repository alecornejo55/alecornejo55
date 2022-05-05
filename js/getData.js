import { baseURL } from "./app.js";
const getData = async () => {
    let baseUrl = baseURL()
    try {
        const response = await fetch(`${baseUrl}/json/stock.json`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Hubo un error");
    }
}

export {getData};
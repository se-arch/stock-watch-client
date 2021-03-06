
import { debounce } from 'ts-debounce';
import fetch from 'node-fetch'

class StockAPI {
    // private baseUrl = process.env.API_URL || "http://localhost:5000";
    private baseUrl = "https://stock-watch--server.herokuapp.com";

    getData = async (query: string, startDate: number, endDate: number) => {
        console.log(`querying ${this.baseUrl}`);

        try {
            const url: string = `${this.baseUrl}/search?value=${query}&startDate=${startDate}&endDate=${endDate}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    };

    search = async (query: string) => {
        try {
            const url: string = `${this.baseUrl}/lookup?value=${query}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const json = await response.json();
            return json;

        } catch (error) {
            throw error;
        }
    }

    debouncedGetData = debounce(this.getData, 200);
    debouncedSearch = debounce(this.search, 50);
}

export default StockAPI;

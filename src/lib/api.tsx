
import { debounce } from 'ts-debounce';
import fetch from 'node-fetch'

class StockAPI {
    private baseUrl = "http://localhost:5000";

    getData = async (query: string) => {
        try {
            const url: string = `${this.baseUrl}/search?value=${query}`;
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

    debouncedGetData = debounce(this.getData, 200);
}

export default StockAPI;

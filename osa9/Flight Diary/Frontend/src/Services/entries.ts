import axios from "axios";
const baseUrl= "http://localhost:3000/api/diaries/"
import { DiaryEntry } from "../App";

const getAll = () => {
    const request = axios.get<DiaryEntry[]>(baseUrl)
    return request.then(response => response.data)
}

const addEntry = async (newEntry: DiaryEntry) => {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, newEntry);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data);
            } else {
                throw new Error("Something went wrong");
            }
        } else {
            console.error(error);
            throw new Error("Something went wrong while adding the entry.");
        }
    }
};

export default {
    getAll,
    addEntry
}
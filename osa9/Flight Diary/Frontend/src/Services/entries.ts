import axios from "axios";
const baseUrl= "http://localhost:3000/api/diaries/"
import { DiaryEntry } from "../App";

const getAll = () => {
    const request = axios.get<DiaryEntry[]>(baseUrl)
    return request.then(response => response.data)
}

const addEntry = (newEntry: DiaryEntry) => {
    const request = axios.post<DiaryEntry[]>(baseUrl, newEntry)
    return request.then(response => response.data)
}

export default {
    getAll,
    addEntry
}
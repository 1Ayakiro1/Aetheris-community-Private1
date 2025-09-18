import axios from "axios";

//потом перенести в env
const API_URL = "http://localhost:8000";

export async function fetchArticles() {
    const res = await axios.get(`${API_URL}/articles/`);
    return res.data;
}

export async function createArticle(title: string, content: string) {
    const res = await axios.post(`${API_URL}/articles/`, { title, content });
    return res.data;
}

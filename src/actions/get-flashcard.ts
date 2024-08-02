"use server"

const url = process.env.FLASK_API_URL ?? "http://127.0.0.1:5000/"

export const flash_cards = async (ctx: string) => {
    try {
        const response = await fetch(`${url}/${ctx}`);
        if (!response.ok) {
            console.error("There was a problem with the fetch operation:", response.status);
            return "error"
        }
        const data = await response.json();
        if (data["error"] === true) {
            return "error"
        }
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return "error"
    }
}
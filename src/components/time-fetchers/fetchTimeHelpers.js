
export const fetchTimeFromTimeApi = () => {
    const fetchTime = async () => {
        try {
            const response = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Europe%2FWarsaw");
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            const dateString = data.date;
            console.log(dateString);
            const [month, day, year] = dateString.split("/").map(Number);
            return new Date(year, month - 1, day);
        } catch (error) {
            console.error("Failed to fetch time from Time Api.", error.message);
            console.log("Return time from local as fallback");
            return fetchTimeFromLocal();
        }
    }
    return fetchTime();
}


export const fetchTimeFromLocal = () => {
    const now = new Date();
    const polishOffset = new Date().getTimezoneOffset() + 60; // Offset from UTC+1 (CET)
    return new Date(now.getTime() + polishOffset * 60 * 1000);
}

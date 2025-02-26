document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.onMessage.addListener((message) => {
        if (message.eventDate) {
            const eventDate = new Date(message.eventDate);
            document.getElementById("event-details").innerText =
                `Detected Event: ${eventDate.toLocaleString()}`;
            
            document.getElementById("add-event").addEventListener("click", function () {
                const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?dates=${formatGoogleCalendarDate(eventDate)}`;
                window.open(googleCalendarUrl, "_blank");
            });
        }
    });
});

function formatGoogleCalendarDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, "") + "/" + new Date(date.getTime() + 3600000).toISOString().replace(/-|:|\.\d+/g, "");
}

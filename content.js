// Load Chrono from CDN dynamically
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/chrono-node/2.7.7/chrono.min.js";
script.onload = () => {
    console.log("ChronoNode loaded!");
    findDatesInPage();
};
document.head.appendChild(script);

function findDatesInPage() {
    const text = document.body.innerText;
    const parsedDates = chrono.parse(text);

    let eventDate;
    
    if (parsedDates.length > 0) {
        eventDate = parsedDates[0].start.date();
    } else {
        // Default: Next week, during working hours (Monday 10 AM)
        eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + (8 - eventDate.getDay())); // Move to next Monday
        eventDate.setHours(10, 0, 0, 0); // Set time to 10 AM
    }

    // Send detected date to popup.js
    chrome.runtime.sendMessage({ eventDate: eventDate.toISOString() });
}

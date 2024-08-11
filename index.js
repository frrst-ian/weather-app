const userInput = document.getElementById("search-input");
const errorMessage = document.getElementById("error-message");
const weatherInfo = document.getElementById("weather-info");
const apiKey = "FPH9RFSWLTN2TJHTWYH98MWQY";

async function fetchWeather(location) {
    errorMessage.textContent = "";
    weatherInfo.textContent = "";

    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`,
            { mode: "cors" }
        );

        if (!response.ok) {
            throw new Error("Please enter a valid location or check your internet connection");
        }

        const data = await response.json();
        console.log(data)
        displayWeather(data);


    } catch (error) {
        console.error("Error:", error);
        errorMessage.textContent = `${error.message}.`;
    }
}

function displayWeather(data) {
    const currentConditions = data.currentConditions;
    const temperature = currentConditions.temp;
    const condition = currentConditions.conditions;
    const humidity = currentConditions.humidity;
    const windSpeed = currentConditions.windspeed;
    const feelsLike = currentConditions.feelslike;
    const uvIndex = currentConditions.uvindex;

    weatherInfo.innerHTML = `
    <h2>${data.resolvedAddress}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Feels like: ${feelsLike}</p>
    <p>Condition: ${condition}</p>
    <p>Humidity: ${humidity}</p>
    <p>Wind Speed: ${windSpeed}</p>
    <p>UV Index: ${uvIndex}</p>`;

    setBackground(condition);

}

function setBackground(condition) {
    condition = condition.toLowerCase();
    weatherInfo.className = "weather-info";
    if (condition.includes("sunny") || condition.includes("clear")) {
        weatherInfo.classList.add("sunny");
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
        weatherInfo.classList.add("cloudy");
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
        weatherInfo.classList.add("rainy");
    } else if (condition.includes('fog') || condition.includes("mist")) {
        weatherInfo.classList.add("foggy");
    } else if (condition.includes('thunder') || condition.includes("storm")) {
        weatherInfo.classList.add("stormy");
    } else {
        weatherInfo.classList.add("default");
    }
}

userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const location = userInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            errorMessage.textContent = "Please enter a valid location";
        }
    }
})




/* eslint-disable no-undef */
const userInput = document.getElementById("search-input");
const errorMessage = document.getElementById("error-message");
const weatherInfo = document.getElementById("weather-info");
const apiKey = "FPH9RFSWLTN2TJHTWYH98MWQY";

async function fetchWeather(location = "manila") {
  //Save to localStorage
  if (location !== "manila") {
    localStorage.setItem("lastLocation", location);
  }
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
    <p class="bold increase-fontsize condition-font" >${condition}</p>
    <p class="bold increase-fontsize">${temperature}°C</p>
    <p class="bold align-text">FEELS LIKE &nbsp  ${feelsLike}°C</p>
    <div class="icons">
  <div class="icon">
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path id="humidity-path"
        d="M18.5 22.75C16.16 22.75 14.25 20.84 14.25 18.5V18C14.25 17.59 14.59 17.25 15 17.25C15.41 17.25 15.75 17.59 15.75 18V18.5C15.75 20.02 16.98 21.25 18.5 21.25C20.02 21.25 21.25 20.02 21.25 18.5C21.25 16.98 20.02 15.75 18.5 15.75H2C1.59 15.75 1.25 15.41 1.25 15C1.25 14.59 1.59 14.25 2 14.25H18.5C20.84 14.25 22.75 16.16 22.75 18.5C22.75 20.84 20.84 22.75 18.5 22.75Z"
        fill="#292D32"
      />
      <path id="humidity-path1"
        d="M18.5 12.75H2C1.59 12.75 1.25 12.41 1.25 12C1.25 11.59 1.59 11.25 2 11.25H18.5C20.02 11.25 21.25 10.02 21.25 8.5C21.25 6.98 20.02 5.75 18.5 5.75C16.98 5.75 15.75 6.98 15.75 8.5V9C15.75 9.41 15.41 9.75 15 9.75C14.59 9.75 14.25 9.41 14.25 9V8.5C14.25 6.16 16.16 4.25 18.5 4.25C20.84 4.25 22.75 6.16 22.75 8.5C22.75 10.84 20.84 12.75 18.5 12.75Z"
        fill="#292D32"
      />
      <path id="humidity-path2"
        d="M9.31 9.75109H2C1.59 9.75109 1.25 9.41109 1.25 9.00109C1.25 8.59109 1.59 8.25109 2 8.25109H9.31C10.38 8.25109 11.25 7.38109 11.25 6.31109C11.25 5.24109 10.38 4.37109 9.31 4.37109C8.24 4.37109 7.37 5.24109 7.37 6.31109V6.69109C7.37 7.10109 7.03 7.44109 6.62 7.44109C6.21 7.44109 5.87 7.11109 5.87 6.69109V6.31109C5.87 4.41109 7.41 2.87109 9.31 2.87109C11.21 2.87109 12.75 4.41109 12.75 6.31109C12.75 8.21109 11.21 9.75109 9.31 9.75109Z"
        fill="#292D32"
      />
    </svg>
  </div>
  <div class="icon">
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path id="wind-path"
        d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z"
        fill="#0F0F0F"
      />
      <path id="wind-path1"
        d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z"
        fill="#0F0F0F"
      /> 
      <path id="wind-path2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
        fill="#0F0F0F"
      />
      <path
        d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z"
        fill="#0F0F0F"
      />
    </svg>
  </div>
  <div class="icon">
    <svg
      fill="#000000"
      width="20px"
      height="20px"
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          .cls-1 {
            fill: none;
          }
        </style>
      </defs>
      <title>uv-index</title>
      <path id="uv-path"
        d="M16,5.9121l1.7444,2.9326.7822,1.315,1.4739-.4107,3.1206-.87L22.2512,12,21.84,13.4731l1.315.7823L26.0876,16l-2.9323,1.7441-1.315.7818L22.2512,20l.87,3.1211-3.1208-.87L18.5266,21.84l-.7822,1.315L16,26.0879l-1.7444-2.9326-.7822-1.315L12,22.251l-3.1208.87L9.7488,20l.4109-1.4741-1.315-.7818L5.9124,16l2.9323-1.7446,1.315-.7823L9.7488,12l-.87-3.1206L12,9.749l1.4739.4107.7822-1.315L16,5.9121M16,2,12.5366,7.8223,6,6l1.8223,6.5366L2,16l5.8223,3.4629L6,26l6.5366-1.8223L16,30l3.4634-5.8223L26,26l-1.8223-6.5371L30,16l-5.8223-3.4634L26,6,19.4634,7.8223,16,2Z"
      />
      <rect
        id="_Transparent_Rectangle_"
        data-name="&lt;Transparent Rectangle&gt;"
        class="cls-1"
        width="32"
        height="32"
      />
    </svg>
  </div>
</div>

   <div class="weather-conditions"> 
        <div class="bold">HUMIDITY</div>
        <div class="bold">WIND SPEED</div>
        <div class="bold">UV INDEX</div>
    </div>
   <div class="weather-conditions-value">
    <div> ${humidity}%</div>
    <div> ${windSpeed}KPH</div>
    <div>${uvIndex}</div>
    </div>`;

  setBackground(condition);

}
function setBackground(condition) {
  condition = condition.toLowerCase();
  weatherInfo.className = "weather-info";
  let fillColor = "#ffffff";

  switch (true) {
    case condition.includes("sunny") || condition.includes("clear"):
      weatherInfo.classList.add("sunny");
      fillColor = "#ffffff";
      break;
    case condition.includes("cloud") || condition.includes("overcast"):
      weatherInfo.classList.add("cloudy");
      fillColor = "#000000";
      break;
    case condition.includes("rain") || condition.includes("drizzle"):
      weatherInfo.classList.add("rainy");
      fillColor = "#ffffff";
      break;
    case condition.includes('fog') || condition.includes("mist"):
      weatherInfo.classList.add("foggy");
      fillColor = "#000000";
      break;
    case condition.includes('thunder') || condition.includes("storm"):
      weatherInfo.classList.add("stormy");
      fillColor = "#ffffff";

      break;
    case condition.includes('snow'):
      weatherInfo.classList.add("snowy");
      break;
    default:
      weatherInfo.classList.add("default");
  }

  // Update all SVG paths at once
  const svgPaths = document.querySelectorAll('.icon svg path');
  svgPaths.forEach(path => {
    path.setAttribute("fill", fillColor);
  });
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

document.addEventListener("DOMContentLoaded", () => {
  const lastLocation = localStorage.getItem("lastLocation");
  fetchWeather(lastLocation || "manila");
})




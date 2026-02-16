function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "06636800dff2a7d18c1a6a99b7a79cb4";

    if (city === "") {
        document.getElementById("result").innerHTML =
            "<p>❗ Please enter a city name</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("result").innerHTML =
                    "<p>❌ City not found</p>";
            } else {
                const icon = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                document.getElementById("result").innerHTML = `
                    <h3>${data.name}</h3>
                    <img src="${iconUrl}" alt="Weather Icon">
                    <p>🌡️ Temperature: ${data.main.temp} °C</p>
                    <p>☁️ Condition: ${data.weather[0].description}</p>
                    <p>💧 Humidity: ${data.main.humidity}%</p>
                    <p>🌬️ Wind: ${data.wind.speed} m/s</p>
                `;
            }
        })
        .catch(error => {
            document.getElementById("result").innerHTML =
                "<p>⚠️ Error fetching weather data</p>";
        });
}

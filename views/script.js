document.addEventListener("DOMContentLoaded", function () {
  const buttons1 = document.querySelectorAll(".show-attractions");
  buttons1.forEach((button) => {
    button.addEventListener("click", function () {
      let eventId = this.getAttribute("data-event-id");
      const popup1 = document.querySelector(".attraction-popup");

      const wikiURL =
        "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" +
        eventId +
        "&limit=1";
      console.log(wikiURL);
      if (popup1.style.display === "block") {
        popup1.style.display = "none";
      } else {
        // console.log("Button works!!!");
        fetch(wikiURL)
          .then((response) => response.json())
          .then((data) => {
            popup1.innerHTML = data.pages[0].excerpt;
            popup1.style.display = "block";
            // console.log(data.pages[0].excerpt);
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  });
  const buttons = document.querySelectorAll(".check-weather");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const cityName = this.getAttribute("data-city");
      const date = this.getAttribute("data-date");
      const apiKey = "8b3431653d5c45359a1df01a69324677";
      const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${apiKey}&units=metric`;

      const popup = document.querySelector(".weather-popup");

      if (popup.style.display === "block") {
        popup.style.display = "none";
      } else {
        // console.log("Button works!!!");
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const weather = data.data[0];
            popup.innerHTML = `
                          <h3>Weather in ${cityName} on ${date}</h3>
                          <p>Temperature Range: ${weather.low_temp}°C - ${weather.high_temp}°C</p>
                          <p>Condition: ${weather.weather.description}</p>
                      `;
            // console.log(apiUrl);
            popup.style.display = "block";
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  });
});

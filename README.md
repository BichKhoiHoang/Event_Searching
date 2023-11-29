The application is a comprehensive event search platform that allows users to input keywords, yielding a list of matching events. What sets this application apart is its integration of Ticketmaster API for event data, encompassing names, dates, and locations. Additionally, it leverages Weatherbit API to provide weather details on the event date. It's worth noting that due to Weatherbit's 16-day forecast limit, events beyond this range won't yield weather data. Furthermore, the app employs Wikimedia API to retrieve details on event attractions or performers, enhancing the user experience with in-depth event information.




Resources
1.
Ticketmaster API
Description: The Ticketmaster API provides access to a wide range of event data including event names, dates, venues, and locations.
Endpoint URL:
https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API-KEY}&keyword=${keyword}
2.
Weatherbit API
Description: Weatherbit API offers weather forecast data, including current conditions, future weather, and historical weather data. It's used in this application to fetch temperature and weather descriptions for event dates.
Endpoint URL: https://api.weatherbit.io/v2.0/forecast/daily?city=${cityname}&key=${apiKey}&units=metric
3.
Wikimedia API
Description: Wikimedia API allows access to a wealth of information from Wikimedia projects, including Wikipedia. In this application, it's used to search for details about attractions or performers associated with events.
Endpoint URL:
https://en.wikipedia.org/w/rest.php/v1/search/page?q=${keyword}&limit=1

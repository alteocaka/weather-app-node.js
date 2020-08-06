const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6b267e6977eba4698841d86a5522784a&query=" + latitude + "," + longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Could not connect to weather API, check your connection!",
        undefined
      );
    } else if (response.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". The current temperature is " +
          response.body.current.temperature +
          " degrees celcius!"
      );
    }
  });
};

module.exports = forecast;

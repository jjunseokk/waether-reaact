import React from "react";

const WeatherBox = ({weather}) => {
    return (
        <div className="weatherBox">
            <div className="weatherIcon">
                <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} alt=""/>
            </div>
            <div className="weatherImpo">
                <h3>{weather?.name}</h3>
                <p>{weather?.main.temp}°C</p>
                <p>{weather?.main.temp_max}°C / {weather?.main.temp_min}°C</p>
                <p>{weather?.weather[0].description}</p>
                <p>{weather?.wind.speed}</p>
            </div>
        </div>
    );
};

export default WeatherBox;

import { Children, useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WheaterButton from "./componet/Button";
import WeatherBox from "./componet/WeatherBox";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재 위치 기반에 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨 상태 ㅈ정보
// 3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 도시 위치)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재 위치 기반에 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setcity] = useState("");
  const [loading, setLoding] = useState(false);
  const cities = ["seoul", "paris", "hanoi", "Usa"];
  const [apiError, setAPIError] = useState("");
  
  // 현재위치.
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLoaction(lat, lon);
      getLocation();
    });
  };

  // 현재 위치 데이터
  const getWeatherByCurrentLoaction = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1255e4aac90af2ff4a1905e43962ab4b&units=metric`;
      setLoding(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoding(false);
    } catch(err){
      setAPIError(err.message);
      setLoding(false);
    }

  };

  // 나라별 데이터
  const getweatherByCity = async () => {
    try{
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1255e4aac90af2ff4a1905e43962ab4b&units=metric`;
      setLoding(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoding(false);
    } catch(err) {
      setAPIError(err.message);
      setLoding(false);
    }
    console.log(apiError);
  };


  // 모바일 GPS
  const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            const now = new Date();
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        err: 0,
                        time: now.toLocaleTimeString(),
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    resolve({
                        err: -1,
                        latitude: -1,
                        longitude: -1,
                    });
                },
                { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
            );
        } else {
            reject({ error: -2, latitude: -1, longitude: -1 });
        }
    });
}


  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getweatherByCity();
    }
  }, [city]); //어레이의 아무것도 주지 않으면 componetDidMount()처럼 발동한다. 그래서 render를 하고나서 실행한다.

  const handleCity = (city) =>{
    if(city==="current"){
      getCurrentLocation();
    }else{
      setcity(city)
    }
  }


  return (
    <div>
      {loading? (<ClipLoader color="#f88c6b" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" /> )
      : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} />
          <WheaterButton cities={cities} setCity={setcity} handleCity={handleCity} selectedCity={city}/>
        </div>
      ) : (
        apiError
      )
      }
    </div>

  );
}

export default App;

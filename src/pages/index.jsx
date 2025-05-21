import { Search } from "lucide-react";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

const weatherApiKey = "899d9c2c0f5845838dc70138240912";

export default function Home() {
  const [cityName, setCityName] = useState("Ulaanbaatar");
  const [weatherData, setWeatherData] = useState({});
  const [countries, setCountries] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!cityName) return;

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${cityName}&days=3&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log("Weather:", data);
      });
  }, [cityName]);

  useEffect(() => {
    fetch(`https://countriesnow.space/api/v0.1/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data || []);
        const cities = data.data.flatMap((country) =>
          country.cities.map((city) => `${city}, ${country.country}`)
        );
        setCityList(cities);
      });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length > 1) {
      const filtered = cityList.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 10));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (cityString) => {
    const city = cityString.split(",")[0];
    setCityName(city);
    setSearchInput(cityString);
    setShowSuggestions(false);
  };

  return (
    <div className="flex bg-[#F3F4F6]">
      <div className="h-screen w-[50%] bg-[#F3F4F6] relative flex items-center justify-center">
        <div className="absolute bg-white w-[567px] px-6 py-4 rounded-[48px] flex flex-col gap-2 top-[46px] z-10 left-[190px]">
          <div className="flex items-center gap-4">
            <Search color="#6B7280" size="42px" />
            <input
              type="text"
              className="w-full text-2xl font-bold outline-0"
              placeholder="Search city..."
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
            />
          </div>
          {showSuggestions && filteredCities.length > 0 && (
            <ul className="mt-2 overflow-y-auto bg-white border rounded-lg shadow-lg max-h-64">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectCity(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="h-[340px] border-gray-300 border w-[340px] rounded-full absolute right-[-170px]"></div>
        <div className="h-[540px] border-gray-300 border w-[540px] rounded-full absolute right-[-270px]"></div>
        <div className="h-[940px] border-gray-300 border w-[940px] rounded-full absolute right-[-470px]"></div>
        <div className="h-[140px] w-[140px] bg-[#F3F4F6] absolute right-[-70px] rounded-full"></div>

        <img
          src="/images/blur-sun.svg"
          className="absolute right-[660px] top-[60px] z-0"
        />

        <Card
          background="white"
          image="/images/sun.png"
          temp={`${weatherData?.current?.temp_c}`}
          date={`${weatherData?.current?.last_updated}`}
          location={`${weatherData?.location?.name}`}
          state={`${weatherData?.current?.condition?.text}`}
          date_text="[#6B7280]"
          location_text="black"
          pin_color="black"
          state_color="#FF8E27"
        />
      </div>

      <div className="w-[50%] bg-[#0F141E] relative flex items-center justify-center bg-center bg-cover">
        <div className="h-[340px] border-gray-300 border w-[340px] rounded-full absolute left-[-170px]"></div>
        <div className="h-[540px] border-gray-300 border w-[540px] rounded-full absolute left-[-270px]"></div>
        <div className="h-[940px] border-gray-300 border w-[940px] rounded-full absolute left-[-470px]"></div>
        <div className="h-[140px] w-[140px] bg-[#F3F4F6] absolute left-[-70px] rounded-full"></div>

        <img
          src="/images/blur-moon.svg"
          className="absolute left-[660px] bottom-[60px]"
        />

        <Card
          background="[#111827]"
          image="/images/moon.png"
          temp={`${weatherData?.forecast?.forecastday?.[0]?.hour?.[23]?.temp_c}`}
          date={`${weatherData?.current?.last_updated}`}
          location={`${weatherData?.location?.name}`}
          state={`${weatherData?.current?.condition?.text}`}
          date_text="[#9CA3AF]"
          location_text="white"
          pin_color="white"
          state_color="#777CCE"
        />
      </div>
    </div>
  );
}

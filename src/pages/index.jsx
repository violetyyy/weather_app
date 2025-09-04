import { Search } from "lucide-react";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { MapPin, House, Heart, User } from "lucide-react";

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
      setFilteredCities(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (cityString) => {
    let city = "";
    for (let i = 0; i < cityString.length; i++) {
      const char = cityString[i];
      if (char === ",") break;
      city += char;
    }

    setCityName(city);
    setSearchInput(cityString);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.search-container')) {
      setShowSuggestions(false);
    }
  };

  // Add click outside listener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Left Side - Day Weather */}
      <div className="relative w-1/2 bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
        {/* Search Bar - Fixed at top */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 search-container">
          <div className="bg-white w-[480px] px-6 py-4 rounded-[32px] shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <Search color="#6B7280" size="24px" />
              <input
                type="text"
                className="w-full text-xl font-semibold outline-none placeholder-gray-400"
                placeholder="Search city..."
                value={searchInput}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
              />
            </div>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[24px] shadow-xl border border-gray-100 max-h-64 overflow-y-auto z-50">
              {filteredCities.map((city, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectCity(city)}
                >
                  <MapPin color="#6B7280" size="16px" />
                  <span className="font-medium text-gray-700">{city}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Background Circles */}
        <div className="absolute right-[-170px] h-[340px] w-[340px] border border-gray-300 rounded-full opacity-30"></div>
        <div className="absolute right-[-270px] h-[540px] w-[540px] border border-gray-300 rounded-full opacity-30"></div>
        <div className="absolute right-[-470px] h-[940px] w-[940px] border border-gray-300 rounded-full opacity-30"></div>
        <div className="absolute right-[-70px] h-[140px] w-[140px] bg-[#F3F4F6] rounded-full"></div>

        {/* Background Image */}
        <img
          src="/images/blur-sun.svg"
          className="absolute right-[660px] top-[60px] z-0 opacity-60"
          alt=""
        />

        {/* Day Weather Card */}
        <div className="relative z-10">
          <Card
            background="[#111827]"
            image="/images/sun.png"
            temp={`${weatherData?.current?.temp_c || '--'}°`}
            date={`${weatherData?.current?.last_updated || 'Loading...'}`}
            location={`${weatherData?.location?.name || 'Ulaanbaatar'}`}
            state={`${weatherData?.current?.condition?.text || 'Clear'}`}
            date_text="#FF8E27"
            location_text="#FF8E27"
            pin_color="#FF8E27"
            state_color="#FF8E27"
            style={{
              background: "linear-gradient(180deg, #111827 0%, #6B7280 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
        </div>
      </div>

      {/* Right Side - Night Weather */}
      <div className="relative w-1/2 bg-[#0F141E] flex items-center justify-center overflow-hidden">
        {/* Background Circles */}
        <div className="absolute left-[-170px] h-[340px] w-[340px] border border-gray-600 rounded-full opacity-30"></div>
        <div className="absolute left-[-270px] h-[540px] w-[540px] border border-gray-600 rounded-full opacity-30"></div>
        <div className="absolute left-[-470px] h-[940px] w-[940px] border border-gray-600 rounded-full opacity-30"></div>
        <div className="absolute left-[-70px] h-[140px] w-[140px] bg-[#F3F4F6] rounded-full flex justify-center items-center">
          <img src="/images/Vector.svg" className="h-[120px] z-20" alt="" />
        </div>

        {/* Background Image */}
        <img
          src="/images/blur-moon.svg"
          className="absolute left-[660px] bottom-[60px] opacity-60"
          alt=""
        />

        {/* Night Weather Card */}
        <div className="relative z-10">
          <Card
            background="[#111827]"
            image="/images/moon.png"
            temp={`${weatherData?.forecast?.forecastday?.[0]?.hour?.[23]?.temp_c || '--'}°`}
            date={`${weatherData?.current?.last_updated || 'Loading...'}`}
            location={`${weatherData?.location?.name || 'Ulaanbaatar'}`}
            state={`${weatherData?.forecast?.forecastday?.[0]?.hour?.[23]?.condition?.text || 'Clear'}`}
            date_text="#9CA3AF"
            location_text="#FFFFFF"
            pin_color="#FFFFFF"
            state_color="#777CCE"
            style={{
              background: "linear-gradient(0deg, #3398DB, #DDE6E8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
}

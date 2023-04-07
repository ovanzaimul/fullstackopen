import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!countryName) {
      return setCountries([]);
    }
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        setCountries(response.data);
      });
  }, [countryName]);

  const renderContent = () => {
    if (countries.length === 1) {
      const [country] = countries;
      return (
        <>
          <h4>{country?.name?.common}</h4>
          <div>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
          </div>

          <b>languages</b>
          <ul>
            {Object.values(country.languages).map((lang) => {
              return <li>{lang}</li>;
            })}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} />
        </>
      );
    }
    if (countries.length > 10)
      return <p>Too many matches, specify another filter</p>;
    if (countries.length <= 10) {
      return (
        <ul>
          {countries.map((country) => (
            <li>{country?.name?.common}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <div>
        find countries{" "}
        <input
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          type="text"
        />
      </div>
      {renderContent()}
    </div>
  );
}

export default App;

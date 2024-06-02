import { useEffect, useState } from "react";
import { Dropdown } from "./components";
import "./App.css";

function App() {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((rawData) => setCountries([...rawData]))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => response.json())
        .then((rawData) => {
          setSelectedState("");
          setSelectedCity("");
          setStates([...rawData]);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(
        ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => response.json())
        .then((rawData) => {
          setSelectedCity("");
          setCities([...rawData]);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedCountry, selectedState]);

  const onChangeHandler = (label, value) => {
    switch (label) {
      case "country":
        setSelectedCountry(value);
        break;

      case "state":
        setSelectedState(value);
        break;

      case "city":
        setSelectedCity(value);
        break;

      default:
        console.log("default");
    }
  };

  return (
    <>
      <div className="heading">
        <h1>Select Location</h1>
      </div>

      <div className="heading">
        <Dropdown
          placeholder="Select Country"
          type="country"
          options={countries}
          onChangeHandler={(e) => onChangeHandler("country", e.target.value)}
          width="20rem"
          disabled={false}
        />

        <Dropdown
          placeholder="Select State"
          type="state"
          options={states}
          onChangeHandler={(e) => onChangeHandler("state", e.target.value)}
          width="10rem"
          disabled={!selectedCountry}
        />

        <Dropdown
          placeholder="Select City"
          type="city"
          options={cities}
          onChangeHandler={(e) => onChangeHandler("city", e.target.value)}
          width="10rem"
          disabled={!selectedState}
        />
      </div>

      {selectedCity && (
        <div className="heading">
          <p>
            You selected{" "}
            <span>
              {selectedCity}, {selectedState}, {selectedCountry}
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default App;

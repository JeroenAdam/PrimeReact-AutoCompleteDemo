import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import ReactDOM from "react-dom";
import { CountryService } from "../service/CountryService";
import React, { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";

export const AutoCompleteDemo = () => {
  const [countryValue, setCountryValue] = useState(null);
  const [selectedCountryValue, setSelectedCountryValue] = useState(null);
  const [selectedCityValue, setSelectedCityValue] = useState(null);
  const [selectedAutoValueCity, setSelectedAutoValueCity] = useState(null);
  const [autoFilteredValue, setAutoFilteredValue] = useState([]);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const countryService = new CountryService();
    countryService.getCountries().then((data) => setCountryValue(data));
  }, []);

  const searchCountry = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...countryValue]);
      } else {
        setAutoFilteredValue(
          countryValue.filter((country) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          })
        );
      }
    }, 250);
  };

  const searchCity = (event) => {
    if (data1) {
      setSelectedAutoValueCity(
        data1.states.filter((country) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        })
      );
    } else {
      setSelectedAutoValueCity([]);
    }
  };

  const onCountryChange = (event) => {
    setData1(event);
    setSelectedCountryValue(event);
    setSelectedCityValue([]);
  };

  return (
    <div className="card">
      <h5>Country</h5>
      <AutoComplete
        dropdown
        value={selectedCountryValue}
        field="name"
        completeMethod={searchCountry}
        onChange={(e) => onCountryChange(e.value)}
        suggestions={autoFilteredValue}
        placeholder="Search Country"
      ></AutoComplete>

      <AutoComplete
        value={selectedCityValue}
        placeholder="Search City"
        dropdown
        completeMethod={searchCity}
        suggestions={selectedAutoValueCity}
        onChange={(e) => setSelectedCityValue(e.value)}
        field="name"
        style={{ marginLeft: 10, height: 40, width: 267 }}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<AutoCompleteDemo />, rootElement);

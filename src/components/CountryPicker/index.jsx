import React, {useReducer, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import {fetchCountries, countriesReducer} from '../../api';
import './CountryPicker.css';

const CountryPicker = ({handleCountryChange, selectedCountry}) => {
  const initialState = {
    countries: [],
  };

  const [state, dispatch] = useReducer(countriesReducer, initialState);

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchCountries(dispatch);
    };
    fetchAPI();
  }, []);

  const placeholder = selectedCountry ? selectedCountry : "Global"

  return (
    <FormControl className="formControl">
      <NativeSelect defaultValue="" onChange={e => handleCountryChange(e.target.value)}>
        <option value={placeholder}>{placeholder}</option>
        {state.countries.map((country) => (
          <option key={`${country.name}-${country.iso3}`} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;

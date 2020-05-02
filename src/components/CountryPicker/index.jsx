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

  return (
    <FormControl className="formControl">
      <NativeSelect value={selectedCountry} onChange={e => handleCountryChange(e.target.value)}>
        <option value="">GLOBAL</option>
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

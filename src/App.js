import React, {useState, useEffect, useReducer} from 'react';
import {Cards, Chart, CountryPicker} from './components';
import {fetchData, dataReducer} from './api';
import coronaImage from './image/image.png'
import './App.css';

const App = () => {
  const initialState = {
    data: {},
    loading: false,
    error: '',
  };

  const [country, setCountry] = useState('');

  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchData(dispatch, country);
    };
    fetchAPI();
  }, [country]);

  return (
    <div className="container">
      {state.loading || JSON.stringify(state.data) === '{}' ? (
        <p>Loading...</p>
      ) : (
        <>
          <img className="corona-img" src={coronaImage} alt="COVID-19" />
          <Cards data={state.data} />
          <CountryPicker
            handleCountryChange={setCountry}
            selectedCountry={country}
          />
          <Chart selectedCountry={country} selectedDailyData={state.data} />
        </>
      )}
    </div>
  );
};

export default App;

import React, {useEffect, useReducer} from 'react';
import {Cards, Chart, CountryPicker} from './components';
import {fetchData, dataReducer} from './api';
import './App.css';

const App = () => {
  const initialState = {
    data: {},
    loading: false,
    error: '',
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchAPI = async () => {
      await fetchData(dispatch);
    };
    fetchAPI();
  }, []);

  return (
    <div className="container">
      {state.loading || JSON.stringify(state.data) === '{}' ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards data={state.data} />
          <Chart />
          <CountryPicker />
        </>
      )}
    </div>
  );
};

export default App;

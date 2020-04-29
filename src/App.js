import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import {Cards, Chart, CountryPicker} from './components';
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  dataReducer,
} from './api';
import './App.css';

const url = 'https://covid19.mathdro.id/api';

const App = () => {
  const initialState = {
    data: {},
    loading: false,
    error: '',
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataRequest());
      try {
        const res = await axios.get(url);
        dispatch(fetchDataSuccess(res));
        return res;
      } catch (err) {
        dispatch(fetchDataFailure(err));
      }
    };
    fetchData();
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

import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import {Cards, Chart, CountryPicker} from './components';
import {fetchDataSuccess, fetchDataFailure, dataReducer} from './api';
import './App.css';

const url = 'https://covid19.mathdro.id/api';

const App = () => {
  const initialState = {
    data: {},
    error: '',
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
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

  console.log(state);
  return (
    <div className="container">
      <Cards data={state.data} />
      <Chart />
      <CountryPicker />
    </div>
  );
};

export default App;

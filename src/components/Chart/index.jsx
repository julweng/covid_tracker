import React, {useEffect, useReducer} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import {fetchDailyData, dailyDataReducer} from '../../api';
import './Chart.css';

const Charts = () => {
  const initialState = {
    data: [],
    loading: false,
    error: '',
  };

  const [state, dispatch] = useReducer(dailyDataReducer, initialState);

  useEffect(() => {
    const fetchDailyAPI = async () => {
      await fetchDailyData(dispatch);
    };
    fetchDailyAPI();
  }, []);

  const {data} = state;

  const chartData = {
    labels: data.map(({date}) => date),
    datasets: [
      {
        label: 'Infected',
        data: data.map(({confirmed}) => confirmed),
        borderColor: '#3333ff',
        fill: true,
      },
      {
        label: 'Deaths',
        data: data.map(({deaths}) => deaths),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        fill: true,
      },
    ],
  };
  const lineChart =
    !state.loading && data.length ? <Line data={chartData} /> : null;

  return <div className="container chart">{lineChart}</div>;
};

export default Charts;

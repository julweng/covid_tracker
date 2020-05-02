import React, {useEffect, useReducer} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import {fetchDailyData, dailyDataReducer} from '../../api';
import './Chart.css';

const Charts = ({
  selectedCountry,
  selectedDailyData: {confirmed, recovered, deaths},
}) => {
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

  const lineChartData = {
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
    !state.loading && data.length ? <Line data={lineChartData} /> : null;

  const barChartData = {
    data: {
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [
        {
          label: 'People',
          backgroundColor: [
            'rgba(0, 0, 255, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(255, 0, 0, 0.5)',
          ],
          data: [confirmed.value, recovered.value, deaths.value],
        },
      ],
    },
    options: {
      legend: {display: false},
      title: {display: true, text: `Current state in ${selectedCountry}`},
    },
  };

  const barChart = confirmed ? (
    <Bar data={barChartData.data} options={barChartData.options} />
  ) : null;

  return (
    <div className="container chart">
      {selectedCountry ? barChart : lineChart}
    </div>
  );
};

export default Charts;

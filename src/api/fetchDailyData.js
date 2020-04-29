import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/daily';

// action
const fetchDailyDataRequest = () => ({
  type: 'FETCH__DAILY_DATA_REQUEST',
});

const fetchDailyDataSuccess = (res) => {
  return {
    type: 'FETCH_DAILY_DATA_SUCCESS',
    data: res.data.map(({ confirmed, deaths, reportDate }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date: reportDate
    }))
  };
};

const fetchDailyDataFailure = (err) => ({
  type: 'FETCH_DAILY_DATA_FAILURE',
  error: err.message,
});

const fetchDailyData = async (dispatch) => {
  dispatch(fetchDailyDataRequest());
  try {
    const res = await axios.get(url);
    dispatch(fetchDailyDataSuccess(res));
    return res;
  } catch (err) {
    dispatch(fetchDailyDataFailure(err));
  }
};

// reducer
const dailyDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH__DAILY_DATA_REQUEST':
      return {
        data: [],
        loading: true,
        error: '',
      };
    case 'FETCH_DAILY_DATA_SUCCESS':
      return {
        data: action.data,
        loading: false,
        error: '',
      };
    case 'FETCH_DAILY_DATA_FAILURE':
      return {
        data: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export {fetchDailyData, dailyDataReducer};

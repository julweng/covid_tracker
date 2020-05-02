import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// action
const fetchDataRequest = () => ({
  type: 'FETCH_DATA_REQUEST',
});

const fetchDataSuccess = res => {
  const {confirmed, recovered, deaths, lastUpdate} = res.data;
  return {
    type: 'FETCH_DATA_SUCCESS',
    data: {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    },
  };
};

const fetchDataFailure = err => ({
  type: 'FETCH_DATA_FAILURE',
  error: err.message,
});

const fetchData = async (dispatch, country) => {
  let changeableUrl = url;

  if(country) {
    changeableUrl = `${url}/countries/${country}`
  }

  dispatch(fetchDataRequest());
  try {
    const res = await axios.get(changeableUrl);
    dispatch(fetchDataSuccess(res));
    return res;
  } catch (err) {
    dispatch(fetchDataFailure(err));
  }
}

// reducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        data: {},
        loading: true,
        error: '',
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        data: action.data,
        loading: false,
        error: '',
      };
    case 'FETCH_DATA_FAILURE':
      return {
        data: {},
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export {fetchData, dataReducer};

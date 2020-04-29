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

export {fetchDataRequest, fetchDataSuccess, fetchDataFailure, dataReducer};

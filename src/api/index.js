
// action
const fetchDataSuccess = res => ({
    type: 'FETCH_DATA_SUCCESS',
    data: res
  });

const fetchDataFailure = err => ({
  type: 'FETCH_DATA_FAILURE',
  error: err.message,
});

// reducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return {
        data: action.data,
        error: '',
      };
    case 'FETCH_DATA_FAILURE':
      return {
        data: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export {fetchDataSuccess, fetchDataFailure, dataReducer};

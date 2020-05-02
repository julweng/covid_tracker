import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries';

// action
const fetchCountriesRequest = () => ({
  type: 'FETCH_COUNTRIES_REQUEST',
});

const fetchCountriesSuccess = (res) => {
  return {
    type: 'FETCH_COUNTRIES_SUCCESS',
    data: res.data.countries.map(({name, iso3}) => ({
      name,
      iso3,
    })),
  };
};

const fetchCountriesFailure = (err) => ({
  type: 'FETCH_COUNTRIES_FAILURE',
  error: err.message,
});

const fetchCountries = async (dispatch) => {
  dispatch(fetchCountriesRequest());
  try {
    const res = await axios.get(url);
    dispatch(fetchCountriesSuccess(res));
    return res;
  } catch (err) {
    dispatch(fetchCountriesFailure(err));
  }
};

// reducer
const countriesReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_COUNTRIES_REQUEST':
      return {
        countries: [],
        loading: true,
        error: '',
      };
    case 'FETCH_COUNTRIES_SUCCESS':
      return {
        countries: action.data,
        loading: false,
        error: '',
      };
    case 'FETCH_COUNTRIES_FAILURE':
      return {
        countries: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export {fetchCountries, countriesReducer};

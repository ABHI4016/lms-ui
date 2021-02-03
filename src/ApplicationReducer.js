const initialState = {
  counter: 1,
  currentPage: '/',
  reservations: undefined,
  loadingReservations: true,
  reservations: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'SAVE_USER_RESERVATIONS':
      return {
        ...state,
        reservations: action.data,
        loadingReservations: false,
      };
    case 'SET_USER_DATA':
      return {
        ...state,
        user: action.data,
      };
    case 'CLEAR_USER_DATA':
      return {
        ...state,
        user: undefined,
      };
  }

  return state;
};

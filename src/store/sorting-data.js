const GET_DATA = 'GET_DATA';

const gotData = (data) => ({ type: GET_DATA, data });

export const getData = () => {
  return (dispatch) => {
    try {
      let array = [];
      let size = Math.floor(Math.random() * 101) + 4;

      for (let i = 0; i < size; ++i) {
        let randomNum = Math.floor(Math.random() * 1000) + 10;
        array[i] = {
          name: '' + randomNum,
          value: randomNum,
        };
      }
      dispatch(gotData(array));
    } catch (error) {
      console.error(error);
    }
  };
};
const initstate = [];
const dataReducer = (state = initstate, action) => {
  switch (action.type) {
    case GET_DATA:
      return action.data;
    default:
      return state;
  }
};

export default dataReducer;

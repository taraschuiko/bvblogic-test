import { LOAD_QUESTIONS } from "./actionTypes";

const API_URL = new URL("https://api.stackexchange.com/2.2/questions");
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const initialState = {
  questions: [],
  page: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS: {
      let url = API_URL;
      let params = {
        pagesize: 20,
        page: state.page + 1
      };
      url.search = new URLSearchParams(params);
      fetch(`${url}`, {
        method: "GET",
        headers: HEADERS
      })
        .then(r => r.json())
        .then(json => ({
          questions: [...state.questions, ...json.items],
          page: state.page + 1
        }));
    }
    default: {
      return state;
    }
  }
};

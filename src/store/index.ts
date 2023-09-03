import configureStore from "./configureStore";
import User from "./user";

export interface ApplicationState {
  user: User.UserState;
}

export const rootReducer = {
  user: User.reducer,
};

const store = configureStore();

export default store;

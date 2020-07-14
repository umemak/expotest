import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import { getActiveRouteName } from './navigation/AppNavigator';
import reducers from './reducers';

const logger = () => next => (action) => {
  if (__DEV__) {
    if (action.type.indexOf('Navigation') === -1) {
      console.log(action);
    }
  }
  next(action);
};

const screenTracking = store => next => (action) => {
  if (action.type.indexOf('Navigation') === -1 || action.type === 'TAKEMODAL_CLOSE') {
    return next(action);
  }

  const currentScreen = getActiveRouteName(store.getState().nav);
  const result = next(action);

  const nextScreen = getActiveRouteName(store.getState().nav);

  store.dispatch({
    type: 'SCREEN_SET',
    payload: {
      current: currentScreen,
      next: nextScreen,
    },
  });

  return result;
};

const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(
    createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
    ),
    logger,
    screenTracking,
  ),
);

export default store;

import AppNavigator from '../navigation/AppNavigator';

const initialState = null;

export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};

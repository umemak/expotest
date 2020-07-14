import { createStackNavigator, NavigationActions } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import UserScreen from '../screens/UserScreen';
import TagScreen from '../screens/TagScreen';
import PostScreen from '../screens/PostScreen';
import TakeScreen from '../screens/TakeScreen';
import TakePublishScreen from '../screens/TakePublishScreen';

import IconButton from '../components/IconButton';

const TakeStack = createStackNavigator(
  {
    Take: { screen: TakeScreen },
    TakePublish: { screen: TakePublishScreen },
  },
  {
    headerMode: 'screen',
  },
);

const CardNavigator = createStackNavigator(
  {
    Main: { screen: MainTabNavigator, navigationOptions: { header: null } },
    User: { screen: UserScreen },
    Tag: { screen: TagScreen },
    Post: { screen: PostScreen },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        color: '#333',
      },
      headerLeft: IconButton,
    }),
  },
);

const AppNavigator = createStackNavigator(
  {
    MainStack: {
      screen: CardNavigator,
      navigationOptions: {
        header: null,
      },
    },
    TakeModal: {
      screen: TakeStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: () => ({
      headerTitleStyle: {
        color: '#333',
      },
    }),
  },
);

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;

  if (state && type === NavigationActions.NAVIGATE) {
    if (routeName === state.routes[state.routes.length - 1].routeName) {
      return null;
    }
  }

  return getStateForAction(action, state);
};

export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
};

AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

export default AppNavigator;

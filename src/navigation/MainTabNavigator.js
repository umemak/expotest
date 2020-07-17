import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import UserScreen from '../screens/UserScreen';
import {
  HomeTabIcon,
  SearchTabIcon,
  TakeTabIcon,
  NotificationTabIcon,
  MeTabIcon,
  TabBar,
} from '../components/Tab';

const createTabStack = (title, screen) => createStackNavigator({
  [title]: { screen },
});

export default createBottomTabNavigator(
  {
    HomeTab: {
      screen: createTabStack('HomeTab', HomeScreen),
      navigationOptions: () => ({
        tabBarIcon: HomeTabIcon,
      }),
    },
    SearchTab: {
      screen: createTabStack('SearchTab', SearchScreen),
      navigationOptions: () => ({
        tabBarIcon: SearchTabIcon,
      }),
    },
    TakeTab: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: TakeTabIcon,
        tabBarOnPress: () => {
          navigation.push('TakeModal');
        },
      }),
    },
    NotificationTab: {
      screen: createTabStack('NotificationTab', NotificationScreen),
      navigationOptions: () => ({
        tabBarIcon: NotificationTabIcon,
      }),
    },
    MeTab: {
      screen: createTabStack('MeTab', UserScreen),
      navigationOptions: () => ({
        tabBarIcon: MeTabIcon,
      }),
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#333',
      inactiveTintColor: '#bbb',
      style: {
        // backgroundColor: Constants.manifest.extra.backgroundColor,
        backgroundColor: '#fafafa',
      },
    },
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);

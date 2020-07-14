import React from 'react';
// import { View, Text } from 'react-native';
import {
  AppLoading,
  Asset,
  Font,
} from 'expo';
/* from app */
const fonts = require('./src/fonts.js');
const images = require('./src/images');
const MainTabNavigator = require('./src/navigation/MainTabNavigator');

export default class App extends React.Component {
  static defaultProps = {
    skipLoadingScreen: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
    };
  }

  loadResourcesAsync = async () => {
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));
    await Font.loadAsync(fonts);

    return true;
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }
    return (
      <MainTabNavigator />
    )
  }
}

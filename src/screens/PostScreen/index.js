import React from 'react';
import {
  View,
  ScrollView,
  Share
} from 'react-native';
import { WebBrowser } from 'expo';

import Item from '../../components/Item';
import Text from '../../components/Text';
import styles from './styles';
import { WebBrowserResultType } from 'expo-web-browser';

export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('title', '読み込み中'),
  })

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      fetching: false,
    };
  }

  onUserPress = (item) => {
    const { navigation } = this.props;

    navigation.push('User', { uid: item.uid });
  }

  onMorePress = (item) => {
    Share.share({
      message: item.fileUri,
    });
  }

  onLikePress = async (item) => {
    //
  }

  onLinkPress = (url, txt) => {
    const { navigation } = this.props;

    switch (txt[0]) {
      case '#':
        navigation.push('Tag', { tag: txt });
        break;
      default:
        WebBrowser.openBrowserAsync(url);
        break;
    }
  }

  render() {
    const { error, fetching } = this.state;

    if (fetching) {
      return (
        <View style={[styles.container, styles.empty]}>
          <Text font="noto-sans-bold" style={styles.emptyText}>読み込み中</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={[styles.container, styles.empty]}>
          <Text font="noto-sans-bold" style={styles.emptyText}>投稿はありません</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.container}>
        <Item
          text="投稿です"
          fileUri="https://dummyimage.com/400x400/000/fff.jpg&text=Post1"
          user={{
            uid: 1,
            img: 'https://dummyimage.com/40x40/fff/000.jpg&text=User1',
            name: 'User1',
          }}
          onUserPress={this.onUserPress}
          onMorePress={this.onMorePress}
          onLikePress={this.onLikePress}
          onLinkPress={this.onLinkPress}
        />
      </ScrollView>
    );
  }
}

import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Share,
  ActivityIndicator
} from 'react-native';

import FlatList from '../../components/FlatList';
import Item from '../../components/Item';
import Text from '../../components/Text';
import styles from './styles';
import { WebBrowserResultType } from 'expo-web-browser';

export default class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: 'フィード',
  })

  constructor(props) {
    super(props);

    this.state = {
      posts: [
        {
          text: '1つ目の投稿です。#tag1',
          fileUri: 'https://dummyimage.com/400x400/000/fff.jpg&text=Post1',
          user: {
            uid: 1,
            img: 'https://dummyimage.com/40x40/fff/000.jpg&text=User1',
            name: 'User1',
          },
        },
      ],
      fetching: false,
      loading: false,
    };
  }

  onUserPress = (item) => {
    //
  }

  onMorePress = (item) => {
    //
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
    const {
      posts,
      fetching,
      loading,
    } = this.state;

    if (posts.length === 0) {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={[styles.container, styles.empty]}
        >
          <Text font="noto-sans-bold" style={styles.emptyText}>投稿はありません</Text>
        </ScrollView>
      );
    }
    return (
      <View style={styles.container} testID="Home">
        <FlatList
          data={posts}
          keyExtracrtor={item => item.key}
          renderItem={({ item, index, viewableItemIndices }) => (
            <Item
              {...item}
              visible={viewableItemIndices.indexOf(index) > -1}
              onUserPress={this.onUserPress}
              onMorePress={this.onMorePress}
              onLikePress={this.onLikePress}
              onLinkPress={this.onLinkPress}
            />
          )}
          ListFooterComponent={() => (loading ? <View style={styles.loading}><ActivityIndicator size="small" /></View> : null)}
        />
      </View>
    );
  }
}

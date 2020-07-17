import React from 'react';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Video, Permissions, ImagePicker } from 'expo';

import { Image } from 'react-native-expo-image-cache';

import Avatar from '../../components/Avatar';
import FlatList from '../../components/FlatList';
import Text from '../../components/Text';
import styles from './styles';

@connect(state => ({
  me: state.me,
}))
export default class UserScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('title', '読み込み中'),
  })

  constructor(props) {
    super(props);

    const me = {
      uid: 1,
      img: 'https://dummyimage.com/40x40/fff/000.jpg&text=User1',
      name: 'User1',
    }
    const { navigation } = this.props;
    const uid = navigation.getParam('uid', me.uid);

    this.state = {
      self: (me.uid === uid),
      user: {
        uid: 1,
        img: 'https://dummyimage.com/40x40/fff/000.jpg&text=User1',
        name: 'User1',
      },
      posts: [],
      cursor: null,
      fetching: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const { self } = this.state;
    const me = {
      uid: 1,
      img: 'https://dummyimage.com/40x40/fff/000.jpg&text=User1',
      name: 'User1',
    }
    const { navigation } = this.props;

    if (self) {
      await this.setState({ user: me });
      navigation.setParams({ title: '自分' });
    } else {
      const user = {
        uid: null,
        name: "username",
        img: null
      }
      await this.setState({ user });
      navigation.setParams({ title: user.name });
    }
  }

  componentDidUpdate(prevProps) {
    const { self } = this.state;
    const { me } = this.props;
    if (prevProps.me !== me && self) {
      this.setState({ user: me });
    }
  }

  onUserPress = async () => {
    //
  }

  onThumbnailPress = (item) => {
    const { navigation } = this.props;
    navigation.push('Post', { pid: item.pid });
  }

  render() {
    const {
      self,
      user,
      posts,
      fetching,
      loading,
    } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.thumbnails}
          numColumns={3}
          data={posts}
          keyExtractor={item => item.key}
          ListHeaderComponent={() => (
            <View style={style.header}>
              {!self && <Avatar uri={user.img} size={60} style={styles.avatar} />}
              {self && (
                <TouchableOpacity onPress={this.onUserPress}>
                  <Avatar uri={user.img} size={60} style={styles.avatar} />
                </TouchableOpacity>
              )}
              <Text font="noto-sans-medium" style={styles.name}>{user.name}</Text>
            </View>
          )}
          renderItem={({ item, index, viewableItemIndices }) => {
            if (viewableItemIndices.indexOf(index) === -1) {
              return <View style={styles.file} />;
            }
            return (
              <TouchableOpacity onPress={() => this.onThumbnailPress(item)}>
                {item.type === 'photo' && <Image uri={item.thumbnail} style={styles.file} />}
                {item.type === 'movie' && (
                  <Video
                    source={{ uri: item.thumbnail }}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.file}
                  />
                )}
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={() => (loading ? <View style={styles.loading}><ActivityIndicator size="small" /></View> : null)}
        />
      </View>
    );
  }
}

import { StyleSheet, Dimensions } from 'react-native';
import { Constats } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constats.manifest.extra.backgroundColor,
  },
  header: {
    alignItems: 'center',
    padding: 12,
  },
  thumbnails: {
    flex: 1,
  },
  file: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    marginRight: 1,
    marginBottom: 1,
    backgroundColor: '#efefef',
  },
});

export default styles;

import { StyleSheet, Platform } from 'react-native';
import { borderRadius, opacity } from 'styled-system';

export default StyleSheet.create({
  chatBoxContainer: {
    marginTop: '4%',
    flexDirection: 'row',
    zIndex: 3,
  },
  userimage: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    borderRadius: 50,
  },
  chatcomment: {
    color: '#fff',
    width: '80%',
  },
  userImageContainer: {
    flex: 0.9,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  chatCommentContainer: {
    flex: 3,
  },
  chatCommentWidth: {
    backgroundColor: 'rgba(28, 28, 28, 0.2)',
    width: '85%',
    borderRadius: 10,
    padding: 3,
    paddingLeft: 2,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

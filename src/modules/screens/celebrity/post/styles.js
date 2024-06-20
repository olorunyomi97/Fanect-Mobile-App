import { StyleSheet, Platform } from 'react-native';
import { color } from 'styled-system';
import colors from '../../../../helpers/colors';

export default StyleSheet.create({
  body: {
    backgroundColor: colors.fanectBg,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  blackColor: {
    color: 'red',
  },
  StatusBarColor: {
    backgroundColor: colors.bg_black,
  },
  flashlightbtn: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  uploadingText: {
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  centralView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flexdir: {
    flexDirection: 'row',
  },
  bglightCancelOpacity: {
    backgroundColor: colors.bg_grey_opacity,
    padding: 10,
    borderRadius: 10,
  },
  cancelbtn: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  topControl: {
    flexDirection: 'row',
    marginTop: '20%',
    width: '90%',
    marginLeft: '5%',
    marginLeft: '5%',
  },
  bglightOpacity: {
    backgroundColor: colors.bg_grey_opacity,
    padding: 5,
    marginLeft: 10,
    borderRadius: 10,
  },
  switchToVideoButton: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  paddingx: {
    padding: 20,
  },
  selectFromGallery: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  flexDirex: {
    flexDirection: 'row',
  },
  flexDirexRx: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },

  captureButton: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  capturex: {
    alignItems: 'center',
  },
  capturebuttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(28, 28, 28,0.5)',
  },
  topcontrolLeft: {
    flex: 3,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topcontrolLeftAddText: {
    flex: 2,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topcontrolRightAddText: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  topcontrolCenter: {
    flex: 3,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  greenie: {
    color: '#1FCC79',
    marginBottom: 10,
  },
  topcontrolRight: {
    flex: 3,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    flexDirection: 'column',

    backgroundColor: 'black',
  },
  preview: {
    marginTop: '4%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

  //Button Group
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31,204,121,0.1)',
    width: '80%',
    marginTop: '2.5%',
    marginBottom: '2.5%',
    padding: 0,
    borderRadius: 30,
    marginLeft: '10%',
    marginRight: '10%',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  btn: {
    flex: 1,
    borderRightWidth: 0.25,
    borderLeftWidth: 0.25,
    margin: 5,
    borderRadius: 20,
    borderColor: 'transparent',
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: 4,
    fontSize: 14,
    color: colors.fancetGreen,
  },
  postButton: {
    backgroundColor: colors.fancetGreen,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 10,
    height: 50,
    elevation: 10,
  },
  posttext: {
    textAlign: 'center',
    paddingVertical: 8,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btn_success: {
    backgroundColor: colors.green,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 50,
  },
  btn_success_disabled: {
    backgroundColor: colors.green_disabled,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 50,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundVideo: {
    borderColor: 'red',
    borderWidth: 2,
    height: 500,
  },
});

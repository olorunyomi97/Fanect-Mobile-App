import { StyleSheet, Platform } from 'react-native';
import colors from '../../helpers/colors';

export default StyleSheet.create({
  body: {
    backgroundColor: colors.bg_black,
    flex: 1,
  },
  container: {
    marginHorizontal: '4%',
  },
  safe_area_margin: {
    marginTop: 30,
  },
  auth_header: {
    marginTop: 50,
    marginBottom: 30,
    width: 35,
    height: 55,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  auth_header_text: {
    color: colors.text_white,
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 10,
  },

  auth_header_text_2: {
    color: colors.text_white,
    fontWeight: '500',
    fontSize: 22,
    marginBottom: 10,
  },

  auth_header_p: {
    color: colors.text_grey,
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 40,
    textAlign: 'center',
  },

  //profiles
  profile_image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  //buttons
  // btn_success: {
  //     backgroundColor: colors.green,
  //     borderRadius: 15,
  //     padding: 15,
  //     marginBottom: 35,
  //     marginTop: 50,
  // },

  btn_success_disabled: {
    backgroundColor: colors.green_disabled,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 50,
  },

  btn_success_outline: {
    backgroundColor: colors.bg_black,
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 50,
  },

  btn_danger: {
    backgroundColor: colors.btn_red,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 50,
  },

  btn_grey: {
    backgroundColor: colors.btn_grey,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 50,
  },

  btn_success: {
    backgroundColor: colors.green,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 50,
  },

  btn_success_2: {
    backgroundColor: colors.green,
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    marginTop: 0,
  },

  // form elements
  form_control: {
    borderWidth: 1,
    color: colors.text_grey,
    borderColor: colors.bg_grey,
    backgroundColor: colors.border_black,
    borderRadius: 15,
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    height: 55,
    marginTop: 5,
  },

  select_form_control: {
    paddingTop: 4,
    paddingBottom: 4,
    width: '100%',
    borderWidth: 1.2,
    borderColor: colors.border_black,
    borderRadius: 15,
    fontSize: 16,
    color: colors.white,
    // borderColor: colors.bg_grey,
    backgroundColor: colors.border_black,
    marginTop: 5,
  },

  form_label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 28,
    marginBottom: 12,
  },

  logo: {
    height: 20,
    width: 24,
  },

  //texts
  btn_text: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },

  text_12: {
    fontSize: 14,
    fontWeight: '500',
    justifyContent: 'center',
    color: colors.white,
  },
  text_14: {
    fontSize: 14,
    fontWeight: '500',
    // fontFamily: 'Sofia Pro',
    color: colors.white,
  },
  text_16: {
    fontSize: 16,
    fontWeight: '500',
    // fontFamily: 'Sofia Pro',
    color: colors.white,
  },
  text_16_grey: {
    fontSize: 16,
    fontWeight: '500',
    // fontFamily: 'Sofia Pro',
    color: colors.text_grey,
  },
  text_18: {
    fontSize: 18,
    fontWeight: '500',
    // fontFamily: 'Sofia Pro',
    color: colors.white,
  },
  text_22: {
    fontSize: 22,
    fontWeight: '500',
    // fontFamily: 'Sofia Pro',
    color: colors.white,
  },

  text_green: {
    fontSize: 16,
    fontWeight: '500',
    // fontFamily: 'Sofia Pro',
    color: colors.green,
  },
  error_text: {
    marginTop: 5,
    fontSize: 12,
    color: colors.nb_red,
    fontWeight: '500',
  },

  //   modals
  modalContent: {
    backgroundColor: colors.grey,
    paddingVertical: 48,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#fff',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#fff',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#A4A4A4',
    fontSize: 12,
    marginLeft: 15,
  },
  streamAnalyticsContainer: {
    backgroundColor: 'rgba(30,30,30,0.7)',
    marginTop: '5%',
    borderRadius: 20,
  },

  /**** Analytics Page UI */
  BarchartContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    height: 280,
    paddingTop: 40,

    width: '95%',
    marginLeft: '2.5%',
    marginTop: '5%',
  },
  SubscriberContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    height: 70,
    paddingTop: 10,
    paddingLeft: 15,
    width: '95%',
    marginLeft: '2.5%',
    marginTop: '15%',
  },
  SubscriberContainerText: {
    color: '#fff',
    fontSize: 17,
    // fontWeight:'bold'
  },
  SubscriberContainerTextContent: {
    color: '#fff',
    fontSize: 16,
    marginLeft: '3%',
    marginTop: '5%',
    marginBottom: -20
  },
  SubscriberContainerTextGreen: {
    color: '#00C805',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: '2%',
  },
  BarChartTop: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  BarChartTopText: {
    color: '#fff',
    fontSize: 20,
  },
  BarChartTopLeft: {
    flex: 3,
    marginLeft: 20,
    marginTop: 10
  },
  BarChartTopRight: {
    flex: 3,
    alignItems: 'flex-end',
    // marginLeft: 20
  },
  Contents: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  ContentsItemBg: {
    height: 160,
    width: '50%',
    flex: 3,
    resizeMode: 'contain',
  },

  list_2: {
    marginBottom: 600
    //paddingHorizontal: 5,
    //backgroundColor:"#E6E6E6",
  },
  listContainer: {
    alignItems: 'center',
    padding: 5,
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '48%',
    borderRadius: 50,
    height: 120,
    margin: '10%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: '#FFFFFF',
  },
  icon: {
    height: 20,
    width: 20,
  },
});

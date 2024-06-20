import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

const baseWidth = 375;
const baseHeight = 811;

export const wp = dimension => {
  return wp2dp((dimension / baseWidth) * 100 + '%');
};

export const hp = dimension => {
  return hp2dp((dimension / baseHeight) * 100 + '%');
};

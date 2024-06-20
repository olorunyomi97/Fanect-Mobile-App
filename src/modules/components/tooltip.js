import React from 'react';
import { View, Text } from 'react-native';
import { Tooltip as RNETooltip } from 'react-native-elements';

//style
import colors from '../../helpers/colors';

const Tooltip = props => {
  return (
    <RNETooltip
      ref={props.ref}
      backgroundColor={colors.border_black}
      containerStyle={{ padding: 9 }}
      height={74}
      width={170}
      overlayColor="rgba(0,0,0,0)"
      withPointer={false}
      // closeOnlyOnBackdropPress={true}
      popover={<>{props.tooltip_elements}</>}
    >
      {props.trigger}
    </RNETooltip>
  );
};

export default Tooltip;

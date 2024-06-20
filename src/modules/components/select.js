import React from 'react';
import { Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { FormControl, Select, CheckIcon } from 'native-base';

//style
import styles from '../../assets/styles/styles';
import colors from '../../helpers/colors';

const Input = props => {
  return (
    <>
      <Controller
        control={props.control}
        rules={{
          required: props.required ? true : false,
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={props.errors[props.name] ? true : false}>
            <Select
              //   selectedValue={language}
              //   minWidth={200}
              accessibilityLabel="Select Location"
              placeholder={props.placeholder}
              {...styles.select_form_control}
              onValueChange={itemValue => onChange(itemValue)}
              _actionSheetContent={{
                backgroundColor: colors.bg_grey,
                borderRadius: 30,
              }}
              _item={{
                _text: {
                  color: colors.white,
                },
              }}
              _selectedItem={{
                bg: colors.green,
                _text: {
                  color: colors.white,
                  fontWeight: 'bold',
                },
                endIcon: <CheckIcon size={4} color={colors.text_grey} />,
              }}
            >
              {props.options.map(type => {
                return (
                  <Select.Item
                    label={`${type}`}
                    value={`${type}`}
                    key={`${type}`}
                  />
                );
              })}
            </Select>
          </FormControl>
        )}
        name={props.name}
        defaultValue=""
      />
      {props.errors[props.name] && (
        <Text style={styles.error_text}>{props.error_name} is required.</Text>
      )}
    </>
  );
};

export default Input;

import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, TextArea as TextInput } from 'native-base';

//style
import styles from '../../assets/styles/styles';
import colors from '../../helpers/colors';

const TextArea = props => {
  console.log();
  return (
    <>
      <Controller
        control={props.control}
        rules={{
          required: props.required ? true : false,
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={props.errors[props.name] ? true : false}>
            {/* <TextInput
              {...styles.form_control}
              type={props.type ? props.type : 'text'}
              _focus={colors.bg_grey}
              placeholder={props.placeholder}
              onChangeText={val => onChange(val)}
              value={value}
              InputLeftElement={props.leftElement ? props.leftElement : <> </>}
              InputRightElement={
                props.rightElement ? props.rightElement : <> </>
              }
            /> */}
            <TextInput
              aria-label="t1"
              {...styles.form_control}
              h={144}
              _focus={{ borderColor: colors.bg_grey }}
              value={value}
              numberOfLines={6}
              placeholder={props.placeholder}
              onChangeText={val => onChange(val)}
              // InputLeftElement={props.leftElement ? props.leftElement : <> </>}
              // InputRightElement={
              //   props.rightElement ? props.rightElement : <> </>
              // }
            />
          </FormControl>
        )}
        name={props.name}
        defaultValue={props.default_value ? props.default_value : ''}
      />
      {props.errors[props.name] && (
        <Text style={styles.error_text}>{props.error_name} is required.</Text>
      )}
    </>
  );
};

export default TextArea;

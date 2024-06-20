import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView,Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'; //Redux
import { getTerms, apiError } from '../../../store/Terms/actions';

//styles
import styles from '../../../assets/styles/styles';
import style from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

//redux
import { loginUser } from '../../../store/actions';
import { show_toast_notifications } from '../../../helpers/notifications';

const Terms =  props => {
  const { terms, navigation } = props;
  const [page_loading, set_page_loading] = useState(false);

  useEffect(() => {
    props.getTerms();
    set_page_loading(false);
  }, [getTerms]);


  return (

    <SafeAreaView style={styles.body}>
    <View style={[style.body]}>
        <View
          style={[style.container, { marginTop: "20%", marginBottom: "10%" }]}
        >
          <Text style={styles.auth_header_text}>Terms of Service</Text>
        </View>
        <View
          style={{
            backgroundColor: colors.ash_dark_opacity,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "flex-end",
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[style.container]}
          >
          
            <View>
              <Text
                style={[
                  style.auth_header_text_2,
                  {
                    color: colors.white,
                    marginTop: "10%",
                    marginBottom: "5%",
                  },
                ]}
              >
                Terms & Conditions
              </Text>
              <Text
                  style={[
                    style.text_12,
                    { 
                      // justifyContent: 'center',
                      textAlign: 'justify',
                      color: colors.white, 
                      marginBottom: "5%"
                    },
                  ]}
                >
                Vestibulum eu quam nec neque pellentesque efficitur id eget
                nisl. Proin porta est convallis lacus blandit pretium sed non
                enim. Maecenas lacinia non orci at aliquam. Donec finibus, urna
                bibendum ultricies laoreet, augue eros luctus sapien, ut euismod
                leo tortor ac enim. In hac habitasse platea dictumst. Sed cursus
                venenatis tellus, non lobortis diam volutpat sit amet. Sed
                tellus augue, hendrerit eu rutrum in, porttitor at metus. Mauris
                ac hendrerit metus. Phasellus mattis lectus commodo felis
                egestas, id accumsan justo ultrices. Phasellus aliquet, sem a
                placerat dapibus, enim purus dictum lacus, nec ultrices ante dui
                ac ante. Phasellus placerat, urna. Vestibulum eu quam nec neque pellentesque efficitur id eget
                nisl. Proin porta est convallis lacus blandit pretium sed non
                enim. Maecenas lacinia non orci at aliquam. Donec finibus, urna
                bibendum ultricies laoreet, augue eros luctus sapien, ut euismod
                leo tortor ac enim. In hac habitasse platea dictumst. Sed cursus
                venenatis tellus, non lobortis diam volutpat sit amet. Sed
                tellus augue, hendrerit eu rutrum in, porttitor at metus. Mauris
                ac hendrerit metus. Phasellus mattis lectus commodo felis
                egestas, id accumsan justo ultrices. Phasellus aliquet, sem a
                placerat dapibus, enim purus dictum lacus, nec ultrices ante dui
                ac ante. Phasellus placerat, urna
              </Text>
            </View>
            <Button
              block
              title="Close"
              buttonStyle={[style.btn_success]}
              titleStyle={style.btn_text}
              onPress={() => {
                navigation.navigate('Auth', { screen: 'Register' });
              }}
            />
          </ScrollView>
        </View>
      </View>
      </SafeAreaView>
  );
};

// export default Terms;

const mapStateToProps = state => {
  const { error, terms } = state.Login;
  return { error, terms };
};

export default connect(mapStateToProps, { getTerms,  apiError })(Terms);

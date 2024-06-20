import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux'; //Redux
import { Pressable, ScrollView } from 'native-base';
import styles from '../../../../assets/styles/styles';
import colors from '../../../../helpers/colors';
import { Input } from 'native-base';
import SecondaryHeader from '../../../partials/header/secondaryHeader';
import {
  getCelebrities,
  searchCelebrities,
} from '../../../../store/celebrities/actions';
import PageLoading from '../../../partials/loading/pageLoading';

const DiscoverCard = props => {
  const { celebrity } = props;
  return (
    <Pressable
      style={{ flex: 0.5 }}
      onPress={() => {
        props.navigation.navigate('CelebrityProfile', {
          celebrity_id: celebrity._id,
          new_click: true,
        });
        // props.navigation.navigate(
        //   'DiscoverStack',
        //   {
        //       screen: 'CelebrityProfile',
        //       params: { celebrity, new_click: true },
        //   },
        // );
      }}
    >
      <View
        style={{
          paddingVertical: 12,
          backgroundColor: colors.border_black,
          borderRadius: 16,
          marginHorizontal: 7,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: celebrity.avatar }}
            style={{
              width: 92,
              height: 92,
              borderRadius: 50,
            }}
          />
          {/* <Text
            style={[
              styles.text_16,
              { fontWeight: '600', marginTop: 15, marginBottom: 7 },
            ]}
          >
            {celebrity.username}
          </Text> */}
          <Text
            style={[
              styles.text_16,
              { fontWeight: '600', marginTop: 15, marginBottom: 7 },
            ]}
          >
            {celebrity.fullname}
          </Text>
          <Text style={[styles.text_14, { color: colors.ash }]}>
            {`${celebrity.subscriptions.length} Subscribers`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const Discover = props => {
  const { celebrities, error, loading } = props;
  const [curr_celebrities, set_curr_celebrities] = useState(celebrities);

  const searchForCelebs = param => {
    props.searchCelebrities(param);
  };
  // const updateFlatList = () => { this.setState({ refresh: !refresh}) }

  useEffect(() => {
    props.getCelebrities();
    if (celebrities.length > 0) {
      set_curr_celebrities(celebrities);
    }
  }, []);

  // useEffect(() => {
  //   if(celebrities) {
  //     set_curr_celebrities(celebrities);
  //   }
  // })

  const onRefresh = () => {
    props.getCelebrities();
    if (celebrities.length > 0) {
      set_curr_celebrities(celebrities);
    }
  };

  return (
    <View style={styles.body}>
      <SecondaryHeader
        component={
          <>
            <Input
              {...styles.form_control}
              type={props.type ? props.type : 'text'}
              _focus={colors.bg_grey}
              placeholder={'Search for celebrity by name'}
              onChangeText={val => searchForCelebs(val)}
              InputRightElement={
                <Image
                  source={require('../../../../assets/icons/Search.png')}
                  style={[
                    { marginLeft: 15, height: 17, width: 17, marginRight: 10 },
                  ]}
                />
              }
            />
          </>
        }
        title="Discover"
      />
      {loading == true ? (
        <PageLoading type={'9CubeGrid'} />
      ) : (
        <View style={[styles.container, { marginTop: 15 }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} /> //@to-do change this refreshing to the top loading icon
            }
          >
            <FlatList
              style={{ width: '100%', marginBottom: 250 }}
              showsVerticalScrollIndicator={false}
              data={celebrities}
              extraData={curr_celebrities}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item }) => {
                return (
                  <DiscoverCard
                    celebrity={item}
                    navigation={props.navigation}
                  />
                );
              }}
              numColumns={2}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  const { error, loading, celebrities } = state.Celebrities;
  return { error, loading, celebrities };
};

export default connect(mapStateToProps, { getCelebrities, searchCelebrities })(
  Discover,
);

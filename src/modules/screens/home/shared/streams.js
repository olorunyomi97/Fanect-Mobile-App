import React, { useEffect } from 'react';
import { ScrollView } from 'native-base';
import { View, Text, SafeAreaView, Image } from 'react-native';
import colors from '../../../../helpers/colors';
import { getStories } from '../../../../store/stories/actions';
import { connect, useDispatch } from 'react-redux';
import Stories from 'react-native-stories-media';

const Streams = ({ storiesDataValue, userDatas, loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
    // console.log("\n *****************************************STORIESSTORIES#########<<stories>>"+JSON.stringify(stories)+" \n\n\n")
  }, [1]);

  return (
    <ScrollView horizontal={true}>
      <View>
        <Stories data={storiesDataValue} userDatas={userDatas} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const { loading, stories } = state.Stories;
  return { loading, stories };
};

export default connect(mapStateToProps)(Streams);

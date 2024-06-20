import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Pressable } from 'native-base';
import { CommonActions } from '@react-navigation/native';
//styles
import styles from '../../../../assets/styles/styles';

//partials
import Header from '../../../partials/header/index';
import { useSelector } from 'react-redux';

import { BarChart } from 'react-native-chart-kit';

const AnalyticsPage = props => {
  const { user_data } = useSelector(state => state.Login);

  const [ContentData, SetContentData] = useState([
    {
      id: 1,
      title: 'You',
      color: '#FF4500',
      members: 8,
      image: require('../../../../assets/images/rectangle10.png'),
    },
    {
      id: 2,
      title: 'Home',
      color: '#87CEEB',
      members: 6,
      image: require('../../../../assets/images/rectangle20.png'),
    },
    {
      id: 3,
      title: 'Home',
      color: '#87CEEB',
      members: 6,
      image: require('../../../../assets/images/rectangle30.png'),
    },
    {
      id: 4,
      title: 'Home',
      color: '#87CEEB',
      members: 6,
      image: require('../../../../assets/images/rectangle40.png'),
    },
  ]);

  const [StreamData, SetStreamData] = useState([
    {
      id: 1,
      title: 'You',
      color: '#FF4500',
      members: 8,
      image: require('../../../../assets/images/Rectangle204.png'),
    },
    {
      id: 2,
      title: 'Home',
      color: '#87CEEB',
      members: 6,
      image: require('../../../../assets/images/Rectangle2040.png'),
    },
    {
      id: 3,
      title: 'Home',
      color: '#87CEEB',
      members: 6,
      image: require('../../../../assets/images/Rectangle2041.png'),
    },
    {
      id: 4,
      title: 'Home',
      color: '#87CEEB',
      members: 6,
      image: require('../../../../assets/images/Rectangle2042.png'),
    }
  ]);
  const user = user_data;
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',],
    datasets: [
      {
        data: [2, 1.5, 4, 5, 1.3, 3.5, 1.9, 2.1],
      },
    ],
  };

  const chartConfigOld = {
    backgroundGradientFrom: '#1C1C1C',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#1C1C1C',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(77, 255, 223, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const chartConfig = {
    backgroundGradientFrom: '#1C1C1C',
    backgroundGradientTo: '#1C1C1C',
    barPercentage: 0.45,
    height: 5000,
    fillShadowGradient: `#4DFFDF`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, ${opacity})`,
    labelColor: (opacity = 1) => `#fff`,

    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: 'rgba(255,255,255,0.5)',
      strokeDasharray: '5',
    },
    propsForLabels: {},
  };


  return (
    <View style={styles.body}>
      <Header title={'Analytics'} icon="cancel" navigation={props.navigation} />

      <View
        style={[styles.containerx, styles.AnalyticsPageContainerx]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.BarchartContainer}>
          <View style={styles.BarChartTop}>
            <View style={styles.BarChartTopLeft}>
              <Text style={styles.BarChartTopText}>Filter</Text>
            </View>

            <View style={styles.BarChartTopRight}></View>
          </View>

          <BarChart
            style={{ marginTop: 10 }}
            data={data}
            width={370}
            height={250}
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            showBarTops={true}
          />
        </View>

        <View style={styles.SubscriberContainer}>
          <Text style={styles.SubscriberContainerText}>
            Subscriber Growth this week
          </Text>
          <Text style={styles.SubscriberContainerTextGreen}>
            +7.8 % (213 new subscriber)
          </Text>
        </View>

        <ScrollView>
        <Text style={styles.SubscriberContainerTextContent}>Content</Text>
        <View style={styles.Contents}>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={ContentData}
            horizontal={false}
            numColumns={2}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <ImageBackground
                  imageStyle={{ borderRadius: 15 }}
                  source={item.image}
                  style={[styles.card, { marginTop: '5%' }]}
                  onPress={() => {}}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image
                      style={styles.icon}
                      source={{
                        uri: 'https://img.icons8.com/ios/40/000000/settings.png',
                      }}
                    />
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.subTitle}>{item.members} members</Text>
                  </View>
                </ImageBackground>
              );
            }}
          />
        </View>

        <Text style={styles.SubscriberContainerTextContent}>Streams</Text>
        <ScrollView>
        <View style={styles.Contents}>
          <FlatList
            style={styles.list_2}
            contentContainerStyle={styles.listContainer}
            data={StreamData}
            horizontal={false}
            numColumns={2}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <ImageBackground
                  imageStyle={{ borderRadius: 15 }}
                  source={item.image}
                  style={[styles.card, { marginTop: '5%' }]}
                  onPress={() => {}}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image
                      style={styles.icon}
                      source={{
                        uri: 'https://img.icons8.com/ios/40/000000/settings.png',
                      }}
                    />
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.subTitle}>{item.members} members</Text>
                  </View>
                </ImageBackground>
              );
            }}
          />
        </View>
        </ScrollView>

        </ScrollView>
      </View>
    </View>
  );
};

export default AnalyticsPage;

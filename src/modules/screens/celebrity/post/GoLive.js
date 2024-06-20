import React, { useEffect, useRef, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//import styles from './styles';
import { RNCamera } from 'react-native-camera';
import { style } from 'styled-system';
import { Button } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux'; //Redux
import ButtonToggleGroup from 'react-native-button-toggle-group';
import { NodeCameraView, NodePlayerView } from 'react-native-nodemediaclient';
import { LiveStreamTopControl } from './LiveStreamTopControl';
import { MeetingProvider, useMeeting } from '@videosdk.live/react-sdk';
import MeetingContainer from './golivecomponents/MeetingContainer';
import styles from '../../../../assets/styles/styles';
//import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import AgoraUIKit from 'agora-rn-uikit';

import { ChatBox } from './golivecomponents/chatBox';

export const GoLive = ({
  isPublish,
  setIsPublish,
  publishBtnTitle,
  setpublishBtnTitle,
  vb,
  setCameraView,
  navigation,
  cameraView,
  setCameraViewFlashlight,
  cameraViewFlashlight,
  handleStreamStart,
  handleStreamEnd,
  latestLiveStreamURL,
  setStartStreamBoolean,
  startStreamBoolean,
  setIsOnLiveStream,
  isOnLiveStream,
}) => {
  const [token, setToken] = useState(null);
  const liveStreamRef = useRef();
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [chatMessage, setChatMessage] = useState([]);
  const [checkingConnection, setCheckingConnection] = useState(false);
  const sessionRef = useRef(null);

  const subscriberProperties = {
    subscribeToAudio: false,
    subscribeToVideo: true,
  };

  const subscriberEventHandlers = {
    error: error => {
      console.log(`There was an error with the subscriber: ${error}`);
    },
  };

  useEffect(() => {
    requestCameraAndAudioPermission();
  }, []);

  const requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        // alert('You can use the cameras & mic')
      } else {
        //console.log('Camera & Mic Permission denied')
      }
    } catch (err) {
      //console.warn(err)
    }
  };

  const rtcProps = {
    appId: '47bc36b988eb44a69a36c671863beaf6',
    channel: 'test',
    enableVideo: true,
    mode: 1, //live stream
    role: 1, //broadcaster
    enableAudio: true,
    callActive: true,
    activeSpeaker: true,
  };

  const callbacks = {
    EndCall: () => {
      setStartStreamBoolean(false);
      setShowStartBtn(true);
      setCheckingConnection(false);
      handleStreamEnd();
      setShowLoader(false);
    },
  };

  const styleProps = {
    UIKitContainer: {
      //borderWidth:1,
      //borderColor:'red',
      height: '100%',
      width: '100%',
    },
    localBtnContainer: {
      display: 'none',
    },
  };

  const publisherEventHandlers = {
    streamCreated: event => {
      setShowLoader(false);
      console.log('Publisher stream created!', event);
      setShowStartBtn(false);
      setCheckingConnection(false);
      setShowLoader(false);
      setShowComments(true);
      // setStartStreamBoolean(true);
      //setIsPublish(true);
      //setpublishBtnTitle("End Stream");
      setIsOnLiveStream(true);
    },

    streamDestroyed: event => {
      console.log('Publisher stream destroyed!', event);
      setShowStartBtn(true);
      setCheckingConnection(false);
      setShowComments(false);
      setIsOnLiveStream(false);

      //setStartStreamBoolean(false);
      // setpublishBtnTitle("Start Stream 2");
      //setIsPublish(false);
    },
  };

  /*const sessionEventHandlers  = {
      signal: msg => {
       console.log("<====sessionEventHandlers  ::PUBLISHER:::: signal: msg===> "+JSON.stringify(msg))
     }
   }; */

  const sessionEventHandlers = {
    signal: event => {
      if (event.data) {
        //clean data
        // let splitx = event.data.split("-|-");
        //   console.log("===sessionEventHandlers=="+event.data)

        /*setChatMessage(...chatMessage,{
                username:splitx[2],
                message:splitx[0],
                avatar: splitx[1] 
           }); */

        setChatMessage(JSON.parse(event.data));

        //console.log(":::sessionEventHandlers chatMessage :::"+JSON.stringify(event.data))
      }
    },
  };

  const publisherProperties = {
    publishAudio: false,
    publishVideo: true,
    resolution: '352x288',
    cameraPosition: cameraView,
    name: 'Publisher',
  };

  return (
    <View style={{ flex: 1 }}>
      {/*Loader widget */}
      {showLoader ? (
        <View
          style={{
            position: 'absolute',
            top: '40%',
            height: 200,
            width: '100%',
            zIndex: 2,
            justifyContent: 'center',
          }}
        >
          <View>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>
              Adapting Stream to your network.. {'\n'}Please wait
            </Text>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      ) : (
        <></>
      )}

      {/*end Loader widget*/}

      <View
        style={{
          position: 'absolute',
          top: '65%',
          height: 100,

          width: '100%',
          zIndex: 2,
          justifyContent: 'center',
        }}
      >
        {showComments ? (
          <View style={{ width: '100%' }}>
            {/* 
          
                       chatMessage.username !==undefined?
                         <ChatBox avatar={{uri:chatMessage.avatar}} 
                         message={chatMessage.username+": "+chatMessage.message}
                         /> 
                         :
                         <></>
                       */}

            {chatMessage &&
              chatMessage.map((item, index) => {
                return (
                  <ChatBox
                    avatar={{ uri: item.avatar }}
                    message={item.username + ': ' + item.message}
                  />
                );
              })}
          </View>
        ) : (
          <></>
        )}
      </View>

      <LiveStreamTopControl
        setCameraView={setCameraView}
        navigation={navigation}
        cameraView={cameraView}
        setCameraViewFlashlight={setCameraViewFlashlight}
        cameraViewFlashlight={cameraViewFlashlight}
      />

      <View
        style={{
          flex: 0.95,
          flexDirection: 'column',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        {/* 

          <OTSession 
                    apiKey={"46711382"} 
                    sessionId={"2_MX40NjcxMTM4Mn5-MTYzNzA3MzA4OTU0Mn5waHF3dytnMHlHQ2tNUS8vZVZOWGpmMHV-fg"} 
                    token={"T1==cGFydG5lcl9pZD00NjcxMTM4MiZzaWc9NzMxMDFhYmFkNTAyNzZkZDJlZjllNGNjNGExMWM5YTlkYTRhOGRjZDpzZXNzaW9uX2lkPTJfTVg0ME5qY3hNVE00TW41LU1UWXpOekEzTXpBNE9UVTBNbjV3YUhGM2R5dG5NSGxIUTJ0TlVTOHZaVlpPV0dwbU1IVi1mZyZjcmVhdGVfdGltZT0xNjM3MDczMTMzJm5vbmNlPTAuNjI1ODAwMTg4OTc5MDQ0OCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjM5NjY1MTMyJmNvbm5lY3Rpb25fZGF0YT1QdWJsaXNoZXImaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0="}
                    eventHandlers={sessionEventHandlers}
                    ref={sessionRef}>
                    <OTPublisher
                    properties={publisherProperties}
                    mute={false}
                    eventHandlers={publisherEventHandlers}
                    style={{ width: "100%",   height: "150%" }} />
          </OTSession> 

 */}

        {startStreamBoolean ? (
          <View>
            <AgoraUIKit
              rtcProps={rtcProps}
              callbacks={callbacks}
              styleProps={styleProps}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                justifyContent: 'center',
                color: '#fff',
                fontSize: 18,
                alignContent: 'center',
              }}
            >
              Click Start Stream to Go Live
            </Text>
            {/* <ActivityIndicator color="white" /> */}
          </View>
        )}
      </View>

      {showStartBtn ? (
        <Button
          block
          title={'Start Stream'}
          buttonStyle={[
            styles.btn_success,
            { marginTop: 20, width: '80%', alignSelf: 'center' },
          ]}
          titleStyle={styles.btn_text}
          onPress={() => {
            setStartStreamBoolean(true);
            setShowStartBtn(false);
            setCheckingConnection(true);
            //  setShowLoader(true)
            handleStreamStart();
          }}
          loading={false}
          disabledStyle={[
            styles.btn_success_disabled,
            ,
            { marginTop: 20, opacity: 0.8 },
          ]}
        />
      ) : (
        <Button
          block
          title={'End Stream'}
          buttonStyle={[
            styles.btn_danger,
            { marginTop: 20, width: '80%', alignSelf: 'center' },
          ]}
          titleStyle={styles.btn_text}
          onPress={() => {
            setStartStreamBoolean(false);
            setShowStartBtn(true);
            setCheckingConnection(false);
            handleStreamEnd();
            setShowLoader(false);
          }}
          loading={false}
          disabledStyle={[
            styles.btn_success_disabled,
            ,
            { marginTop: 20, opacity: 0.8 },
          ]}
        />
      )}
    </View>
  );
};

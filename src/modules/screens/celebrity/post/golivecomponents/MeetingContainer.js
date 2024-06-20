import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {
  useMeeting,
  ReactNativeForegroundService,
} from '@videosdk.live/react-native-sdk';
import ParticipantView from './ParticipantView';
import ModalViewer from './ModalViewer';
import ExternalVideo from './ExternalVideo';
export default function MeetingContainer({ setToken }) {
  function onParticipantJoined(participant) {
    setParticipant(participant);

    console.log(' onParticipantJoined', participant);
  }
  function onParticipantLeft(participant) {
    console.log(' onParticipantLeft', participant);
  }
  const onSpeakerChanged = activeSpeakerId => {
    console.log(' onSpeakerChanged', activeSpeakerId);
  };
  function onPresenterChanged(presenterId) {
    console.log(' onPresenterChanged', presenterId);
  }
  function onMainParticipantChanged(participant) {
    console.log(' onMainParticipantChanged', participant);
  }
  function onEntryRequested(participantId, name) {
    console.log(' onEntryRequested', participantId, name);
  }
  function onEntryResponded(participantId, name) {
    console.log(' onEntryResponded', participantId, name);
  }
  function onRecordingStarted() {
    console.log(' onRecordingStarted');
  }
  function onRecordingStopped() {
    console.log(' onRecordingStopped');
  }
  function onChatMessage(data) {
    console.log(' onChatMessage', data);
  }
  function onMeetingJoined() {
    console.log('onMeetingJoined');
  }
  function onMeetingLeft() {
    console.log('onMeetingLeft');
  }
  const onLiveStreamstarted = data => {
    console.log('onLiveStreamstarted example', data);
  };
  const onLiveStreamStopped = data => {
    console.log('onLiveStreamStopped example', data);
  };
  const onVideoStarted = data => {
    console.log('onVideoStarted example', data);
  };
  const onVideoStopped = data => {
    console.log('onVideoStopped example', data);
  };

  const {
    participants,
    isRecording,
    join,
    leave,
    startRecording,
    stopRecording,
    toggleMic,
    toggleWebcam,
    changeWebcam,
    enableWebcam,
    toggleScreenShare,
    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
    externalVideo,
  } = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMainParticipantChanged,
    onEntryRequested,
    onEntryResponded,
    onRecordingStarted,
    onRecordingStopped,
    onChatMessage,
    onMeetingJoined,
    onMeetingLeft,
    onLiveStreamstarted,
    onLiveStreamStopped,
    onVideoStarted,
    onVideoStopped,
  });

  const [visibleModal, setvisibleModal] = useState(false);
  const [visibleControls, setvisibleControls] = useState(true);

  const layout = useWindowDimensions();
  const mMeetingRef = useRef();

  const mMeeting = useMeeting({});

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
      ReactNativeForegroundService.stop();
      leave();
    };
  }, []);

  const handlestartVideo = () => {
    startVideo({
      link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    });
  };

  const handlestopVideo = () => {
    stopVideo();
  };

  const handleresumeVideo = () => {
    resumeVideo();
  };

  const handlepauseVideo = () => {
    pauseVideo({ currentTime: 5 });
  };
  const handlesseekVideo = () => {
    seekVideo({ currentTime: 10 });
  };

  const handleStartLiveStream = () => {
    startLivestream([
      {
        url: 'rtmp://a.rtmp.youtube.com/live2',
        streamKey: 'key',
      },
    ]);
  };

  const handleStopLiveStream = () => {
    stopLivestream();
  };
  const handleStartRecording = () => {
    startRecording();
  };
  const handleStopRecording = () => {
    stopRecording();
  };

  const participantsArrId = [...participants.keys()];

  const Button = ({ onPress, buttonText, backgroundColor }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          marginVertical: 4,
          marginHorizontal: 4,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: 'white', fontSize: 12 }}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6FF' }}>
      <View style={{ flex: 1, paddingHorizontal: 0 }}>
        <ExternalVideo />

        {participantsArrId.length > 0 ? (
          <FlatList
            data={participantsArrId}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setvisibleControls(!visibleControls);
                  }}
                  style={{
                    height: layout.height / 2,
                    marginVertical: 3,
                  }}
                >
                  <ParticipantView participantId={item} />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff' }}>
              Press Start Stream to Go Live
            </Text>
          </View>
        )}
      </View>
      {visibleControls ? (
        <View
          style={{
            flexDirection: 'row',
            padding: 6,
            flexWrap: 'wrap',
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            backgroundColor: 'rgba(0,0,0, 0.8)',
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Button
            onPress={() => {
              mMeeting?.join();
              // setTimeout(() => {
              //mMeeting?.enableWebcam();
              // changeWebcam();
              //}, 500);
            }}
            buttonText={'JOIN'}
            backgroundColor={'#1178F8'}
          />
          <Button
            onPress={() => {
              leave();
              setToken('');
            }}
            buttonText={'LEAVE'}
            backgroundColor={'red'}
          />
          <Button
            onPress={() => {
              setvisibleModal(true);
            }}
            buttonText={'CHAT'}
            backgroundColor={'#1178F8'}
          />

          <Button
            onPress={toggleMic}
            buttonText={'TOGGLE MIC'}
            backgroundColor={'#1178F8'}
          />
          <Button
            onPress={toggleWebcam}
            buttonText={'TOGGLE WEBCAM'}
            backgroundColor={'#1178F8'}
          />

          <Button
            onPress={() => {
              changeWebcam();
            }}
            buttonText={'SWITCH CAMERA'}
            backgroundColor={'#1178F8'}
          />
          <Button
            onPress={() => {
              setvisibleModal(true);
            }}
            buttonText={'CHAT'}
            backgroundColor={'#1178F8'}
          />

          {/*
          <Button
            onPress={handleStartLiveStream}
            buttonText={"START STREAM"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handleStopLiveStream}
            buttonText={"STOP STREAM"}
            backgroundColor={"#1178F8"}
          /> 
         
            <Button
            onPress={handleStartLiveStream}
            buttonText={"START STREAM"}
            backgroundColor={"#1178F8"}
          />
          <Button
            onPress={handleStopLiveStream}
            buttonText={"STOP STREAM"}
            backgroundColor={"#1178F8"}
          />*/}
          <ModalViewer
            visibleModal={visibleModal}
            setvisibleModal={setvisibleModal}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

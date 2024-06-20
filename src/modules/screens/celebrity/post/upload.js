import React, { useRef, useState, useEffect } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  Dimensions,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { RNCamera } from 'react-native-camera';
import { style } from 'styled-system';
//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

import ButtonToggleGroup from 'react-native-button-toggle-group';
const WINDOW = Dimensions.get('window');
import RNFS from 'react-native-fs';
import { useForm } from 'react-hook-form';
import { DragTextEditor } from 'react-native-drag-text-editor';
import { captureScreen } from 'react-native-view-shot';
import DocumentPicker from 'react-native-document-picker';
import { useSelector, useDispatch, connect } from 'react-redux';

import Input from '../../../components/input';
import * as Progress from 'react-native-progress';
import CreateContent from '../../content/CreateContent';
import { Button } from 'react-native-elements';
import colors from '../../../../helpers/colors';
import { readData, saveData } from '../../../../helpers/async_storage_helper';

//redux
import { postStoryAction } from '../../../../store/story/actions';
import { show_toast_notifications } from '../../../../helpers/notifications';
import { VideoTopControl } from './VideoTopControl';
import { GoLive } from './GoLive';
import { CaptureButtonControl } from './CaptureButtonControl';
import { AddTextControl } from './AddTextControl';
import { ColorFontsWidget } from './ColorFontsWidget';
import {
  getStartStreamSuccess,
  startLiveStreamAction,
  endLiveStreamAction,
} from '../../../../store/livestream/actions';

const CelebrityPostStory = props => {
  const { error, loading, navigation, streams } = props;
  const camera = useRef(null);
  const viewShot = useRef(null);
  const refRBSheet = useRef();
  const refRBSheetFontSize = useRef();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selection, setSelection] = useState(2);
  const [cameraView, setCameraView] = useState('front');
  const [cameraViewFlashlight, setCameraViewFlashlight] = useState(
    RNCamera.Constants.FlashMode.off,
  );

  const [isPublish, setIsPublish] = useState(false);
  const [publishBtnTitle, setpublishBtnTitle] = useState('Start Stream');
  const vb = useRef();

  const [hasTakenShot, setHasTakenShot] = useState(false);
  const [hasTakenVideo, setHasTakenVideo] = useState(false);

  const [imageURI, setImageURI] = useState(false);
  const [storyUploadData, setStoryUploadData] = useState(false);
  const [latestLiveStreamURL, setLatestLiveStreamUrl] = useState('');
  const [latestLiveStreamID, setLatestLiveStreamID] = useState('');
  const [AddTextOption, setAddTextOption] = useState(false);
  const [showTextOption, setshowTextOption] = useState(false);
  const [recordVideo, setRecordVideo] = useState(false);
  const [widgetTextColor, setWidgetTextColor] = useState('#007DFF');
  const [widgetTextSize, setWidgetTextSize] = useState(30);
  const [toggle_loading, setToggleLoading] = useState(false);
  const [startStreamBoolean, setStartStreamBoolean] = useState(false);
  const [isOnLiveStream, setIsOnLiveStream] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [showAndPlayVideo, setShowAndPlayVideo] = useState(false);
  const [recordedVideoURL, setRecordedVideoURL] = useState('');

  const videoPlayerRef = useRef();

  /*
    useEffect(() => {
        viewShot.current.capture().then(uri => {
            console.log("do something with ", uri);
          });
      },[viewShot]);
    */

  useEffect(() => {
    if (error) {
      show_toast_notifications(error, 'error');
    }
  }, [error]);

  const handleStreamStart = async data => {
    //set to null
    await saveData('user_live_stream_details', null);
    Promise.resolve(props.startLiveStreamAction()).finally(() => {
      setpublishBtnTitle('Stop Stream');
      setIsPublish(true);
      updateLiveStreamURL();
    });
  };

  const handleStreamEnd = data => {
    //alert(latestLiveStreamURL);

    Promise.resolve(props.endLiveStreamAction(latestLiveStreamURL)).finally(
      () => {
        setpublishBtnTitle('Start Stream');
        setIsPublish(false);

        /*
      navigation.navigate('StreamAnalytics', 
      { screen: 'StreamAnalytics' 
      }); */

        //redirect to end stream UI
        // vb.current.stop();
      },
    );
  };

  const updateLiveStreamURL = async () => {
    const user_live_stream_details = await readData('user_live_stream_details');

    if (user_live_stream_details == null) {
      updateLiveStreamURL(); //rerun
    } else {
      //alert("<<<<<user_live_stream_details>>>>"+JSON.stringify(user_live_stream_details));

      //console.log("UUU******=====###user_live_stream_details "+user_live_stream_details.data.upstreamUrl);
      setLatestLiveStreamUrl(
        user_live_stream_details.data.fanect_livestream_id,
      );
      // vb.current.start();
    }
  };

  const onSubmitPost = data => {
    setToggleLoading(true);
    props.postStoryAction(storyUploadData, navigation);
  };

  const submitStory = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => {
        console.log('Image saved to', uri);
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const takePicture = async () => {
    try {
      const options = { quality: 1, base64: true };
      const data = await camera.current.takePictureAsync(options);
      console.log(data.uri, '<<<<<<<<<<<<<<<<<<<<<');
      setHasTakenShot(true);
      setImageURI(data.uri);
      setStoryUploadData(data);
    } catch (error) {
      console.log(error, 'ERROR <<<<<<<<<<<<<');
    }
  };

  const selectColorPicker = async () => {
    refRBSheet.current.open();
  };
  const startRecord = async () => {
    setIsRecordingVideo(true);
    const options = { maxDuration: 30 }; //max of 30 seconds
    const data = await camera.current.recordAsync(options);
    console.log('video URI : ' + data.uri);
    let cachefilepath = data.uri;
    setRecordedVideoURL(cachefilepath);
    setStoryUploadData(data);
    //uploadToCloudinary(cachefilepath)//refactor request later...
    setHasTakenVideo(true);
    /* if(await RNFS.exists(cachefilepath)){
          //then copy the video file to Document Directory using RNFS

         //copyFile(filepath: string, destPath: string): Promise<void>

         RNFS.copyFile(cachefilepath, RNFS.DocumentDirectoryPath).then({
         })

       } */
  };
  const stopRecord = async () => {
    console.log('stop record');
    setIsRecordingVideo(false);
    setShowAndPlayVideo(true);
    let endVideo = await camera.current.stopRecording();
    console.log('end video', endVideo);
    //setRecord(false)
  };

  //Refactor uploadToCloudinary to Redux later....
  const uploadToCloudinary = datax => {
    // let base64Img = `data:image/jpg;base64,${datax}`
    //Add your cloud name

    let apiUrl = 'https://api.cloudinary.com/v1_1/dplbnnu1r/image/upload';
    let data = {
      file: datax,
      upload_preset: 'ijeride',
    };
    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async r => {
        let data = await r.json();
        console.log('Success' + JSON.stringify(data));
      })
      .catch(err => {
        console.log('Error == ' + err);
      });
  };

  const pickImageOrVideo = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      setHasTakenShot(true);
      setImageURI(res.uri);
      setStoryUploadData(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const onBuffer = () => {};

  const videoError = err => {
    //alert(err);
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar animated={true} backgroundColor="#000" />
      {!hasTakenShot ? (
        <View style={styles.body}>
          {selection == 2 ? (
            <VideoTopControl
              setCameraView={setCameraView}
              navigation={navigation}
              cameraView={cameraView}
              setCameraViewFlashlight={setCameraViewFlashlight}
              cameraViewFlashlight={cameraViewFlashlight}
            />
          ) : (
            <></>
          )}

          {selection == 2 ? (
            <View style={{ flex: 1 }}>
              {showAndPlayVideo ? (
                <View>
                  {/* endWithThumbnail
                 thumbnail={{ uri: this.state.thumbnailUrl }}
                */}

                  {/*  <Video 
                    source={{uri:recordedVideoURL}}   // Can be a URL or a local file.
                    ref={videoPlayerRef}                                      // Store reference
                    onBuffer={onBuffer}                // Callback when remote video is buffering
                    onError={videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} 
                    autoplay={true} 
                    onLoadStart={() => {
                      console.log('onLoadStart', new Date());
                    }}
                    onLoad={() => {
                      console.log('onLoad', new Date());
                    }}
                    />  */}

                  <VideoPlayer
                    video={{ uri: recordedVideoURL }}
                    videoWidth={500}
                    videoHeight={700}
                    ref={videoPlayerRef}
                  />
                </View>
              ) : (
                <RNCamera
                  ref={camera}
                  useNativeZoom={true}
                  captureAudio={recordVideo}
                  style={styles.preview}
                  flashMode={cameraViewFlashlight}
                  type={cameraView}
                  playSoundOnRecord={true}
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                  androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                />
              )}
            </View>
          ) : selection == 1 && selection != 3 ? (
            <CreateContent navigation={navigation} />
          ) : (
            <GoLive
              isPublish={isPublish}
              latestLiveStreamURL={latestLiveStreamURL}
              setIsPublish={setIsPublish}
              publishBtnTitle={publishBtnTitle}
              setpublishBtnTitle={setpublishBtnTitle}
              props={props}
              handleStreamStart={handleStreamStart}
              handleStreamEnd={handleStreamEnd}
              setCameraView={setCameraView}
              navigation={navigation}
              cameraView={cameraView}
              startStreamBoolean={startStreamBoolean}
              setStartStreamBoolean={setStartStreamBoolean}
              setCameraViewFlashlight={setCameraViewFlashlight}
              isOnLiveStream={isOnLiveStream}
              setIsOnLiveStream={setIsOnLiveStream}
              cameraViewFlashlight={cameraViewFlashlight}
              vb={vb}
            />
          )}

          {!hasTakenVideo ? (
            <CaptureButtonControl
              selection={selection}
              recordVideo={recordVideo}
              setRecordVideo={setRecordVideo}
              startRecord={startRecord}
              isRecordingVideo={isRecordingVideo}
              setIsRecordingVideo={setIsRecordingVideo}
              stopRecord={stopRecord}
              pickImageOrVideo={pickImageOrVideo}
              takePicture={takePicture}
              setSelection={setSelection}
              isOnLiveStream={isOnLiveStream}
            />
          ) : (
            <>
              <Button
                block
                title="Post Video"
                buttonStyle={[styles.btn_success, { marginTop: 20 }]}
                titleStyle={styles.btn_text}
                onPress={handleSubmit(onSubmitPost)}
                loading={toggle_loading}
                disabled={false}
                disabledStyle={[
                  styles.btn_success_disabled,
                  ,
                  { marginTop: 20, opacity: 0.8 },
                ]}
              />
            </>
          )}
        </View>
      ) : (
        <View style={styles.body}>
          {!AddTextOption ? (
            <AddTextControl
              setHasTakenShot={setHasTakenShot}
              setAddTextOption={setAddTextOption}
              setshowTextOption={setshowTextOption}
              widgetTextColor={widgetTextColor}
              submitStory={submitStory}
              type={'on'}
            />
          ) : (
            <AddTextControl
              selectColorPicker={selectColorPicker}
              setAddTextOption={setAddTextOption}
              widgetTextColor={widgetTextColor}
              refRBSheetFontSize={refRBSheetFontSize}
              type={'off'}
            />
          )}

          {imageURI !== '' ? (
            <Image source={{ uri: imageURI }} style={[styles.preview]} />
          ) : (
            <></>
          )}

          {showTextOption ? (
            <DragTextEditor
              minWidth={100}
              minHeight={100}
              w={300}
              h={300}
              x={WINDOW.width / 8}
              y={WINDOW.height / 2.5}
              FontColor={widgetTextColor}
              LineHeight={25}
              TextAlign={'left'}
              PlaceHolder={'Enter text here...'}
              LetterSpacing={1}
              FontSize={Number(widgetTextSize)}
              isDraggable={true}
              isResizable={true}
              TopRightAction={() => {
                setshowTextOption(false);
              }}
              centerPress={() => console.log('-Center Pressed')}
              onDragStart={() => console.log('-Drag Started')}
              onDragEnd={() => console.log('- Drag ended')}
              onDrag={() => console.log('- Dragging...')}
              onResizeStart={() => console.log('- Resize Started')}
              onResize={() => console.log('- Resizing...')}
              onResizeEnd={() => console.log('- Resize Ended')}
            />
          ) : (
            <></>
          )}

          <View style={styles.capturebuttonContainer}>
            {/* <TouchableOpacity style={styles.postButton} 
         onPress={handleSubmit(onSubmitPost)}>          
         {
             toggle_loading ?
             <View style={styles.centralView}>
                      <Progress.Bar progress={0.3} 
                            width={200} 
                            animating={true} 
                            color={"#fff"}/>
                            <Text style={styles.uploadingText}>Uploading...Please wait</Text>
             </View>
             
                :
                <Text style={styles.posttext}>Post</Text>
         }
                 
          </TouchableOpacity>    */}
          </View>

          <ColorFontsWidget
            refRBSheet={refRBSheet}
            setWidgetTextColor={setWidgetTextColor}
            refRBSheetFontSize={refRBSheetFontSize}
            widgetTextSize={widgetTextSize}
            setWidgetTextSize={setWidgetTextSize}
          />

          <Button
            block
            title="Post"
            buttonStyle={[styles.btn_success, { marginTop: 20 }]}
            titleStyle={styles.btn_text}
            onPress={handleSubmit(onSubmitPost)}
            loading={toggle_loading}
            disabled={false}
            disabledStyle={[
              styles.btn_success_disabled,
              ,
              { marginTop: 20, opacity: 0.8 },
            ]}
          />
        </View>
      )}
    </View>
  );
};

//export default CelebrityPostStory;

const mapStateToProps = state => {
  const { error, loading } = state.Story;
  const { streams } = state.Livestream;

  return { error, loading, streams };
};

export default connect(mapStateToProps, {
  postStoryAction,
  startLiveStreamAction,
  endLiveStreamAction,
})(CelebrityPostStory);

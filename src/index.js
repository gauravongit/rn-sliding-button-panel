import React, {useState} from 'react';
import {
  Animated,
  View,
  Platform,
  Easing,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styles from './styles';

const isIOS = () => Platform.OS === 'ios';

const isRTL = () => I18nManager.isRTL;
const SlideButtonPanel = ({
  width = 70,
  height,
  buttons = [{}],
  hideBorder = true,
  showBtnIconAnimation = true,
  stopOpenBtnAnimation = true,
}) => {
  const initialPosition = isRTL() ? -width : width;
  const [position] = useState(new Animated.Value(initialPosition));
  const [openBtnIconScale] = useState(new Animated.Value(-1));
  const [actionBtnIconSpin] = useState(new Animated.Value(1));
  const [opened, setOpened] = useState(false);
  const [panelOpenBtnClicked, setPanelOpenBtnClicked] = useState(false);

  const onOpen = () => {
    setOpened(!opened);
    Animated.timing(openBtnIconScale, {
      toValue: opened ? -1 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const actionBtnIconsAnimationStart = () => {
    showBtnIconAnimation &&
      Animated.spring(actionBtnIconSpin, {
        toValue: opened ? 1 : 0,
        bounciness: 16,
        speed: 3,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
  };

  const slidePanel = () => {
    Animated.timing(position, {
      toValue: opened ? initialPosition : 0,
      duration: isIOS() ? 125 : 60,
      useNativeDriver: true,
    }).start(onOpen);
  };

  const openPanelBtnPress = () => {
    setPanelOpenBtnClicked(!panelOpenBtnClicked);
    slidePanel();
    actionBtnIconsAnimationStart();
  };

  const onStartShouldSetResponder = evt => evt.nativeEvent.touches.length === 1;

  const iconSpinRotation = actionBtnIconSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const marginTopForOpenPanelBtn = isIOS()
    ? {marginTop: -40}
    : {marginTop: panelOpenBtnClicked ? -40 : height >= 100 ? 5 : 0};

  const alignmentOpenPanelBtn = {
    right: isIOS() ? width : panelOpenBtnClicked ? width : 0,
  };

  const renderOpenPanelButton = () => {
    const animateIconX = stopOpenBtnAnimation
      ? isRTL()
        ? -1
        : 1
      : isRTL()
      ? -openBtnIconScale
      : openBtnIconScale;
    return (
      <Animated.View
        onStartShouldSetResponder={onStartShouldSetResponder}
        onResponderRelease={openPanelBtnPress}
        style={[
          styles.openPanelBtnView,
          marginTopForOpenPanelBtn,
          alignmentOpenPanelBtn,
          {width: 50, height: 90},
        ]}>
        <Animated.View style={{transform: [{scaleX: animateIconX}]}}>
          <Icon name="play" size={12} color={'gray'} />
        </Animated.View>
      </Animated.View>
    );
  };

  const renderPanelButton = (item, index) => {
    const showBorderForButton = {
      borderBottomWidth: hideBorder ? 0 : index === buttons.length - 1 ? 0 : 2,
    };
    const {onPress = () => {}, uri = ''} = item;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.panelBtnView, showBorderForButton]}>
          <Animated.Image
            style={[
              styles.panelBtnicon,
              {transform: [{rotate: iconSpinRotation}]},
            ]}
            source={{uri: uri}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderHiddenPanel = () => {
    return (
      <View
        style={[
          styles.panelView,
          {
            width: width,
            height: height >= 100 ? height : buttons.length > 1 ? 'auto' : 200,
          },
        ]}>
        <View style={styles.panelButtonsMainView}>
          {buttons.map(renderPanelButton)}
        </View>
      </View>
    );
  };

  const dyanmicTopMargin = () =>
    height >= 100 ? -height / 2 + 45 : -1 * buttons.length * 45 + 45;

  const panelViewStyle = isIOS()
    ? styles.panelViewIOS
    : styles.panelViewAndroid;

  const panelViewDynamicStyle = {
    marginTop: isIOS() ? dyanmicTopMargin() : 0,
    transform: [{translateX: position}],
  };

  const renderPanelView = () => {
    return (
      <Animated.View style={[panelViewStyle, panelViewDynamicStyle]}>
        {renderHiddenPanel()}
        {isIOS() && renderOpenPanelButton()}
      </Animated.View>
    );
  };

  const renderPanelOnAndroid = () => {
    return panelOpenBtnClicked ? (
      <View
        style={[
          styles.mainViewAndroid,
          {
            width: width + 35,
            marginTop: dyanmicTopMargin(),
          },
        ]}>
        {renderOpenPanelButton()}
        {renderPanelView()}
      </View>
    ) : (
      renderOpenPanelButton()
    );
  };

  return isIOS() ? renderPanelView() : renderPanelOnAndroid();
};

export default SlideButtonPanel;
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  Animated,
  View,
  Platform,
  Easing,
  I18nManager,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import styles from './styles';

const isIOS = () => Platform.OS === 'ios';

const isRTL = () => I18nManager.isRTL;

const SlideButtonPanel = forwardRef(
  (
    {
      width = 70,
      height,
      top = 150,
      alignment = 'right',
      slidingWidth = 0,
      onShow = () => {},
      onHide = () => {},

      panelBackgroundColor = 'rgba(0,0,0,0.8)',
      panelStyle = {},
      customPanelView = null,

      buttons = [{}],
      showBtnSeparator = true,
      btnIconsAnimation = true,
      flipIconsInRTL = false,
      btnSeparatorColor = 'gray',

      hideOpenButton = false,
      openBtnBackgroundColor = 'rgba(0,0,0,0.8)',
      openButtonStyle = {},
    },
    ref,
  ) => {
    const showLeft = alignment === 'left';
    const panelHeight = height >= 100 ? height : 300;
    const openButtonWidth = openButtonStyle.width || 35;
    const openButtonHeight = openButtonStyle.height || 80;

    const borderRadiusStyle = showLeft
      ? styles.borderStyleRight
      : styles.borderStyleLeft;
    const alignmentStyle = showLeft ? styles.alignLeft : styles.alignRight;
    const initialPosition = isRTL()
      ? showLeft
        ? width
        : -width
      : showLeft
      ? -width
      : width;
    const [position] = useState(new Animated.Value(initialPosition));
    const [openBtnIconScale] = useState(new Animated.Value(isRTL() ? 1 : -1));
    const [actionBtnIconSpin] = useState(new Animated.Value(1));
    const [opened, setOpened] = useState(false);
    const [panelOpenBtnClicked, setPanelOpenBtnClicked] = useState(false);

    const onOpen = () => {
      const toValue = opened ? -1 : 1;
      opened
        ? typeof onHide === 'function' && onHide()
        : typeof onShow === 'function' && onShow();
      setOpened(!opened);
      Animated.timing(openBtnIconScale, {
        toValue: isRTL() ? -toValue : toValue,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const actionBtnIconsAnimationStart = () => {
      btnIconsAnimation &&
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
        toValue: opened
          ? initialPosition
          : 0 -
            slidingWidth * (isRTL() ? (showLeft ? 1 : -1) : showLeft ? -1 : 1),
        duration: 125,
        useNativeDriver: true,
      }).start(onOpen);
    };

    const openPanelBtnPress = () => {
      setPanelOpenBtnClicked(!panelOpenBtnClicked);
      slidePanel();
      actionBtnIconsAnimationStart();
    };

    useImperativeHandle(ref, () => ({
      openPanel: openPanelBtnPress,
    }));

    const onStartShouldSetResponder = evt =>
      evt.nativeEvent.touches.length === 1;

    const iconSpinRotation = actionBtnIconSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const openBtnDynamicStyle = isIOS()
      ? {
          left: showLeft ? 'auto' : -openButtonWidth,
          right: showLeft ? -openButtonWidth : 'auto',
          backgroundColor: openBtnBackgroundColor,
        }
      : {
          top:
            panelOpenBtnClicked || opened
              ? 'auto'
              : top + panelHeight / 2 - openButtonHeight / 2,
          position: panelOpenBtnClicked || opened ? 'relative' : 'absolute',
          backgroundColor: openBtnBackgroundColor,
        };

    const alignPanelButton = isIOS() ? {} : alignmentStyle;
    const openBtnBorderStyle =
      Object.keys(openButtonStyle).length > 2 ? {} : borderRadiusStyle;

    const renderOpenPanelButton = () => {
      const animateIconX = openBtnIconScale;
      return (
        <Animated.View
          onStartShouldSetResponder={onStartShouldSetResponder}
          onResponderRelease={openPanelBtnPress}
          style={[
            styles.openPanelBtnView,
            openBtnDynamicStyle,
            openBtnBorderStyle,
            alignPanelButton,
            openButtonStyle,
            {width: openButtonWidth, height: openButtonHeight},
          ]}>
          <Animated.View style={{transform: [{scaleX: animateIconX}]}}>
            <Image
              source={require('./assets/ic_play.png')}
              style={styles.openBtnIcon}
            />
          </Animated.View>
        </Animated.View>
      );
    };

    const renderPanelButton = (item, index) => {
      const showBorderForButton = {
        borderBottomWidth: showBtnSeparator
          ? index === buttons.length - 1
            ? 0
            : 2
          : 0,
        borderBottomColor: btnSeparatorColor,
        transform: [{scaleX: isRTL() && flipIconsInRTL ? -1 : 1}],
      };
      const {
        onPress = () => {},
        uri = '',
        requireUri,
        iconWidth = 36,
        iconHeight = 36,
        buttonView = null,
      } = item;

      const iconDimension = {
        width: iconWidth,
        height: iconHeight,
      };

      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={[styles.panelBtnView, showBorderForButton]}>
            <Animated.View
              style={[
                styles.panelButtonAnimatediew,
                {transform: [{rotate: iconSpinRotation}]},
              ]}>
              {buttonView || (
                <Animated.Image
                  style={[styles.panelBtnicon, iconDimension]}
                  source={requireUri ? requireUri : {uri: uri}}
                />
              )}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      );
    };

    const hiddenPanelDynamicStyle = {
      backgroundColor: panelBackgroundColor,
      width: width,
      height: panelHeight,
    };

    const panelBorderStyle =
      Object.keys(panelStyle).length > 0 ? {} : borderRadiusStyle;

    const renderHiddenPanel = () => {
      return (
        <View
          style={[
            styles.panelView,
            hiddenPanelDynamicStyle,
            panelBorderStyle,
            panelStyle,
          ]}>
          {customPanelView || buttons.map(renderPanelButton)}
        </View>
      );
    };

    const panelViewDynamicStyle = {
      transform: isIOS() ? [{translateX: position}] : [],
      top,
    };

    const renderPanelView = () => {
      return isIOS() ? (
        <Animated.View
          style={[
            styles.panelViewAnimated,
            panelViewDynamicStyle,
            alignmentStyle,
          ]}>
          {!hideOpenButton && renderOpenPanelButton()}
          {renderHiddenPanel()}
        </Animated.View>
      ) : (
        renderHiddenPanel()
      );
    };

    const androidPanelDynamicStyle = {
      flexDirection: showLeft ? 'row-reverse' : 'row',
      height: panelHeight,
      top,
    };

    const renderPanelOnAndroid = () => {
      return panelOpenBtnClicked || opened ? (
        <Animated.View
          style={[
            styles.panelViewAnimated,
            alignmentStyle,
            androidPanelDynamicStyle,
            {transform: [{translateX: position}]},
          ]}>
          {!hideOpenButton && renderOpenPanelButton()}
          {renderPanelView()}
        </Animated.View>
      ) : (
        !hideOpenButton && renderOpenPanelButton()
      );
    };

    return isIOS() ? renderPanelView() : renderPanelOnAndroid();
  },
);

export default SlideButtonPanel;

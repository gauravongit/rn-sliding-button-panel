import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  panelViewAnimated: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  panelView: {
    height: '100%',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  panelBtnView: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  panelBtnicon: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  openBtnIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: 'gray',
  },
  openPanelBtnView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  panelButtonAnimatediew: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderStyleRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  borderStyleLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  alignRight: {
    right: 0,
  },
  alignLeft: {
    left: 0,
  },
});

export default styles;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  panelViewIOS: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    top: '50%',
  },
  panelViewAndroid: {
    marginLeft: 35,
  },
  mainViewAndroid: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    top: '50%',
    flexDirection: 'row',
  },
  panelView: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  panelBtnView: {
    width: '100%',
    padding: 10,
    paddingVertical: 20,
    alignSelf: 'center',
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
  panelBtnicon: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  openPanelBtnView: {
    position: 'absolute',
    top: '50%',
    height: 80,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightColor: 'gray',
    borderRightWidth: 2,
    zIndex: 2,
  },
});

export default styles;

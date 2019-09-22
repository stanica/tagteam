import { StyleSheet } from 'react-native';
import Colors from 'helpers/Colors';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(255,255,255,0.1)',
    // backgroundColor: 'white'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    // marginTop: 100,
    flex: 1
  },
  loginContainer: {
    height: 90,
    justifyContent: 'flex-end',
  },
  formField: {
    marginTop: 40,
    borderColor: Colors.primary,
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  loginIcon: {
    color: Colors.primary,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 30
  },
  backIcon: {
    color: Colors.primary,
    fontSize: 40,
  },
  textField: {
    // color: 'rgba(84,127,153,1)'
    color: Colors.primary,
  },
  extraButtonsContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 15
  },
  extraButtons: {
    color: Colors.primary,
  },
  headerImage: {
    // width: '100%',
    // height: 150,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 0,
    borderWidth: 0,
    height: 70,
    borderColor: Colors.primary,
    elevation: 0,
    // marginHorizontal: 10,
  },
  loginButtonText: {
    color: 'white',
    letterSpacing: 1,
    fontSize: 18
  },
  child: {
    width,
    justifyContent: 'center'
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});

export default styles;

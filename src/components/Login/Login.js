import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from 'helpers/Colors';
import PropTypes from 'prop-types';

import ErrorView from '../common/ErrorView';
import styles from './styles';

import getUser from 'selectors/UserSelectors';
import errorsSelector from 'selectors/ErrorSelectors';
import { isLoadingSelector } from 'selectors/StatusSelectors';
import strings from 'localization';
import { login, actionTypes } from 'actions/UserActions';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Button, Icon, Item, Input, H1} from 'native-base';
import logo from 'assets/logo.png';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => getUser(state));
  const isLoading = useSelector(state => isLoadingSelector([actionTypes.LOGIN], state));
  const errors = useSelector(state => errorsSelector([actionTypes.LOGIN], state));

  const dispatch = useDispatch();
  const loginUser = useCallback(() => dispatch(login(email, password)), [email, password, dispatch]);
  const passwordChanged = useCallback(value => setPassword(value), []);
  const emailChanged = useCallback(value => setEmail(value), []);

  const image = 'https://images.pexels.com/photos/37728/pexels-photo-37728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

  useEffect(() => {
    if (user !== null) {
      props.navigation.navigate('App');
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground blurRadius={3} style={{flex:1, resizeMode:'cover'}} source={{uri:image}}>
      <StatusBar  hidden/>
      <View style={styles.formContainer}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo}/>
        <Text style={{fontSize:45, marginTop: 20, letterSpacing: 2, fontWeight: 'bold', color: Colors.black}}>TagTeam</Text>
        </View>
        <View style={{flex:1}}>
          <Item style={styles.formField}>
            <Icon active type="EvilIcons" name='envelope' style={styles.loginIcon}/>
            <Input
              style={styles.textField}
              placeholder={strings.email}
              placeholderTextColor="rgba(45,95,128,1)"
              onChangeText={emailChanged}
              value={email}/>
          </Item>
          <Item style={styles.formField}>
            <Icon active type="EvilIcons" name='lock' style={styles.loginIcon}/>
            <Input
              style={styles.textField}
              placeholder={strings.password}
              placeholderTextColor = "rgba(45,95,128,1)"
              value={password}
              onChangeText={passwordChanged}
              secureTextEntry/>
          </Item>
          <ErrorView errors={errors} />
          <View style={styles.extraButtonsContainer}>
            <Button transparent light>
              <Text style={styles.extraButtons}>Create Account</Text>
            </Button>
            <Button transparent light>
              <Text style={styles.extraButtons}>Forgot Password</Text>
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.loginContainer}>
        <Button
          block
          onPress={loginUser}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}> {isLoading ? strings.loading : strings.login}</Text>
        </Button>
      </View>
      </ImageBackground>
    </View>
  );
}

Login.navigationOptions = {
  headerStyle: {
    margin: Platform.OS === 'ios' ? -getStatusBarHeight() :  -getStatusBarHeight() - 4,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0
  },
  // headerTitle: <Thumbnail style={styles.headerImage} source={{uri: 'https://iukl.edu.my/wp-content/uploads/2018/01/bachelor-of-communication-hons-in-corporate-communication-1.jpg'}} square/>
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login;

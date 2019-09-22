import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Text, Icon, Left, Body, Right } from 'native-base';

import styles from './styles';

import strings from 'localization';
import TextStyles from 'helpers/TextStyles';
import { logout } from 'actions/UserActions';
import getUser from 'selectors/UserSelectors';
import axios from 'axios';

function Profile(props) {
  const user = useSelector(state => getUser(state));
  const dispatch = useDispatch();
  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);
  const [data, setData] = useState([])
  
  const refresh = () => {
    setData([])
    axios.post('https://w0zhdd90c3.execute-api.us-east-1.amazonaws.com/test/profile', {
      type: 'transaction_list',
    }).then(res => {
        console.log(res);
        setData(res.data)
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    if (user === null) {
      props.navigation.navigate('Auth');
    }
    console.log('f')
    axios.post('https://w0zhdd90c3.execute-api.us-east-1.amazonaws.com/test/profile', {
      type: 'transaction_list',
  }).then(res => {
      console.log(res);
      setData(res.data)
  }).catch(err => console.log(err))
  },[]);

  return (
    <ScrollView style={styles.container}>
      <Button onPress={refresh} full><Icon style={{color: 'white', marginLeft: 0, marginRight: 0}} name="cycle" type="Entypo"/><Text>Refresh</Text></Button>
        { 
          data.map((transaction, i) => {
            return <Content key={i} style={{marginTop:20}}>
            <Card >
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://cdn.cnn.com/cnnnext/dam/assets/190916162859-us-politics-trump-exlarge-169.jpg'}} />
                <Body>
                  <Text>{transaction.profile_name}</Text>
                  <Text note>Purchase</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon type="Entypo" active name="credit-card" />
                  <Text>${transaction.amount}</Text>
                </Button>
              </Left>
              
              <Right>
                <Text>{(new Date(transaction.date)).toDateString()}</Text>
              </Right>
            </CardItem>
          </Card>
          </Content>
          })
        }
        
      {/* <Text style={TextStyles.fieldTitle}> {strings.profile} </Text>
      <Text>
        {strings.profileMessage}
      </Text>
      <Button
        title={strings.logout}
        onPress={logoutUser}
      /> */}
    </ScrollView>
  );
}

Profile.navigationOptions = {
  title: "Transactions"
};


export default Profile;

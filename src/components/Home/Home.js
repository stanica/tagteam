import React, { useCallback, useEffect, useState } from 'react';
import NfcManager, {Ndef, NfcTech, NfcEvents, NdefParser} from 'react-native-nfc-manager';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from 'helpers/Colors';

import styles from './styles';
import scan from 'assets/popeyes.png';

import TextStyles from 'helpers/TextStyles';
import strings from 'localization';
import getUser from 'selectors/UserSelectors';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';
import TopUp from './TopUp';
import axios from 'axios';

function Home() {
  const user = useSelector(state => getUser(state));
  const getMessage = useCallback(() => `${strings.homeMessage} ${user && user.name}`, [user]);
  const [isLoading, setIsLoading] = useState(false);
  const [funds, setFunds] = useState(0);
  const [topUpModalVisible, setTopUpModalVisible] = useState(false);
  const [profile, setProfile] = useState({});

  const _cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  const buildUrlPayload = (valueToWrite) => {
    return Ndef.encodeMessage([
        Ndef.textRecord(valueToWrite),
    ]);
  }
  const _test = async () => {
    try {
      setIsLoading(true)
      // setTopUpModalVisible(true);
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
      setIsLoading(false)
    }
  }

  _testNdef = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NFC tags!'
      });
      console.warn(resp);
      let ndef = await NfcManager.getNdefMessage();
      console.warn(ndef);
      let bytes = buildUrlPayload("1");
      await NfcManager.writeNdefMessage(bytes);
      console.warn('successfully write ndef');
      await NfcManager.setAlertMessageIOS('I got your tag!');
      _cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      _cleanUp();
    }
  }

  const _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', tag, );
      axios.post('https://w0zhdd90c3.execute-api.us-east-1.amazonaws.com/test/profile', {
            id: 1,
            type: 'profile',
        }).then(res => {
            console.log(res);
            setIsLoading(false);
            setProfile(res.data[0])
            setTopUpModalVisible(true);
        }).catch(err => console.log(err))
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
    return () => _cleanUp();
  }, [])

  return (
    <View style={styles.container}>
      <TopUp profile={profile} topUpModalVisible={topUpModalVisible} setTopUpModalVisible={setTopUpModalVisible} funds={funds} setFunds={setFunds}/>
      <Image style={{height: 200, resizeMode:'contain'}} source={scan}/>
      <View style={{padding: 20}}>
        <Button onPress={_test} style={{backgroundColor:Colors.primary, borderRadius: 20, width:200, alignItems:'center', justifyContent:'center'}}>
          {isLoading && <Spinner color={Colors.white} size="small"/>}
          <Text style={{color: 'white',fontSize:20, marginLeft: isLoading ? 10 : 0}}>{isLoading ? 'SCANNING' : 'SCAN'}</Text>
          </Button>
        {/* <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={_test}
        >
          <Text>Tests</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={_testNdef}
        >
          <Text>Test Ndef</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={_cancel}
        >
          <Text>Cancel Test</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

Home.navigationOptions = {
  title:'TagTeam',
};

export default Home;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Icon, Button, H2, Thumbnail } from 'native-base';
import Colors from 'helpers/Colors';
import strings from 'localization';
import Biometrics from 'react-native-biometrics'
import { Overlay } from 'react-native-elements';
import axios from 'axios';
import httpClient from '../../controllers/HttpClient';

function TopUp(props) {
    const setTopUpModalVisible = props.setTopUpModalVisible;
    const [newFunds, setNewFunds] = useState(0);
    const basePath = '/profile';
    const addFunds = () => {
        let newAmount = newFunds + 1;
        setNewFunds(newAmount);
    }
    const decreaseFunds = () => {
        let newAmount = newFunds - 1;
        if (newAmount < 0){
            newAmount = 0;
        }
        setNewFunds(newAmount);
    }
    const checkBiometrics = () => {
        // try {
        //     const result = httpClient.post(
        //       `${basePath}`,
        //       {
        //         data: {
        //             type: "profile",
        //             id: 1
        //         }
        //     }
        //     ).then(res => consol.log(res));
        //     // Data is the object exposes by axios for the response json
        //   } 
        //   catch (error) {
        //     return error;
        //   }
        
        Biometrics.simplePrompt('Confirm Identity')
        .then(() => {
            // let amount = props.funds + newFunds;
            // props.setFunds(amount);
            axios.post('https://w0zhdd90c3.execute-api.us-east-1.amazonaws.com/test/profile', {
                profile_id: 1,
                type: 'transaction',
                vendor_id: 1,
                amount: newFunds
            }).then(res => {
                console.log(res);
                // setTopUpModalVisible(false);
                axios.post('https://w0zhdd90c3.execute-api.us-east-1.amazonaws.com/test/profile', {
                    profile_id: 1,
                    type: 'balance_update',
                    vendor_id: 1,
                    amount: newFunds
                }).then(res => {
                    console.log(res);
                    setTopUpModalVisible(false);
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
            
        })
        .catch(() => {
            Alert.alert(
                'Authentication Required',
                'You need to authenticate yourself before you can confirm this purchase.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        })
    }

    return (
        <Overlay isVisible={props.topUpModalVisible} overlayStyle={styles.modal} onBackdropPress={() => setTopUpModalVisible(false)}>
            <View style={styles.modalContainer}>
                <H2 style={styles.title}>Confirm Purchase</H2>
                <View style={{marginTop: -20}}>
                    <View style={styles.controlsContainer}>
                        <Button disabled={newFunds === 0} onPress={() => decreaseFunds()} transparent style={styles.iconButton}><Icon style={[styles.icon, {color: newFunds === 0 ? Colors.gray : Colors.hero}]} type='Entypo' name='circle-with-minus'/></Button>
                        <Text style={styles.newFundsAmount}>${newFunds}</Text>
                        <Button onPress={() => addFunds()} transparent style={styles.iconButton}><Icon style={styles.icon} type='Entypo' name='circle-with-plus'/></Button>
                    </View>
                    <View style={styles.underlineContainer}>
                        <View style={styles.underline} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.cardInfoRow}>
                        <Thumbnail large style={styles.cardImage} source={{uri: 'https://cdn.cnn.com/cnnnext/dam/assets/190916162859-us-politics-trump-exlarge-169.jpg'}}/>
                        <Text style={{fontSize: 14, color: Colors.muted, marginLeft: -40}}>{props.profile.name}</Text>
                        <Button style={{borderColor: Colors.primary, borderRadius: 0}} small transparent><Text style={{paddingHorizontal: 10, fontSize: 16, color: Colors.primary}}>${props.profile.balance}</Text></Button>
                    </View>
                    <Button full onPress={() => checkBiometrics()} style={styles.viewTicketButton}>
                        <Icon style={[styles.thumbIcon, {marginLeft: 0}]} type='FontAwesome5' name='fingerprint'/>
                        <Text style={styles.viewTicketText}>CONFIRM</Text>
                    </Button>
                </View>
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    modal: {
        height: 'auto',
        height: 320,
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'left',
        color: Colors.black,
        marginBottom: 20,
        marginTop: 10,
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        color: Colors.hero,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        fontSize: 32
    },
    newFundsAmount: {
        fontWeight: 'bold',
        fontSize: 30,
        color: Colors.black
    },
    iconButton: {
        paddingTop: 0,
        paddingBottom: 0
    },
    underlineContainer: {
        flexDirection: 'row',
        justifyContent:'center'
    },
    underline: {
        backgroundColor: Colors.gray,
        height: 1,
        alignSelf: 'center',
        flex: 1,
        marginTop: 10,
    },
    viewTicketButton: {
        backgroundColor: Colors.alternative,
    },
    viewTicketText: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    bottomContainer: {
    },
    thumbIcon: {
        color: Colors.white
    },
    cardInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    cardImage: {
        width: 70,
        height: 70,
    }
});

export default TopUp;
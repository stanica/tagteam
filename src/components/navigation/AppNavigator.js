import React from 'react';
import { Image, Text } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Profile from '../Profile';
import Home from '../Home';

import homeIcon from 'assets/ic_home/ic_home.png';
import settingsIcon from 'assets/ic_settings/ic_settings.png';
import Colors from 'helpers/Colors';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

// const iconForTab = ({ state }) => {
//   switch (state.routeName) {
//     case 'Home':
//       return homeIcon;
//     case 'Profile':
//       return settingsIcon;
//     default:
//       return null;
//   }
// };

const iconForTab = ({ state }) => {
  switch (state.routeName) {
    case 'Home':
      return 'price-tag';
    case 'Profile':
      return 'wallet';
    case 'Music':
      return 'music';
    default:
      return null;
  }
};

const headerComponent = () => (
  <Header style={{width: '100%'}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
);

const TabIcon = ({ icon, tintColor }) => (// eslint-disable-line
  <Image
    source={icon}
    style={[{ tintColor },{height:30, width:30}]}
  />
);

const ProfileStack = createStackNavigator({ Profile },{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    // headerTitle: <Text>ADSS</Text>,
    headerTintColor: Colors.white,
  }
});
const HomeStack = createStackNavigator({ Home },{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerRight: (
      <Button transparent onPress={() => alert('Don\'t press this!')}>
              <Icon style={{color: 'white', fontSize: 30}} type="EvilIcons" name='gear' />
            </Button>
    ),
    headerTintColor: Colors.white,
  }
});
const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.gray,
      showLabel: false,
      animationEnabled: true,
      style: {
        
        elevation: 3,
        borderTopColor: 'transparent',
        height: 50
      },
      labelStyle: {
        justifyContent: 'flex-start',
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (// eslint-disable-line
        <Icon
        name={iconForTab(navigation)}
        style={{color: tintColor}}
        type='Entypo'
      />
      ),
    }),
  },
);

export default AppStack;

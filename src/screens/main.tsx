import React, {useCallback, useEffect} from 'react';
import {ScrollView, Alert, ActivityIndicator} from 'react-native';
import {View, Text, Card, ListItem} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {If} from '@kanzitelli/if-component';


import {useServices} from '../services';
import {useStores} from '../stores';

import {Section} from '../components/section';
import {Reanimated2} from '../components/reanimated2';
import {randomNum} from '../utils/help';
import {BButton} from '../components/button';
import { FloatingAction } from "react-native-floating-action";

export const Main: React.FC = observer(({}) => {
  const {nav, t, api} = useServices();
  const {counter, ui} = useStores();

  const start = useCallback(async () => {
    try {
      await api.counter.get();
    } catch (e) {
      Alert.alert('Error', 'There was a problem fetching data :(');
    }
  }, [api.counter]);

  useEffect(() => {
    start();
  }, []);

  const shortTeamName = (teamName: string) => {
    return teamName.length > 20 ? teamName.substring(0, 20) + '...' : teamName;
  }

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic" marginV-10 >
        <Card flex  marginT-20 padding-10 marginL-10 marginR-10  borderRadius={30}>
          <Card.Section
              content={[{text: 'Soccer ⚽', text90L: true, grey10: true}]}
              contentStyle={{alignItems: 'center'}}
              marginB-5
            />
            <Card.Section
              content={[{text: 'Willem II - Telstar', text90L: true, grey10: true}]}
              contentStyle={{alignItems: 'center'}}
            />
          <ListItem.Part row>
            <Text grey10 text30L marginL-60>
              0
            </Text>
            <Text grey10 text40L>
              -
            </Text>
            <Text grey10 text30L marginR-60>
              2
            </Text>
          </ListItem.Part>

        </Card>

        <Card flex  marginT-20 padding-10 marginL-10 marginR-10  borderRadius={30}>
          <Card.Section
              content={[{text: 'Basketball 🏀', text90L: true, grey10: true}]}
              contentStyle={{alignItems: 'center'}}
              marginB-5
            />
            <Card.Section
              content={[{text: `${shortTeamName("Cleveland Cavaliers")} - ${shortTeamName("San Antonio Spurs")}`, text90L: true, grey10: true}]}
              contentStyle={{alignItems: 'center'}}
            />
          <ListItem.Part row>
            <Text grey10 text30L marginL-60>
              105
            </Text>
            <Text grey10 text40L>
              -
            </Text>
            <Text grey10 text30L marginR-60>
              92
            </Text>
          </ListItem.Part>

        </Card>

    
      </ScrollView>
        <FloatingAction onPressMain={()=>{
          nav.push("ChatModal");
        }}/>
    </View>
  );
});

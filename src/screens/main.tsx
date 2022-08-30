import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, Alert, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {View, Text, Card, ListItem, LoaderScreen} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {If} from '@kanzitelli/if-component';


import {useServices} from '../services';
import {useStores} from '../stores';

import {Section} from '../components/section';
import {Reanimated2} from '../components/reanimated2';
import {randomNum} from '../utils/help';
import {BButton} from '../components/button';
import { FloatingAction } from "react-native-floating-action";
import SwipeUpDown from 'react-native-swipe-up-down';
import { isNumber } from 'lodash';
import { SearchBar } from "@rneui/themed";


export const Main: React.FC = observer(({}) => {
  const {nav, t, api} = useServices();
  const {counter, ui} = useStores();
  const [open,setOpen] = useState(false)
  const [topGames, setTopGames] = useState<any[]>([])
  const [games, setGames] = useState<any[]>([]);
  const [lodaing, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const start = useCallback(async () => {
    try {
      await api.counter.get();
    } catch (e) {
      Alert.alert('Error', 'There was a problem fetching data :(');
    }
  }, [api.counter]);


  const gamesExtend = (tournaments : any) => {
    const _games : any[] = []
    for(let tour of tournaments){
      for (let match of tour.matches){
        _games.push(match)
      }
    }

    console.log(_games)

    return _games
  }

  useEffect(() => {
    start();
    /*
    fetch(`https://stats.fn.sportradar.com/isbb/heb/Asia:Jerusalem/gismo/category_fixtures_month/66/${new Date().toLocaleDateString("se-SE",{year :"numeric",month : "2-digit"}).replace("/","-")}`,{
      method: 'Get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      const data = await res.json();
      setGames(gamesExtend(data.doc[0].data[0].realcategories[0].tournaments));
    })
    */
    setLoading(true)
    fetch("https://api.winner.co.il/v2/publicapi/GetCMobileLine",{
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        "requestid" : "aea1d97c5f5e00439098660e66839164",
        "deviceid" : "ad7eddd67535d0069d6f0b3a82f09af6",
      }
    }).then(async(res)=>{
      const games_data = await res.json();

      fetch("https://api.winner.co.il/v2/publicapi/GetCMobileTabs",{
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          "requestid" : "aea1d97c5f5e00439098660e66839164",
          "deviceid" : "ad7eddd67535d0069d6f0b3a82f09af6",
        }
      }).then(async(res1)=>{
        const data = await res1.json();
        setTopGames(data.tabs[0].markets.map((market : any)=>{
          return games_data.markets.find((_market : any) => _market.mId == market)
        }))
        setLoading(false)
      })

    })
  }, []);

  useEffect(()=>{
    console.log(games)
    console.log(topGames)
  },[games,topGames])

  const shortTeamName = (teamName: string) => {
    return teamName.length > 20 ? teamName.substring(0, 20) + '...' : teamName;
  }

  return (
    lodaing ? <LoaderScreen messageStyle={{textAlign : "center"}} message={'Please wait while we loading\nthe best games for you'}/> : ( <View flex bg-bgColor>
      <Text style={{ fontSize : 16, marginLeft : 10 }}>
        Hey Gal, 
      </Text>
      <Text style={{ fontSize : 14 , marginLeft : 10}}>
        it's fun to start the morning with the best choice
      </Text>
      <SearchBar round  
        containerStyle={{
          backgroundColor : "transparent",
          borderTopColor : "transparent",
          borderBottomColor : "transparent",
          borderColor : "transparent"
        }}
        inputContainerStyle={{
          backgroundColor : "transparent",
          borderTopColor : "black",
          borderWidth : 1,
          borderBottomColor : "black",
          borderBottomWidth : 1
        }}
        value={search}
        onChangeText={(text)=>{
          setSearch(text)
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" marginV-10 >
        {
          topGames.filter((g) => g.desc.includes(search) || g.league.includes(search)).slice(0,7).map((game, index) => {
            return (
              <Card flex key={index}  marginT-20 padding-10 marginL-10 marginR-10  borderRadius={30}>
                <Card.Section
                    content={[{text: `Soccer ⚽ - ${game.league}`, text90L: true, grey10: true}]}
                    contentStyle={{alignItems: 'center'}}
                    marginB-5
                  />
                  <Card.Section
                    content={[{text: game.desc, text90L: true, grey10: true}]}
                    contentStyle={{alignItems: 'center'}}
                  />
                <ListItem.Part row>
                  <Text grey10 text30L marginL-60>
                    -
                  </Text>
                  <Text grey10 text40L>
                    -
                  </Text>
                  <Text grey10 text30L marginR-60>
                    -
                  </Text>
                </ListItem.Part>
              </Card>
            )

          })
        }
    
      </ScrollView>
      
        <FloatingAction onPressMain={()=>{
          nav.push("ChatModal");
        }}/>
    </View>)
  );
});

/**

        {
          games.filter((g) => {
            return new Date().valueOf() > new Date(`20${g.time.date.split("/")[2]}/${g.time.date.split("/")[1]}/${g.time.date.split("/")[0]} ${g.time.time}`).valueOf() && !isNumber(g.result.away) && !isNumber(g.result.home)
          }).slice(0,10).map((game, index) => {
            return (
              <Card flex key={index}  marginT-20 padding-10 marginL-10 marginR-10  borderRadius={30}>
                <Card.Section
                    content={[{text: 'Soccer ⚽', text90L: true, grey10: true}]}
                    contentStyle={{alignItems: 'center'}}
                    marginB-5
                  />
                  <Card.Section
                    content={[{text: `${game.teams.home.name} - ${game.teams.away.name}`, text90L: true, grey10: true}]}
                    contentStyle={{alignItems: 'center'}}
                  />
                <ListItem.Part row>
                  <Text grey10 text30L marginL-60>
                    {isNumber(game.result.away) ? game.result.away : '-'}
                  </Text>
                  <Text grey10 text40L>
                    -
                  </Text>
                  <Text grey10 text30L marginR-60>
                    {isNumber(game.result.home) ? game.result.home : '-'}
                  </Text>
                </ListItem.Part>
              </Card>
            )

          })
        }

*/
/**
      <SwipeUpDown
        
        itemMini={(show : any) => (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text onPress={show}>This is the mini view, swipe up!</Text>
          </View>
        )}
        itemFull={(close : any) => (
          <ScrollView>
            
            <TouchableWithoutFeedback>
              <View>
                <TouchableOpacity onPress={close}>
                  <Text>Close</Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "blue",
                    height: 200,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "yellow",
                    height: 200,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "pink",
                    height: 200,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "red",
                    height: 200,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )}
        onShowMini={() => setOpen(false)}
        onShowFull={() => setOpen(true)}
        animation="spring"
        extraMarginTop={24}
        style={{ backgroundColor: "gray", marginTop : !open ? -100 : -20 }} // style for swipe
      />
*/

import React, { useState, useCallback, useEffect } from 'react';
import {ScrollView, Alert, ActivityIndicator} from 'react-native';
import {View, Text, Card, ListItem,Picker,PickerValue, Badge} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {If} from '@kanzitelli/if-component';

import {useServices} from '../services';
import {useStores} from '../stores';


export const ChatScreen: React.FC = observer(({}) => {
    const [cuntrys, setCountrys] = useState<{
        name : string
    }[]>([]);
    useEffect(()=>{
        fetch('https://stats.fn.sportradar.com/isbb/heb/Europe:Berlin/gismo/config_tree_mini/41/0/1').then(async(res)=>{
            const data = await res.json();
            setCountrys(data.doc[0].data[0].realcategories)
        })
    },[])

    return (
        <View flex bg-bgColor>
                {
                    cuntrys.slice(0,10).map((country, index)=>{
                        return (
                            <Badge style={{display : "flex"}} key={index} label={country.name} size={16}/>
                        )
                    })
                }
        </View>
    );
});

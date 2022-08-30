import React from "react";
import {View, Text, Colors, GridView, Button} from "react-native-ui-lib";
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native';
import {useServices} from '../services';

interface ITip{
    title: JSX.Element;
    result: string;
    win : boolean;
}

const DailyTipScreen : React.FC = observer(({}) => {
    const [tips, setTips] = React.useState<ITip[]>([
        {
            title: <Text style={{color : "white"}}>Liverpool vs <Text style={{fontWeight :"bold",color : "white"}}>Newcastle</Text></Text>,
            result : "1 - 3",
            win : true
        },
        {
            title: <Text style={{color : "white"}}>{"barcelona vs levante"}</Text>,
            result : "1 - 1",
            win : false
        },
        {
            title: <Text style={{color : "white"}}>{"betis vs real madrid"}</Text>,
            result : "1 - 3",
            win : true
        },
    ]);

    const {nav, t, api} = useServices();

    return (
        <View flex bg-bgColor>
            <View style={{flexDirection : "row",flexWrap: "wrap", justifyContent : "center"}}>
                <View style={{width : "60%"}}>
                    <Text style={{ fontSize : 16, marginLeft : 10 }}>
                        Hey Gal, 
                    </Text>
                    <Text style={{ fontSize : 14 , marginLeft : 10}}>
                        Buy here the best choice for the morning
                    </Text>
                    <View style={{justifyContent : "center", display : "flex", width : "100%", alignContent : "center"}}>
                        <Button fullWidth={false} style={{width : "50%", marginTop : 10, marginLeft : 1, marginRight : 1}}>
                            <Text color="white" style={{textAlign : "center"}} onPress={()=>{
                                nav.push("BuyTipScreen");
                            }}>
                                Buy Here
                            </Text>
                        </Button>
                    </View>
                </View>
                <View style={{width : "35%"}}>
                    <Text style={{ fontSize : 16, textAlign : "center" }}>
                        Our Winrate
                    </Text>
                    <Text style={{ fontSize : 26 , textAlign : "center"}}>
                        70%
                    </Text>
                </View>
            </View>

            <ScrollView contentInsetAdjustmentBehavior="automatic" marginV-10 style={{width : "100%", marginTop : 40}}  >
                {
                    tips.slice(0,10).map((tip, index) => {
                        return (
                            <View key={index} style={{flexDirection : "row",flexWrap: "wrap", justifyContent : "center", backgroundColor : tip.win ? "green" : "red", padding : 10, marginBottom : 3}}>
                                <View style={{width : "50%"}}>
                                    <Text style={{ fontSize : 16, color : "white"}}>
                                        {tip.title}
                                    </Text>
                                </View>
                                <View style={{width : "20%"}}>
                                    <Text style={{ fontSize : 16, textAlign : "center", color : "white" }}>
                                        {tip.result}
                                    </Text>
                                </View>
                                <View style={{width : "20%"}}>
                                    <Text style={{ fontSize : 16, textAlign : "center", color : "white", fontWeight : "bold" }}>
                                        {tip.win ? "Win" : "Lose"}
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>

        </View>
    )
});
export default DailyTipScreen;

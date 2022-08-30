import React from "react";
import {View, Text, Colors, GridView, Button, RadioGroup, RadioButton, Checkbox, Dividers} from "react-native-ui-lib";
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native';
import {useServices} from '../services';
import { Divider } from "@rneui/themed";



const BuyTipScreen : React.FC = observer(({}) => {
    const {nav, t, api} = useServices();

    return (
        <View flex bg-bgColor>
            <View style={{height : 50, backgroundColor : "#1e202d"}}></View>
            <View style={{height : "20%", backgroundColor : "#1e202d"}}>
                <Text style={{ fontSize : 24, marginLeft : 10, color : "white", marginTop : 13 }}>
                    Buy A Tip
                </Text>
                <Text style={{ fontSize : 16, marginLeft : 10, marginTop : 40, color : "yellow" }}>
                    Total price for the order : $10
                </Text>
            </View>
            <View style={{height : "80%", backgroundColor : "#35384b"}}>
                <Text style={{color : "white", fontSize : 18, marginTop : 15, marginLeft : 10}}>
                    Payment Info
                </Text>
                <RadioGroup style={{marginLeft : 10}}  onValueChange={() => console.log('value changed')}>
                    <RadioButton value={1} labelStyle={{color : "white", fontSize : 16, padding : 10}} label={"Card: **** 5110 \nExpried date: 08/22"}/>
                    <RadioButton value={-1} labelStyle={{color : "white", fontSize : 16, padding : 10}} label={"New credit card \nSetup card"}/>
                </RadioGroup>
                <Divider style={{marginTop : 10}} />
                <View style={{marginLeft : 10, marginTop : 5}}>
                    <Checkbox value={true} labelStyle={{color : "white", fontSize : 16, padding : 10}} label={"Points that earned: 25"}/>
                </View>
                <Text style={{color : "white", fontSize : 18, marginTop : 15, marginLeft : 10}}>
                    Invoice Info
                </Text>
                <RadioGroup style={{marginLeft : 10}}  onValueChange={() => console.log('value changed')}>
                    <RadioButton value={1} labelStyle={{color : "white", fontSize : 14, padding : 10}} label={"Toren Medina\n050-1231234 | username@gmail.com\nIsreal, Isreal"}/>
                    <RadioButton value={-1} labelStyle={{color : "white", fontSize : 16, padding : 10}} label={"Other Info\nProduce the invoice on other details"}/>
                </RadioGroup>
                <View style={{marginTop : 20}}/>
                
                <View style={{flexDirection : "row",marginTop : 10, display : "flex", justifyContent : "center"}}>
                    <View style={{width : "45%"}}>
                        <Button style={{marginRight : 5}} fullWidth={false} >
                            <Text color="white" style={{textAlign : "center"}}>
                                Done
                            </Text>
                        </Button>
                    </View>
                    <View style={{width : "45%"}}>
                        <Button style={{marginLeft : 5}} fullWidth={false} onPress={() => {
                            nav.pop()
                        }}>
                            <Text color="white" style={{textAlign : "center"}}>
                                Cancel
                            </Text>
                        </Button>
                    </View>
                </View>

            </View>
            
        </View>
    )
});
export default BuyTipScreen;

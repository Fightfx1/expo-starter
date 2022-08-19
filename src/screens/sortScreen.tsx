import React, {useCallback, useEffect} from 'react';
import {ScrollView, Alert, ActivityIndicator} from 'react-native';
import {View, Text, Card, ListItem,Picker,PickerValue, Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {If} from '@kanzitelli/if-component';

import {useServices} from '../services';
import {useStores} from '../stores';

import {Section} from '../components/section';
import {Reanimated2} from '../components/reanimated2';
import {randomNum} from '../utils/help';
import {BButton} from '../components/button';

const filters = [
    {
        question: 'Avg Goals-per match per season',
        SubParamater: [
            {
                question: 'Scored',
                subParamater: [
                    {
                        question: '1st half',
                        subParamater: [
                            {
                                question: 'home',
                                subParamater: []
                            },
                            {
                                question: 'away',
                                subParamater: []
                            },
                            {
                                question: 'total',
                                subParamater: []
                            }
                        ]
                    },
                    {
                        question: '2nd half',
                        subParamater: [
                            {
                                question: 'home',
                                subParamater: []
                            },
                            {
                                question: 'away',
                                subParamater: []
                            },
                            {
                                question: 'total',
                                subParamater: []
                            }
                        ]
                    },
                    {
                        question: 'until 90 minutes',
                        subParamater: [
                            {
                                question: 'home',
                                subParamater: []
                            },
                            {
                                question: 'away',
                                subParamater: []
                            },
                            {
                                question: 'total',
                                subParamater: []
                            }
                        ]
                    },
                    {
                        question: 'until 90 minutes',
                        subParamater: [
                            {
                                question: 'home',
                                subParamater: []
                            },
                            {
                                question: 'away',
                                subParamater: []
                            },
                            {
                                question: 'total',
                                subParamater: []
                            }
                        ]
                    },
                    {
                        question: 'Timeline every 15min',
                        subParamater: [
                            {
                                question: 'home',
                                subParamater: []
                            },
                            {
                                question: 'away',
                                subParamater: []
                            },
                            {
                                question: 'total',
                                subParamater: []
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        question: 'Avg Shots-per match per season',
        SubParamater: [
            {
                question: '1Scored',
                subParamater: [
                    {
                        question: '1st half',
                        subParamater: [
                            {
                                question: 'home',
                                subParamater: []
                            },
                            {
                                question: 'away',
                                subParamater: []
                            },
                            {
                                question: 'total',
                                subParamater: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export const SortScreen: React.FC = observer(({}) => {
    const [selectedValue, setSelectedValue] = React.useState<number>(0);
    const [selectedValue1, setSelectedValue1] = React.useState(0);
    const [selectedValue2, setSelectedValue2] = React.useState(0);
    const [selectedValue3, setSelectedValue3] = React.useState(0);

    const shortTeamName = (teamName: string) => {
        return teamName.length > 20 ? teamName.substring(0, 20) + '...' : teamName;
    }
    useEffect(() => {
        console.log('selectedValue', selectedValue);
        console.log('selectedValue1', selectedValue1);
    } , [selectedValue, selectedValue1]);


    return (
        <View flex bg-bgColor>
            <Picker label="Options" migrateTextField value={selectedValue} placeholder={'Placeholder'} onChange={nativePickerValue => setSelectedValue((nativePickerValue as any)["value"])} >
                {
                    filters.map((f, index) => {
                        return <Picker.Item key={index} label={f.question} value={index} />
                    })
                }
            </Picker>
            <Picker label="Sub Options" migrateTextField value={selectedValue1} placeholder={'Placeholder'} onChange={nativePickerValue => setSelectedValue1((nativePickerValue as any)["value"])} >
                {
                    filters[selectedValue].SubParamater.map((f, index) => {
                        return <Picker.Item key={index} label={f.question} value={index} />
                    })
                }
            </Picker>
            <Picker label="Sub Options" migrateTextField value={selectedValue2} placeholder={'Placeholder'} onChange={nativePickerValue => setSelectedValue2((nativePickerValue as any)["value"])} >
                {
                    filters[selectedValue].SubParamater[selectedValue1].subParamater.map((f, index) => {
                        return <Picker.Item key={index} label={f.question} value={index} />
                    })
                }
            </Picker>
            <Picker label="Sub Options" migrateTextField value={selectedValue3} placeholder={'Placeholder'} onChange={nativePickerValue => setSelectedValue3((nativePickerValue as any)["value"])} >
                {
                    filters[selectedValue].SubParamater[selectedValue1].subParamater[selectedValue2].subParamater.map((f, index) => {
                        return <Picker.Item key={index} label={f.question} value={index} />
                    })
                }
            </Picker>
            <Button onPress={() => {
                console.log('selectedValue', selectedValue);
                console.log('selectedValue1', selectedValue1);
                console.log('selectedValue2', selectedValue2);
                console.log('selectedValue3', selectedValue3);
            } }>
                <Text color="white">
                    Append
                </Text>
            </Button>


            
        </View>
    );
});

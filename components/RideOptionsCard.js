import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView
} from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { selectDestination, selecttravelTimeInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const data = [
    {
        id: 'Uber-X-123',
        title: 'UberX',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn'
    },
    {
        id: 'Uber-XL-456',
        title: 'UberXL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8'
    },
    {
        id: 'Uber-LUX-789',
        title: 'UberLUX',
        multiplier: 1.75,
        image: 'https://links.papareact.com/7pf'
    }
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInfomation = useSelector(selecttravelTimeInformation);

    return (
        <SafeAreaView style={tailwind`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="font-awesome" />
                </TouchableOpacity>
                <Text style={tailwind`text-center py-5 text-xl`}>
                    Select a Ride - {travelTimeInfomation?.distance?.text}
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tailwind`flex-row items-center justify-between px-5 ${
                            id === selected?.id && `bg-gray-200`
                        }`}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: image }}
                        />
                        <View style={tailwind`-ml-6`}>
                            <Text style={tailwind`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInfomation?.duration.text} travel time</Text>
                        </View>
                        <Text style={tailwind`text-xl`}>
                            {new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(
                                (travelTimeInfomation?.duration.value *
                                    SURGE_CHARGE_RATE *
                                    multiplier) /
                                    100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tailwind`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    style={tailwind`bg-black py-3 m-3 ${!selected && 'bg-gray-300'} `}
                    disabled={!selected}
                >
                    <Text style={tailwind`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <View style={tailwind`bg-white flex-1`}>
            <Text style={tailwind`text-center py-5 text-xl`}>Good morning, Andy</Text>
            <View style={tailwind`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={toInputBoxStyles}
                        placeholder="Where to?"
                        returnKeyType={'search'}
                        minLength={2}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en'
                        }}
                        onPress={(data, details) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description
                                })
                            );
                            navigation.navigate('RideOptionsCard');
                        }}
                    />
                </View>
                <NavFavourites />
            </View>
            <View
                style={tailwind`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 `}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('RideOptionsCard ')}
                    style={tailwind`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tailwind`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tailwind`flex flex-row  justify-between w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tailwind` text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 16
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';

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

import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    console.log('===========================');
    console.log(GOOGLE_MAPS_APIKEY);
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: 'https://links.papareact.com/gzs'
                    }}
                />
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 16
                        }
                    }}
                    placeholder="Where from?"
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
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log('==============================================');
                        console.log(JSON.stringify(details, null, 2));
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            })
                        );
                        dispatch(setDestination(null));
                    }}
                />

                <NavOptions />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});

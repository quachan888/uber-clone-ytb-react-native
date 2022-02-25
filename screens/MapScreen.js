import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../components/Map';

const MapScreen = () => {
    return (
        <SafeAreaView>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Text>Hello</Text>
            </View>
        </SafeAreaView>
    );
};

export default MapScreen;

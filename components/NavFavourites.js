import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tailwind from 'twrnc';

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: '1100 DaleView Ct, Norcross, GA 30093'
    },
    {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: '1751 Forest Parkway, Lake City, GA 30260'
    }
];

const NavFavourites = () => {
    console.log(data);
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={[tailwind`bg-gray-200`, { height: 0.5 }]} />}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity style={tailwind`flex-row items-center p-5`}>
                    <Icon
                        style={tailwind`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tailwind`font-semibold text-lg`}>{location}</Text>
                        <Text style={tailwind`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default NavFavourites;

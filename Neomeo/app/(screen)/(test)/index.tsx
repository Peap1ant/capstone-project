import React, {useState} from 'react';
import {Pressable, Text, FlatList, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {styles} from '../../../styles/test_style.js';

type test_item = {
    id: string;
    text: string;
};

const test_data: test_item[] = [
    {id: '1', text: 'text 1'},
    {id: '2', text: 'text 2'},
    {id: '3', text: 'text 3'},
];

const flat_render = ({ item }: { item: test_item }) => (
    <View>
        <Text  style = {styles.text}>{item.text}</Text>
    </View>
);

const App = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
            <Pressable style = {styles.Pressable}>
                    <Text style = {styles.text}>test</Text>
            </Pressable>
            <FlatList
                data = {test_data}
                keyExtractor = {(item) => item.id}
                renderItem = {flat_render}
            />
        </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
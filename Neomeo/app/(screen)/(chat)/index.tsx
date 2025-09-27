import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
            <Pressable style = {styles.Pressable}>
                    <Text style = {styles.text}>test</Text>
            </Pressable>
            <ScrollView>
               <Pressable></Pressable>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    Pressable: {
        borderWidth: 1,
        marginTop: 150,
        margin: '5%',
        padding: 10,
        width: '50%',
    },
    text: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
    },
    text_test: {
        fontSize: 2000,
    },
});

export default App;
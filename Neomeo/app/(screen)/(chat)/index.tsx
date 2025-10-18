import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, ScrollView} from 'react-native';
import SafeContainer from '../../../src/(components)/SafeContainer';

const App = () => {
  return (
    <SafeContainer style = {styles.container}>
        <Pressable style = {styles.Pressable}>
            <Text style = {styles.text}>test</Text>
        </Pressable>
        <ScrollView>
            <Pressable></Pressable>
        </ScrollView>
    </SafeContainer>
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
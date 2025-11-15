import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, Image } from "react-native";
import SafeScroll from "@/src/(components)/SafeScroll";
import axios from "axios";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "http://localhost:8080";

async function fetchUserId() {
        const token = await SecureStore.getItemAsync('token')
        if (!token) return;

        try {
            const res = await axios.get(`${BASE_URL}/`)
        } catch {
            return(<View></View>)
        }
}

export default function createContentPage() {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [userid, setUserId] = useState('');
    const [created_date, setCreatedDate] = useState('');

    const json_field = {
        id: String(id).trim(),
        title: String(title).trim(),
        userid: String(userid).trim(),
        created_date: String(created_date).trim()
    }

    const createContent = async () => {
        
    }

    return(
        <SafeScroll>
            <Text>Create Content</Text>
        </SafeScroll>
    )
}
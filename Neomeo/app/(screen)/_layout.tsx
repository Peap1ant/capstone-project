import { Tabs, Stack } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
    return (
        <Tabs screenOptions = {{ tabBarActiveTintColor: '#53a8eb', headerShown: false, tabBarStyle: {height: 100, paddingBottom: 30}}}>
            <Tabs.Screen
                name = '(home)/index'
                options = {{
                    title: '홈',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name = {focused ? 'home-sharp': 'home-outline'} color = { color } size = {24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name = '(chat)/index'
                options = {{
                    title: '채팅',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name = {focused ? 'chatbubble-sharp': 'chatbubble-outline'} color = { color } size = {24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name = '(community)/index'
                options = {{
                    title: '커뮤니티',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name = {focused ? 'chatbox-ellipses': 'chatbox-ellipses-outline'} color = { color } size = {24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name = '(more)/index'
                options = {{
                    title: '더보기',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name = {focused ? 'apps': 'apps-outline'} color = { color } size = {24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name = '(test)/index'
                options = {{
                    title: '테스트',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name = {focused ? 'key': 'key-outline'} color = { color } size = {24}/>
                    ),
                }}
            />
        </Tabs>
    );
}
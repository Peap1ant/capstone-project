import { useFetchChatTag } from "@/src/(api)/fetchChatTag";
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchChatRoom() {
    const [inputText, setInputText] = useState('');
    const [searchTag, setSearchTag] = useState('');

    const { tagChatList, error, loading } = useFetchChatTag(searchTag);

    const handleSearch = () => {
        if (inputText.trim() === '') {
            alert('검색어를 입력해주세요');
            return;
        }
        setSearchTag(inputText);
    };

    return (
        <View style={styles.container}>
            {/* 검색 입력 영역 */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="태그를 입력하세요 (예: Java)"
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>검색</Text>
                </TouchableOpacity>
            </View>

            {/* 결과 출력 영역 */}
            <View style={styles.resultContainer}>
                {loading && <Text>열심히 찾는 중...</Text>}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                
                {!loading && !error && tagChatList && (
                    <FlatList
                        data={tagChatList}
                        keyExtractor={(item) => item.roomId || Math.random().toString()}
                        renderItem={({ item }) => (
                            <View style={styles.roomItem}>
                                <Text style={styles.roomTitle}>{item.name}</Text>
                                <Text>태그: {item.tags}</Text>
                            </View>
                        )}
                        ListEmptyComponent={
                            searchTag ? <Text>검색 결과가 없습니다.</Text> : <Text>검색어를 입력해보세요.</Text>
                        }
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },
    searchContainer: { flexDirection: 'row', marginBottom: 20 },
    input: { 
        flex: 1, borderWidth: 1, borderColor: '#ccc', 
        padding: 10, borderRadius: 5, marginRight: 10 
    },
    button: { 
        backgroundColor: '#007AFF', padding: 10, 
        borderRadius: 5, justifyContent: 'center' 
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
    resultContainer: { flex: 1 },
    errorText: { color: 'red' },
    roomItem: { 
        padding: 15, borderBottomWidth: 1, 
        borderBottomColor: '#eee', marginBottom: 10 
    },
    roomTitle: { fontSize: 16, fontWeight: 'bold' }
});
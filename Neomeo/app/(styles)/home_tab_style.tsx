import { StyleSheet } from 'react-native';

export const home_tabstyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },

    // 헤더
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greetingText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    subGreetingText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    notificationButton: {
        backgroundColor: '#8E97FD',
        padding: 8,
        borderRadius: 20,
    },

    // 섹션 공통
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    viewAllText: {
        fontSize: 13,
        color: '#888',
    },

    // 인기 콘텐츠
    horizontalScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    contentCard: {
        width: 260,
        height: 150,
        borderRadius: 20,
        marginRight: 15,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    contentImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 18,
        backgroundColor: 'rgba(0,0,0,0.30)',
    },
    contentTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    contentSubtitle: {
        color: '#eee',
        fontSize: 13,
    },

    // 자유게시판
    postList: {
        marginTop: 5,
    },
    postItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 5,
    },
    postIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EEF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    postContent: {
        flex: 1,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    postMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postAuthor: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        marginRight: 8,
    },
    postMetaText: {
        fontSize: 12,
        color: '#999',
        marginRight: 8,
    },

    // ⭐ 리뉴얼된 인기 채팅방 추천 카드
    chatCard: {
        width: 150,
        height: 130,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginRight: 15,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },

    // 태그 pill
    tagPill: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#5678FF',
    },

    chatRoomTitle: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
    },

    chatUserRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    chatUserCount: {
        marginLeft: 4,
        fontSize: 13,
        color: '#555',
    },
});

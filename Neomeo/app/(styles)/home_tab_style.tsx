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
    
    // 헤더 영역 스타일
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

    // 섹션 공통 컨테이너
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

    // 인기 콘텐츠 가로 스크롤 스타일
    horizontalScroll: {
        marginHorizontal: -20, 
        paddingHorizontal: 20, 
    },
    contentCard: {
        width: 280,
        height: 160,
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
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.3)', 
    },
    contentTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentSubtitle: {
        color: '#eee',
        fontSize: 14,
    },

    // 자유게시판 리스트 스타일
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
});
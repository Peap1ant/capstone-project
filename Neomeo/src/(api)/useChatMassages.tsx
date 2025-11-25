import { useEffect, useState } from "react";
import api from "@/src/(api)/api";

export interface ChatMessage {
    id: number;
    roomid: string;
    sender: string;
    message: string;
    type: "TALK" | "ENTER" | "QUIT" | string; 
    sendDate: string; // ISO 날짜 문자열
}

export function useChatMessages(roomId: string) {
    const [messages_old, setMessages] = useState<ChatMessage[]>([]);
    const [loading_old, setLoading] = useState(true);
    const [error_old, setError] = useState("");

    useEffect(() => {
        if (!roomId) return;

        const fetchMessages = async () => {
            try {
                const { data } = await api.get(`/chat/room/${roomId}/messages`);
                setMessages(data);
            } catch (e) {
                setError("채팅 내역을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [roomId]);

    return { messages_old, loading_old, error_old };
}

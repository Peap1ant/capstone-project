import { setStorage, getStorage } from "../(storage)/storage";

export async function setProfileItem(key: string, value: string) {
    try {
        await setStorage(key, value);
    } catch (e) {
        console.log("저장 실패:", e);
    }
}

export async function getProfileItem(key: string) {
    try {
        return await getStorage(key);
    } catch (e) {
        console.log("불러오기 실패:", e);
        return null;
    }
}

export async function getAllProfileItems() {
    const keys = [
        "profile_phone",
        "profile_birth",
        "profile_region",
        "profile_mbti",
        "profile_tendency",
        "profile_hobby",
    ];

    const result: any = {};

    for (const key of keys) {
        const value = await getProfileItem(key);
        result[key.replace("profile_", "")] = value ?? "";
    }

    return result;
}

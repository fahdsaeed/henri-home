import axios from 'axios';
import { ToastAndroid } from 'react-native';

const uiFaces = axios.create({
    baseURL: 'https://uifaces.co',
    headers: {
        'X-API-KEY': 'ec90c9ddf77aded1b777723c533ed2',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
    }
});

uiFaces.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        const { status, statusText } = error.response;
        ToastAndroid.showWithGravity(
            `${status} ${statusText}`,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
    } else {
        ToastAndroid.showWithGravity(
            `${error}`,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
    }
    return Promise.reject(error);
})

export default uiFaces;
import axios from 'axios';
import { ToastAndroid } from 'react-native';

const jsonPlaceholder = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

jsonPlaceholder.interceptors.response.use(response => {
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

export default jsonPlaceholder;
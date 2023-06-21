import React from 'react';
import axios from 'axios';
import { ERP } from './endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ignoreInterceptions = [
    `${ERP}seguridad/authentication`,
    `${ERP}seguridad/authentication/recover-password`
];


class interceptor {
    init() {

        axios.interceptors.request.use(async config => {
            if (ignoreInterceptions.filter(m => m === config.url).length > 0)
                return config;

            if (ignoreInterceptions.filter(m => config.url.match(m)).length > 0)
                return config;

            /* START - TIMEOUT LOCAL STORAGE */
            const dataStorange = await AsyncStorage.getItem('user');

            dataStorange = dataStorange == null ? null : JSON.parse(dataStorange);

            /* END - TIMEOUT LOCAL STORAGE */

            config.headers = {
                'user-name': dataStorange == null || dataStorange == undefined ? "" : dataStorange.userName,
                'client-identifier': dataStorange == null || dataStorange == undefined ? "" : dataStorange.integrationCode
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(async response => {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }
}
export default new interceptor();
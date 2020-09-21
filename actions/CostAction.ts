import { Get, Post } from "../tools/RestClient"
import { Cost } from "../models/Cost";
import { PermissionsAndroid, Platform } from "react-native";
import RNFB from 'rn-fetch-blob';
import { BLOB_STORAGE_URL } from "../Constants";

export const GetAll = (partId: string) => {
    return Get<Cost[]>(`/api/parts/${partId}/costs`);
}

export const Add = (partId: string, cost: { vatRate: number, amount: number, name: string }, file: any) => {
    const formData = new FormData();

    formData.append('VatRate', cost.vatRate)
    formData.append('Amount', cost.amount)
    formData.append('name', cost.name)
    formData.append('invoice', file)

    return Post(`/api/parts/${partId}/costs`, formData).then(resp => resp.status === 200);
}

export const DownloadInvoice = (invoiceUrl: string) => {
    const { config, fs, ios } = RNFB;
    const downloadDir = fs.dirs.DownloadDir;
    const urlParts = invoiceUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];

    if (Platform.OS === 'android') {

        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(granted => {

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return config({
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        path: `${downloadDir}/${fileName}`,
                    }
                }).fetch('GET', `${BLOB_STORAGE_URL}${invoiceUrl}`).then(res => true);
            }
            return new Promise(() => false);
        })
    }
    else if (Platform.OS === 'ios') {

        return config({
            path: `${downloadDir}/${fileName}`,
            fileCache: true,
        }).fetch('GET', `${BLOB_STORAGE_URL}${invoiceUrl}`)
            .then(res => { ios.previewDocument(res.data); return true; });
    }
}
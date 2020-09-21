import Axios from 'axios';
import { API_URL } from '../Constants';

export function Get<T>(url: string) {
    return Send<T>(url, "GET");
}

export function Post<T>(url: string, body: any) {
    return Send<T>(url, "POST", body);
}

export function Put<T>(url: string, body: any) {
    return Send<T>(url, "PUT", body)
}
export function Delete<T>(url: string) {
    return Send<T>(url, "DELETE");
}

function Send<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: any) {
    return Axios.request<T>({
        url: url,
        baseURL: API_URL,
        data: body,
        method: method,
    })
}
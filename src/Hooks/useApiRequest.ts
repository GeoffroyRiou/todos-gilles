import axios, { AxiosRequestConfig } from "axios";
import useToken from "./useToken";
import { API_URL } from "../constants";

const useApiRequest = <T>() => {

    const { getToken } = useToken();

    const doRequest = async (method: 'post' | 'get', path: string, data?: any) => {

        const config: AxiosRequestConfig = {};
        const token = getToken();

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        };

        return method === 'post' ?
            await axios.post<T>(`${API_URL}${path}`, data, config) :
            await axios.get<T>(`${API_URL}${path}`, config);

    }

    return { doRequest }
}

export default useApiRequest;
import { AxiosInstance } from 'axios';
import axiosApi from './axios';

class ApiService {
    protected readonly apiInstance: AxiosInstance;
    protected readonly token: string | null;

    constructor(path: string, token: string | null) {
        this.token = token;

        this.apiInstance = token
            ? axiosApi(path, { Authorization: `Bearer ${token}` })
            : axiosApi(path);
    }

    protected handleError(error: any) {
        const { response } = error;

        return response;
    }
}

export default ApiService;

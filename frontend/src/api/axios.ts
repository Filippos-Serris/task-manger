import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5182/api",
});

axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    } 
)

axiosInstance.interceptors.response.use(
    (response) => response,

    (error:AxiosError<{message?:string| string[]}>) => {
        let message = 'An error occurred';
        
        if(error.response?.status === 401){
            // localStorage.removeItem('token');
            // window.location.href = '/login';
            message = 'Unauthorized. Please log in again.';
        }

        if(error.response?.data){
            const data = error.response.data;
            if(typeof data.message === 'string'){
                message = data.message;
            } else if(Array.isArray(data.message)){
                message = data.message.join(', ');
            } else if('errors' in data && Array.isArray((data.errors))){
                message = data.errors.join(', ');
            }
        }

        (error as AxiosError & {cleanMessage?: string}).cleanMessage = message;

        return Promise.reject(error);
    }

)

export default axiosInstance;
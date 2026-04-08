import type { AuthResponse } from "@/types/AuthResponse";
import type { LoginRequest } from "@/types/LoginRequest";
import axiosInstance from "./axios";
import type { RegisterRequest } from "@/types/RegisterRequest";

export const login = async (data:LoginRequest):Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
}

export const register = async (data:RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    return response.data;
}
import API from "./api";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
// Reusable API Methods
export const fetchData = async <T>(
  endpoint: string,
  params = {}
): Promise<ApiResponse<T>> => {
  const response = await API.get<ApiResponse<T>>(endpoint, { params });
  return response.data;
};

export const postData = async <T>(
  endpoint: string,
  data: object
): Promise<ApiResponse<T>> => {
  const response = await API.post<ApiResponse<T>>(endpoint, data);
  return response.data;
};

export const putData = async <T>(
  endpoint: string,
  data: object
): Promise<ApiResponse<T>> => {
  const response = await API.put<ApiResponse<T>>(endpoint, data);
  return response.data;
};

export const deleteData = async <T>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  const response = await API.delete<ApiResponse<T>>(endpoint);
  return response.data;
};

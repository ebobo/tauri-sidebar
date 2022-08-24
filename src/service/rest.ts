import Axios from 'axios';

const http = Axios.create({
  timeout: 30000,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      console.log('Logging the error', error);
    }
    throw error;
  }
);

export interface eventSelectedRequest {
  tag: string;
}

export interface eventSelectedResponse {
  tag: string;
}

export async function eventSelect(
  data: eventSelectedRequest,
  url: string
): Promise<eventSelectedResponse> {
  return http
    .post<eventSelectedResponse>(`http://${url}/object/select`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    });
}

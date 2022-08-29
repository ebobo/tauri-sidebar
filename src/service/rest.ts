import Axios from 'axios';

// base settings
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

//interfaces
export interface eventSelectedRequest {
  tag: string;
}

export interface eventSelectedResponse {
  tag: string;
}

export interface commandRequest {
  type: string;
}
export interface commandResponse {
  type: string;
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

export async function sendCommand(
  data: commandRequest,
  url: string
): Promise<commandResponse> {
  return http
    .post<commandResponse>(`http://${url}/object/command`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    });
}

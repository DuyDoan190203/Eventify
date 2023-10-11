//agent.ts will contain all the requests that go from the client side to the API 
//Using AXIOS
import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/Activity';


const sleep = (delay: number) => {
  return new Promise ((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5001/api';
  // Axios interceptors create Fake Delay to make the app more realistic!!! 
axios.interceptors.response.use(async response => { 
  // Axios interceptors create Fake Delay to make the app more realistic!!!
  try {
    await sleep(500);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  } 
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data; // using <T> as generic to make the Data more specific

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: Record<string,never>) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: Record<string,never>) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post<void>('/activities', activity),
  update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),  
  delete: (id: string) => axios.delete(`/activities/${id}`),  

}

const agent = {
  Activities
}

export default agent;
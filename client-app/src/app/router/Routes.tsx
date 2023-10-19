import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import AcitivityDetails from "../../features/activities/details/ActivitiyDetails";

export const routes: RouteObject[] = [
  {
    path: '/', 
    element: <App/>,
    children: [
      {path: '', element: <HomePage/>},
      {path: 'activities', element: <ActivityDashboard/>},
      {path: 'activities/:id', element: <AcitivityDetails/>},
      {path: 'createActivity', element: <ActivityForm key='create' />},
       // Use key to RESET the state form the component.
      {path: 'manage/:id', element: <ActivityForm key='manage'/>},
    ]
  }
]


export const router = createBrowserRouter(routes);
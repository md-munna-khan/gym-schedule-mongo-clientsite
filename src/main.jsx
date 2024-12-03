import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import AddSchedule from './pages/addSchedule.jsx';
import AllSchedule from './pages/AllSchedule.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import UpdateSchedule from './assets/components/UpdateSchedule.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:'/',
       element:<Home></Home>
      },
      {
        path:'/add-schedule',
        element: <AddSchedule></AddSchedule>
      },
      {
        path:'/all-schedule',
        element:<AllSchedule></AllSchedule>,
        loader:()=>fetch('http://localhost:5000/schedule')
      },
      {
        path:'/sign-up',

        element:<SignUp></SignUp>
      },
    
      {
        path:'/sign-in',
        element:<SignIn></SignIn>
      },
      {
        path:'/update/:id',
        element:<UpdateSchedule></UpdateSchedule>,
        loader:({params})=> fetch(`http://localhost:5000/schedule/${params.id}`)
              }
    ]
    
  },
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)

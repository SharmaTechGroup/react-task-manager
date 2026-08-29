import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { TaskManagerHome } from "../components/task-manager-home";
import { UserLogin } from "../components/user-login";
import { UserDashboard } from "../components/user-dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <TaskManagerHome />
            },
            {
                path:'login',
                element: <UserLogin width='w-25' />
            }
        ]
    },
    {
        path:'dashboard',
        element: <UserDashboard />
    }
])

export default router;
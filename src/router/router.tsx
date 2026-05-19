import { createBrowserRouter } from "react-router";
import App from "../App";
import { Login } from "../feature/Auth/Login";
import { AuthRouter } from "./AuthRouter";
import { ErrorPage } from "./ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <AuthRouter>
        <App />
      </AuthRouter>
    ),
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <Login />,
  },
]);

import { createBrowserRouter } from "react-router";
import App from "../App";
import { Login } from "../feature/Auth/Login";
import { Register } from "../feature/Auth/Register";
import { AuthRouter } from "./AuthRouter";
import { ErrorPage } from "./ErrorPage";
import { WishBookPage } from "@/feature/wishBook/WishBookPage";
import { OwnedBookPage } from "@/feature/ownedBook/OwnedBookPage";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: (
      <AuthRouter>
        <App />
      </AuthRouter>
    ),
    children: [
      {
        path: "/",
        element: <WishBookPage />,
      },
      {
        path: "/owned",
        element: <OwnedBookPage />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <Login />,
  },
  // {
  //   path: "/register",
  //   errorElement: <ErrorPage />,
  //   element: <Register />,
  // },
]);

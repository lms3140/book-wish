import { OwnedBookPage } from "@/feature/ownedBook/OwnedBookPage";
import { WishBookPage } from "@/feature/wishBook/WishBookPage";
import { createBrowserRouter } from "react-router";
import App from "../App";
import { Login } from "../feature/Auth/Login";
import { AuthRouter } from "./AuthRouter";
import { ErrorPage } from "./ErrorPage";
import { ChartPage } from "@/feature/Chart/ChartPage";

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
      {
        path: "/chart",
        errorElement: <ErrorPage />,
        element: <ChartPage />,
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

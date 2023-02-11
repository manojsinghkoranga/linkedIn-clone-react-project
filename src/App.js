import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Home from "./pages/Home";
import ProtectedRoute from "./shared/components/ProtectedRoute";

import "./services/firebase/initialize";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase/initialize";
import { logUserIn, logUserOut } from "./redux/slices/authSlice";
import UserInfoEdit from "./pages/User/UserInfoEdit";
import { getImageUrl } from "./services/firebase/user-image";
import { getUser } from "./services/firebase/user";
import { resetUserInfo, setUserInfo } from "./redux/slices/userInfoSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/:userId",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/:userId/edit",
    element: (
      <ProtectedRoute>
        <UserInfoEdit />
      </ProtectedRoute>
    )
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAuthChange = async (user) => {
      if (user) {
        let url = null;
        try{
          const geturl = await getImageUrl(user.uid);
          url = geturl
        }catch(error){
          console.log(error);
        }
        
        const userInfo = await getUser(user.uid);
        const setUserAction = setUserInfo({firstName: userInfo.firstName, lastName: userInfo.lastName, imageUrl: url});
        dispatch(setUserAction);
        const logInAction = logUserIn({ email: user.email, userId: user.uid });
        dispatch(logInAction);
        return;
      }
      
      dispatch(resetUserInfo());
      dispatch(logUserOut());
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;

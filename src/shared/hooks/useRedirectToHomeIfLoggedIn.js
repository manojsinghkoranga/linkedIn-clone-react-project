import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRedirectToHomeIfLoggedIn = () => {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userId) {
      navigate("/");
    }
  }, [auth.userId, navigate]);
};

export default useRedirectToHomeIfLoggedIn;
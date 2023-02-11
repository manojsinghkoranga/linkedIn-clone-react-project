import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync } from "../../redux/slices/postSlice";

export const usePosts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync);
  }, [dispatch]);

  return posts;
};
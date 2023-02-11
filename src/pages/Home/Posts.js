import styled from "styled-components";
import { usePosts } from "./hooks";
import Post from "./Post";

const Posts = () => {
  const posts = usePosts();
  return (
    <PostsContainer >
      {posts.map((post) => (
        <PostDiv key={`div${post.id}`}>
          <Post
            key={`post${post.id}`}
            id={post.id}
            imageUrl={post.imageUrl}
            body={post.body}
            createdBy={post.createdBy}
            likes={post.likes}
            comments={post.comments}
          />
        </PostDiv>
      ))}
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const PostDiv = styled.div`
  width: 500px;
`;

export default Posts;
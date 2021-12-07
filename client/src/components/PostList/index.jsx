import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { fetchPosts } from '../../api/post';
import Post from './Post';
import { Row, Col } from 'reactstrap';

const PostList = () => {
  const [posts, setPosts] = useState([])
  console.log(posts);

  useEffect(() => {
    fetchPosts().then(res => {
      setPosts(res.data)
    })
  }, [])

  return (
    <>
      <Row>
        {posts.map((post) => (
          <Col key={post._id}  >
            <Post post={post} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default PostList
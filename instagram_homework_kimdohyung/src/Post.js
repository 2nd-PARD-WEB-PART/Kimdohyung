// Post.js
import React from 'react';
import styled from "styled-components";

function Post(props){
    return(
    <PostImages>
    <Images src={props.image1} />
    <Images src={props.image2} />
    <Images src={props.image3} />
    </PostImages>
    );
}

export default Post;

const Images = styled.img`
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
`;

const PostImages = styled.div`
    display: flex;
    flex-direction: row;
    height: 300px;
    justify-content: center;
    gap: 20px;
`
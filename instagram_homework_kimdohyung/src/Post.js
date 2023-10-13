// Post.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { UserStateContext } from './App';


function Post(){
    const { userState } = useContext(UserStateContext);

    return(
    <PostImages>
        <PostImage id={1} image = {userState.images[0]}/>
        <PostImage id={2} image = {userState.images[1]}/>
        <PostImage id={3} image = {userState.images[2]}/>
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
// const StyledNavLink = styled(NavLink)`
//   text-decoration: none !important;
//   outline: none !important;
//   border: none !important;
//   `;

const PostImage = ({id, image}) =>{
    return (
            <NavLink to={`/myPage/myBoard/${id}` }  >
            <Images src= {image} alt={`Image ${id}`} />
            </NavLink>
        
    );
}

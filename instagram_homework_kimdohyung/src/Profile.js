// Profile.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import optionImage from './Icons/Options.png';
import EditProfile from './EditProfile';
import { useState } from 'react';
import { ProfileContext } from './App';
import { UserStateContext } from './App';
import { NavLink } from 'react-router-dom';


const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  `;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;



const ProfileContainer = styled.div`
    display:flex;
    flex-direction: row;
    width: 935px;
    justify-content: start;
    align-items: center;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    padding: 70px 100px 75px 45px;
    width: 150px;
    height: 150px;
    justify-content: start;
    align-items: center;
`

const ProfileImage = styled.img`
    
    flex-shrink: 0;
    border-radius: 150px;
    width: 150px;
    height: 150px;
`;



const Headline = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    height: 40px;
    justify-content: start;
    gap: 20px;
    
`;

const MainText = styled.p`
    color: var(--Black, #262626);
    font-family: Abel;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 114.286% */
`;

const StateText = styled.p`
    color: var(--Black, #262626);
    font-family: Abel;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 112.5% */
`;

const ButtonText = styled.p`
    color: var(--Black, #262626);
    font-family: Abel;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 128.571% */
`;


const CommentText = styled.p`
    color: var(--Black, #262626);
    font-family: Abel;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
`;

const Comment = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
`;

const StateButtons = styled.div`
    display: flex;
    padding: 20px 0px 10px 0px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    gap: 10px;
    align-self: stretch;
    `;

const StateButton = styled.button`
    display: flex;
    padding: 0px;
    align-items: flex-start;
    background-color: white;
    border: none;

`;

const ProfileButton = styled.button`
    display: flex;
    padding: 6px 10px;
    align-items: center;
    gap: 10px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid var(--Border-Color, #DBDBDB);
    height: 40px;
    justify-content: center;
`;



function Profile(props){
    
    const {profile, setProfile} = useContext(ProfileContext);
    const {userState, setUserState} = useContext(UserStateContext);

    
  

    return(
        <ProfileContainer>
            <ProfileImageContainer>
                <ProfileImage src = {profile.imageUrl}>
                </ProfileImage>
            </ProfileImageContainer>
            
            <UserInfo>
                <Headline>
                    <MainText>
                        {profile.name}
                    </MainText>

                    <StyledNavLink 
            to ={`/myPage/editProfile`}>  

                        <ProfileButton>
                        <ButtonText >
                            프로필 편집
                        </ButtonText>
                    </ProfileButton>
            </StyledNavLink>

                    
                    <img src ={optionImage}/>
                </Headline>
                <StateButtons>
                    <StateButton>
                        <StateText>
                            게시물 {userState.boards}
                        </StateText>
                    </StateButton>
                    <StateButton>
                        <StateText>
                            팔로워 {userState.followers}
                        </StateText>
                    </StateButton>
                    <StateButton>
                        <StateText>
                            팔로우 {userState.follows}
                        </StateText>
                    </StateButton>
                </StateButtons>
                <Comment>
                    <CommentText>
                        {profile.text}
                    </CommentText>
                </Comment>
            </UserInfo>
        </ProfileContainer>
    );
}

export default Profile;





  
 


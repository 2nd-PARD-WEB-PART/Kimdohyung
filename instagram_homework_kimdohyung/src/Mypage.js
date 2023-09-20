// Mypage.js
import React from 'react';
import styled from "styled-components";
import Profile from './Profile';
import Post from './Post';
import logoImage from './Icons/Logo.png';
import menuImage from './Icons/Menu-Button.png';
import borderImage from './Icons/Border.png';
import postImage from './Icons/Posts.png';
import saveImage from './Icons/Save.png';
import taggedImage from './Icons/Tagged.png';

function Mypage(props){
    return(
    <Page> 
        <AppBar>
            <img src ={logoImage} className='appBarButton' />
            <img src ={menuImage} />    
        </AppBar>
        <Profile name ='kkdh1206' follows= '100' followers = '100' boards ='3'>
        </Profile>
        <img src= {borderImage}>
        </img>
    <Buttons>
    <Button>
        <img src= {postImage} /> 
        <ButtonText>
            게시물
        </ButtonText>
    </Button>
    <Button>
        <img src= {saveImage} /> 
        <ButtonText>
            저장됨
        </ButtonText>
    </Button>
    <Button>
        <img src= {taggedImage}/>
        <ButtonText>
            태그됨
        </ButtonText>
    </Button>
    </Buttons>,
    <Post 
    image1= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpu6vU-z76nkCjeTqAm5UirtDnlsGv8CIm0w&usqp=CAU'
    image2 ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpu6vU-z76nkCjeTqAm5UirtDnlsGv8CIm0w&usqp=CAU'
    image3 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpu6vU-z76nkCjeTqAm5UirtDnlsGv8CIm0w&usqp=CAU'>
    </Post>
    </Page>
    );
}

export default Mypage;

const Images = styled.img`
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
`;

const Page = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 935 px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 935px;
    height: 55px; 
`;


const Button = styled.div`
  display: flex;
  flex-direction: row;
  height: 53px;
  font-size: 12px;
  padding: 0px 30px 0px 30px; 
  align-items: center;
  justify-content: center;
  `;

const ButtonText = styled.p`
    color: var(--Black, #262626);
    font-family: Abel;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 150% */
    text-transform: uppercase;
    margin-left: 16px;`

const AppBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    align-self: stretch;
    padding: 10px 16px;
  ;`







// 뭔가 이런식으로 나눠가지고 div 기준으로 배열 방법을 가로로하면 Row
// 세로로하면 Column 이랑 유사한듯



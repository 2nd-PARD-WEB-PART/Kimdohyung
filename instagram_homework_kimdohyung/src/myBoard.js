import React, { useContext, useState } from 'react';
import styled from "styled-components";
import Profile from './Profile';
import logoImage from './Icons/Logo.png';
import menuImage from './Icons/Menu-Button.png';
import plusImage from './Icons/PlusButton.png';
import blackHomeImage from './Icons/BlackHome.png';
import moreImage from './Icons/More.png';
import { ProfileContext, UserStateContext } from './App';
import { useParams } from 'react-router-dom';
import emojiImage from './Icons/Emoji.png';
import heartImage from './Icons/ActivityFeed.png';
import redHeartImage from './Icons/Vector.jpg';
import chatImage from './Icons/Comment.png';
import sendImage from './Icons/SharePosts.png';
import saveImage from './Icons/Save.png';
import smallHeartImage from './Icons/interface-favorite-heart.png';
import { Link } from 'react-router-dom';
import MediaQuery from'react-responsive';


function MyBoard(){
    const { userState } = useContext(UserStateContext);
    const { profile } = useContext(ProfileContext);
    const { id } = useParams();
    const [like, setLike] = useState(14);  // 이러면 올때마다 초기화 되는 문제가 있다. 
    // 그 문제는 전역으로 board별로 만들면 처리가 가능하긴 할거 같지만 비효율적 -> 서버 연결시 서버에서 받는걸로 하자 
    const increment =()=>{
        setLike(like+1);
    }
    const decrement =()=>{
        setLike(like-1);
    }
    const [imageIndex, setImageIndex] = useState(0);
    const images = [  // 이미지 바꿔주는 용도
        heartImage,
        redHeartImage
        ];
    const changeImage = () => {
    setImageIndex((imageIndex + 1) % 2);
    };

    
       

    const heartClick = ()=>{ // 하트 누를때 동작하는 함수
        if(imageIndex==0){
            increment(); // 좋아요 증가
        }
        else{
            decrement(); // 좋아요 감소
        }
        changeImage();
    }
    

    const [text, setText] = useState('');

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    // 댓글 리스트 여러개 넣어줄려고 정의함
    const [commentList, setCommentList] = useState([]);
    const [commentImages, setCommentImages] = useState([]); // 각 댓글에 대한 이미지 인덱스

    // 위에 setCommentImages 는 배열로 잡아서 각각 setSmallImageIndex가 있는것이랑 동일
    // const [imageSmallIndex, setSmallImageIndex] = useState(0); ->  이건 하나만 되는것
    
    const smallImages = [  // 이미지 바꿔주는 용도
        smallHeartImage,
        redHeartImage 
    ];
    const changeSmallImage = (index) => {
       const updatedImages = [...commentImages]; // updatedImage 정의
       updatedImages[index] = (updatedImages[index]+1)%2; // index 에 해당한 놈 분류해서 index 놈만 바꿈
       setCommentImages(updatedImages); // 바꾼걸 반영
       };



    let commentText =commentList.map((value, key) => <TextTab key = {key}><div><NormalText >{profile.name}    {value}    </NormalText></div> <SmallImageIcon src={smallImages[commentImages[key]]} onClick={()=>changeSmallImage(key)}/></TextTab> );
    const postText = () => {
        // commentList.push(text); --> 그냥 push로 해주면 여기서는 인식을 못한다고 한다.
        setCommentList([...commentList, text]); // ... commentList 하면 모든 commentList의 요소 복사해서 가져옴
        setCommentImages([...commentImages, 0]); // 기존 댓글의 하트들과 새로운 댓글에 대한 이미지 인덱스를 0으로 초기화해서 추가
        setText('');
    };


    return(
        <Page>
            <MediaQuery minWidth={750}>
            <Page>
            <AppBarContainerShadow>
                <AppBarContainer>
                    <AppBar>
                    <Link to ="/myPage">
                    <img src ={logoImage} />
                    </Link>
                    <Search>
                        <SearchLetter>
                            검색
                        </SearchLetter>
                    </Search>
                    <img src ={menuImage} />  
                    </AppBar>
                </AppBarContainer>
            </AppBarContainerShadow>
            <Screen>
            <Listview>
                <Board>
                <BoardBar>
                    <ProfileImageDiv>
                        <ProfileImage src={profile.imageUrl}/>
                    </ProfileImageDiv>
                    <Name>{profile.name}</Name>
                    <More src={moreImage}></More>
                </BoardBar>
                    <BoardImage src={userState.images[id-1]}/>
                <BoardTabContainer>
                    <BoardTab>
                        <IconBox>
                            <Icon src={images[imageIndex]} onClick={heartClick} />
                                 {/* 바로 onClick 에 setLike(like+1)를 쓰면 selike가 비동기적으로 작동가능해서 안된다고함 */}
                            {/* setLike 함수로 like 조절하고 색도 바꾸기 */}
                            {/* 그리고 색 바뀐놈은 또 like 빼고 색도 흰색으로 반복 */}
                            <Icon src={chatImage}/>
                            <Icon src={sendImage}/>
                        </IconBox>
                    </BoardTab>
                    <IconBox>
                        <Icon  src={saveImage}/>
                    </IconBox>
                </BoardTabContainer>
                <TextTab>
                    <NormalText>
                        좋아요 {like}개
                    </NormalText>
                </TextTab>
                
                {commentText}

                <CommentTab>
                    <Emoji>
                        <Icon src= {emojiImage}/>
                    </Emoji>
                    <CommentInput value={text} onChange={handleInputChange} type='text' placeholder='댓글 달기...'/>
                    <PostButton onClick={postText}>
                        게시
                    </PostButton>
                </CommentTab>
                </Board>
            </Listview>
            <Tab>
                <ProfilesContainer>
                    <ProfileContainer>
                        <TabProfileImage src={profile.imageUrl}/>
                        <TabProfileName>{profile.name}</TabProfileName>
                    </ProfileContainer>
                </ProfilesContainer>
            </Tab>
            </Screen>
        </Page>
            </MediaQuery>
            <MediaQuery minWidth={450} maxWidth={750}>
            <Page>
            <AppBarContainerShadow>
                <AppBarContainer>
                    <AppBar>
                    <Link to ="/myPage">
                    <img src ={logoImage} />
                    </Link>
                    <Search>
                        <SearchLetter>
                            검색
                        </SearchLetter>
                    </Search>
                    <img src ={menuImage} />  
                    </AppBar>
                </AppBarContainer>
            </AppBarContainerShadow>
            <Screen>
            <Listview>
                <Board>
                <BoardBar>
                    <ProfileImageDiv>
                        <ProfileImage src={profile.imageUrl}/>
                    </ProfileImageDiv>
                    <Name>{profile.name}</Name>
                    <More src={moreImage}></More>
                </BoardBar>
                    <BoardImage src={userState.images[id-1]}/>
                <BoardTabContainer>
                    <BoardTab>
                        <IconBox>
                            <Icon src={images[imageIndex]} onClick={heartClick} />
                                 {/* 바로 onClick 에 setLike(like+1)를 쓰면 selike가 비동기적으로 작동가능해서 안된다고함 */}
                            {/* setLike 함수로 like 조절하고 색도 바꾸기 */}
                            {/* 그리고 색 바뀐놈은 또 like 빼고 색도 흰색으로 반복 */}
                            <Icon src={chatImage}/>
                            <Icon src={sendImage}/>
                        </IconBox>
                    </BoardTab>
                    <IconBox>
                        <Icon  src={saveImage}/>
                    </IconBox>
                </BoardTabContainer>
                <TextTab>
                    <NormalText>
                        좋아요 {like}개
                    </NormalText>
                </TextTab>
                
                {commentText}

                <CommentTab>
                    <Emoji>
                        <Icon src= {emojiImage}/>
                    </Emoji>
                    <CommentInput value={text} onChange={handleInputChange} type='text' placeholder='댓글 달기...'/>
                    <PostButton onClick={postText}>
                        게시
                    </PostButton>
                </CommentTab>
                </Board>
            </Listview>
            
            </Screen>
        </Page>
            </MediaQuery>


            <MediaQuery maxWidth={450}>
            <Page>
            <AppBarContainerShadow>
                <AppBarContainer>
                    <AppBar>
                    <Link to ="/myPage">
                    <img src ={logoImage} />
                    </Link>
                    <Search>
                        <SearchLetter>
                            검색
                        </SearchLetter>
                    </Search>
                    <img src ={menuImage} />  
                    </AppBar>
                </AppBarContainer>
            </AppBarContainerShadow>
            <Screen>
            <Listview>
                <Board>
                <BoardBar>
                    <ProfileImageDiv>
                        <ProfileImage src={profile.imageUrl}/>
                    </ProfileImageDiv>
                    <Name>{profile.name}</Name>
                    <More src={moreImage}></More>
                </BoardBar>
                    <BoardImage src={userState.images[id-1]}/>
                <BoardTabContainer>
                    <BoardTab>
                        <IconBox>
                            <Icon src={images[imageIndex]} onClick={heartClick} />
                                 {/* 바로 onClick 에 setLike(like+1)를 쓰면 selike가 비동기적으로 작동가능해서 안된다고함 */}
                            {/* setLike 함수로 like 조절하고 색도 바꾸기 */}
                            {/* 그리고 색 바뀐놈은 또 like 빼고 색도 흰색으로 반복 */}
                            <Icon src={chatImage}/>
                            <Icon src={sendImage}/>
                        </IconBox>
                    </BoardTab>
                    <IconBox>
                        <Icon  src={saveImage}/>
                    </IconBox>
                </BoardTabContainer>
                <TextTab>
                    <NormalText>
                        좋아요 {like}개
                    </NormalText>
                </TextTab>
                
                {commentText}

                <CommentTab>
                    <Emoji>
                        <Icon src= {emojiImage}/>
                    </Emoji>
                    <CommentInput value={text} onChange={handleInputChange} type='text' placeholder='댓글 달기...'/>
                    <PostButton onClick={postText}>
                        게시
                    </PostButton>
                </CommentTab>
                </Board>
            </Listview>
            
            </Screen>
            
            <NavigatorContainerShadow>
                <AppBarContainer>
                   <NavigatorBar>
                    <Icon src={blackHomeImage}/>
                    <Icon src={plusImage}/>
                    <Icon src={profile.imageUrl}/>
                   </NavigatorBar>
                </AppBarContainer>
            </NavigatorContainerShadow>
        </Page>
            </MediaQuery>


        </Page>
        
        
    );
}


export default MyBoard;

const SmallImageIcon = styled.img`
width: 13px;
height: 13px;
flex-shrink: 0;
margin-right: 30px;
`;

const CommentTab = styled.div`
height: 40px;
width: 614px;  // 이렇게 일일히 처리하지 말고 부모 width 따라가면 더 좋을거 같은데...
display: flex;
flex-direction: row;
border: 1px solid var(--Border-Color, #DBDBDB);
justify-content: start;
align-items: center;
background-color: white;
`;

const CommentInput = styled.input`
display: flex;
height: 30px;
width: 80%;
align-items: flex-start;
gap: 10px;
flex-shrink: 0;
color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Noto Sans KR;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
text-transform: lowercase;
border: none;  // focus 시에도 제거하면 더 좋을듯...

`;

const PostButton = styled.button`
margin-left: 5px;
color: #0095F6;
font-family: Noto Sans KR;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
text-transform: capitalize;
background-color: white;
border: none;
`;

const Emoji = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 56px;
height: 30px;
`;

const TextTab = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-bottom: 20px;
background-color: white;
padding-left: 15px;
width: 600px;
height: 27px;

`;
const NormalText = styled.p`
white-space: pre;
color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Noto Sans KR;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 18px; /* 128.571% */
text-transform: lowercase;

`;

const IconBox = styled.div`
width: 40px;
height: 40px;
display: flex;
padding: 8px;
align-items: flex-start;
gap: 10px;
`;

const Icon = styled.img`
width: 24px;
height: 24px;
`;

const BoardTab = styled.div`
display: flex;
flex-direction: row;
width: 120px;
height: 40px;
justify-content: start;
`;

const BoardTabContainer = styled.div`
display: inline-flex;
padding: 6px 16px 0px 16px;
justify-content: center;
align-items: center;
gap: 406px;
background-color: white;
`;

const TabProfileImage = styled.img`
   border-radius: 56px;
   width: 56px;
height: 56px;
flex-shrink: 0;
justify-content: center;
align-items: center;
`;
const TabProfileName = styled.p`
color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Noto Sans KR;
font-size: 13px;
font-style: normal;
font-weight: 600;
line-height: 18px; /* 138.462% */
text-transform: lowercase;
margin-left: 24px;
margin-top: 6px;
`;

const ProfilesContainer = styled.div`
display: flex;
padding: 78px 0px 10px 0px;
flex-direction: column;
align-items: flex-start;
gap: 10px;

`;

const ProfileContainer = styled.div`
width: 293px;
height: 56px;
display: flex;
flex-direction: row;
justify-content: start;
align-items: start;
`;

const SearchLetter = styled.p`
color: #8E8E8E;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 18px;
`;

const Search = styled.div`
display: flex;
width: 215px;
height: 28px;
padding: 2px 72px 2px 71px;
justify-content: center;
align-items: center;
border-radius: 3px;
border: 1px solid var(--Border-Color, #DBDBDB);
background: #EFEFEF;
margin-left: 257px;
margin-right: 160px;
`;

const Tab = styled.div`
display: flex;
width: 293px;
height: 1059.845px;
padding-bottom: 0px;
flex-direction: column;
align-items: flex-start;
flex-shrink: 0;
background: var(--Dark-white, #FAFAFA);
`;

const Screen = styled.div`
display: flex;
flex-direction: row;
width: 935px;
height: 1080px;
padding-top: 20px;
justify-content: center;
align-items: start;
flex-shrink: 0;
`;

const More = styled.img`
display: inline-flex;
flex-direction: column;
align-items: flex-start;
`;

const ProfileImageDiv = styled.div`
display: flex;
flex-direction: column;
width: 50px;
height: 50px;
margin-left: 15px;
flex-shrink: 0;
background-image: url('https://i.ibb.co/wMQByMX/Ellipse-2.png');
background-size: 100%;
justify-content: center;
align-items: center;

`;

const ProfileImage = styled.img`
   border-radius: 46px;
   width: 37px;
height: 37px;
flex-shrink: 0;
justify-content: center;
align-items: center;
`;


const Name = styled.p`
color: #000;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Noto Sans KR;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 18px; /* 128.571% */
text-transform: lowercase; 
margin-right: 430px;`;


const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
height: 100%;
background-color: #FAFAFA ;
`;

const Board = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;
width: 642px;
height: 910px;
flex-shrink: 0;
padding-right: 28px;
`
const BoardBar = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: start;
gap: 10px;
background-color: white;
width:614px;
height: 60px;
`

const BoardImage = styled.img`
    display: flex;
width: 614px;
height: 614px;
justify-content: center;
align-items: center;
flex-shrink: 0;
margin: 0px;
`

const AppBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    align-self: stretch;
    padding: 10px 16px;
  ;`

const NavigatorBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    width: 100%;
    gap: 200px;
  ;`

const Listview = styled.div`
display: flex;
flex-direction: column;
width: 642px;
height: 1080px;
padding-top: 20px;
justify-content: center;
align-items: center;
flex-shrink: 0;
background: var(--Dark-white, #FAFAFA);
`

const AppBarContainerShadow = styled.div`
display: flex;
width: 100%;
height: 53px;
padding: 0px 0px 0px 0px;
flex-direction: column;
justify-content: start;
align-items: center;
flex-shrink: 0;
background: var(--Dark-white, #FAFAFA);
;`
const NavigatorContainerShadow = styled.div`
display: flex;
width: 100%;
height: 53px;
padding: 0px 0px 0px 0px;
flex-direction: column;
justify-content: end;
align-items: center;
flex-shrink: 0;
background: var(--Dark-white, #FAFAFA);
;`

const AppBarContainer = styled.div`
display: flex;
width: 100%;
height: 50px;
padding: 0px 0px 0px 0px;
justify-content: center;
align-items: center;
flex-shrink: 0;
background-color: white;
;`

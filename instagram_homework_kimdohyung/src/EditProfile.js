import React, { useContext, useState, useRef} from 'react';
import styled from "styled-components";
import logoImage from './Icons/Logo.png';
import homeImage from './Icons/home.png';
import menuImage from './Icons/noHome.png';
import textImage from './Icons/text.png';
import { ProfileContext } from './App';
import { Link } from 'react-router-dom';


function EditProfile(){
    const {profile, setProfile} = useContext(ProfileContext); // useContext는 중괄호로 묶어야 문제없고 대괄호는 에러뜸
    
    const fileInputRef = useRef(null);
    const [inputValue, setInputValue] = useState(
        profile
    );
    const [imageUrl, setImageUrl] = useState(inputValue.imageUrl); // useState는 앞에 중괄호로 묶으니까 사진이 안뜸 대괄호는 뜸

    const handleInputChange = (event) => { // 값이 변하면 setInputvalue호출
        const {name, value} = event.target;
        setInputValue({
            name: inputValue.name ,
            imageUrl :inputValue.imageUrl,
            text: inputValue.text,
            web: inputValue.web,
            gender: inputValue.gender,
            email: inputValue.email,
            [name]: value  
            // 이렇게 위에 나머지 값들을 계속 저장해주고 마지막에 바뀐값 하나만 반영하면 원래게 위에 정의 되있어도 밑에서 수정됨
            }); 
      };

    const changeProfile = ()=> { 
        if(inputValue===profile){
        }
        else{
        setProfile(inputValue);
        alert("정보가 수정되었습니다.");
    }}

    const handleImageChangeClick = () => { // 만약 useRef를 사용하는게 여러개라면 이 함수의 매개변수에 index 변수(사용할때 map으로 index로 나눠주고 button에서도 받음)를 써서 받아야함
        fileInputRef.current.click();
    };

    const handleImageChange = (event) =>  {
        const file = event.target.files[0]; // 꼭 이렇게 list 형식으로 받아야 하는듯 아님  오류남!!
        
        if (file) {
            const fileUrl = URL.createObjectURL(file); // 내부 파일 인터넷에 업로드해서 주소 쓸수 있게 하는듯
            setImageUrl (fileUrl);
            setInputValue((prevInputValue) => ({
                ...prevInputValue, // 기존 inputValue를 복사
                imageUrl: fileUrl, // imageUrl만 변경
            }));
            
            
        }
        
        
        
    }

    // const handleCustomButtonClick = () => {
    //     // 사용자 지정 버튼을 클릭하면 실제 파일 선택(input) 버튼을 클릭합니다.
    //     if (fileInputRef.current) {
    //       fileInputRef.current.click();
    //     }
    //   };

    //   const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setInputValue({
    //         name: inputValue.name ,
    //         imageUrl :file.,
    //         text: inputValue.text,
    //         web: inputValue.web,
    //         gender: inputValue.gender,
    //         email: inputValue.email,
            
    //   })};




    return(
        <Page>
            <AppBarContainer>
            <AppBar>
            <img src ={logoImage} className='appBarButton' />
            <Link to ="/myPage">
            <img src ={homeImage}/>
            </Link>
            
            <img src ={menuImage} />
            </AppBar>
            </AppBarContainer>
            <Box>
                <Tab>
                    <div>
                    <HgihTab><TabText>프로필 편집</TabText></HgihTab>
                    <HgihTab><TabText>비밀번호 변경</TabText></HgihTab>
                    </div>
                    <LowTab><TabImage src={textImage}></TabImage></LowTab>
                </Tab>
                <Main>
                    <Head>
                        <ProfileImage src={imageUrl}></ProfileImage>
                        <ProfileContainer>
                            <Name>{profile.name}</Name>
                            <ImageChange onClick={handleImageChangeClick}> 
                                프로필 사진 변경
                                <input onChange={handleImageChange} type="file" accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                />
                            </ImageChange>
                        </ProfileContainer>
                    </Head>
                    <InputContaioner>사용자 이름 <Input type='text' name='name' value={inputValue.name} onChange={handleInputChange}></Input></InputContaioner>
                    <InputContaioner>소개 <Input type='text' name='text' value={inputValue.text} onChange={handleInputChange}></Input></InputContaioner>
                    <InputContaioner>웹 사이트 <Input type='text' name='web' value={inputValue.web} onChange={handleInputChange}></Input></InputContaioner>
                    <InputContaioner>이메일 <Input type='text' name='email' value={inputValue.email} onChange={handleInputChange}></Input></InputContaioner>
                    <InputContaioner>성별 <Input type='text' name='gender' value={inputValue.gender} onChange={handleInputChange}></Input></InputContaioner>
                    <Submit onClick={changeProfile}> <Text>제출</Text></Submit>
                    {/* 위와 같이 namd을 이용해서 구분해서 각각 따로 넣어준다  
                    이때 name은 실제 이름과 같아야지 json형태의 파일에서 앞에 속성값이 name으로 들어갈때 정확히 들어가서 정확히 저장됨 */}
                </Main>

            </Box>


        </Page>
    );
}


const Text = styled.p`
color: #FFF;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin: 0px;
`;



const Name = styled.p`
color: #262626;
font-family: Roboto;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
padding:0px;
margin: 0px;
`;

const ImageChange = styled.button`
color: #0095F6;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: normal;
border: none;
background-color: white;
padding-left:0px;
margin-left: 0px;
`;

const ProfileImage = styled.img`
    width: 38px;
height: 38px;
flex-shrink: 0;
border-radius: 22px;
margin-right: 30px;
`;
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

`;

const TabText = styled.p`
color: #000;
font-family: Roboto;
font-size: 16px;
font-style: normal;
font-weight: 540;
line-height: normal;
`;

const Submit = styled.button`
    background-color: #0095F6;
    width: 60px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 4px;
    margin: auto;
    border: none;
`;

const Main = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin: auto;
    width: 700 px;
    height: 650px;
    background-color: white;
`;
const Head = styled.div`
display: flex; 
flex-direction: row;
justify-content: center;
align-items: center;
margin: auto;
width: 700 px;
height: 40px;
`;

const InputContaioner = styled.div`
display: flex; 
flex-direction: row;
justify-content: center;
align-items: center;
width: 700px;
height: 40px;
margin: auto;

`;

const Input = styled.input`
margin-left: 30px;
width: 355px;
height: 32px;
flex-shrink: 0;
border-radius: 2px;
border: 1px solid #EFEFEF;
background: #FFF;
`

const Box = styled.div`
    margin-top: 30px;
    display: flex; 
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 920px;
    height: 650px;
    background-color: #F9F9F9;
`;

const Tab = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 218px;
    height: 650px;
    background-color: white;
    margin-right: 2px;
    
`;
const HgihTab = styled.div`
display: flex; 
flex-direction: column;
justify-content: start;
align-items: center;
width: 220 px;
height: 55px;
`;

const LowTab = styled.div`
display: flex; 
flex-direction: column;
justify-content: center;
align-items: center;
width: 220 px;
height: 240px;
margin-top: 300px;
`;
const TabImage = styled.img`
width: 165px;
`;

const Page = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1440px;
    height: max-content;
    background-color: #F9F9F9;
`;


const AppBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    padding: 10px 16px;
  ;`

const AppBarContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 60px;
background-color: white;

;`

export default EditProfile;
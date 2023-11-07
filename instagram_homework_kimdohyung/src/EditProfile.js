import React, { useContext, useState, useRef, useEffect} from 'react';
import styled from "styled-components";
import logoImage from './Icons/Logo.png';
import homeImage from './Icons/home.png';
import menuImage from './Icons/noHome.png';
import textImage from './Icons/text.png';
import { ProfileContext } from './App';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditProfile(){
    const {profile, setProfile} = useContext(ProfileContext); // useContext는 중괄호로 묶어야 문제없고 대괄호는 에러뜸
    
    const fileInputRef = useRef(null); // DOM 요소에 접근 가능
    const [inputValue, setInputValue] = useState({
        name: localStorage.getItem('userName') ,  
        imageUrl :localStorage.getItem('userImage'),
        text: profile.text,
        web: profile.web,
        gender: profile.gender,
        email: profile.email,
        age: localStorage.getItem('userAge'),
        part: localStorage.getItem('userPart')
    }
    );
    const [imageUrl, setImageUrl] = useState(inputValue.imageUrl); // useState는 앞에 중괄호로 묶으니까 사진이 안뜸 대괄호는 뜸

    const[able, setAble] = useState(
        true
    );

    // let updatedImageUrl; // 이미지 변경해도 setImage 보다 서버로 전송되는게 빨라서 어쩔수 없이 보안 문제 생길지도 모르지만 이렇게 만듬 일단
    // 이유는 모르겠는데 서버로 보내는 함수안에서 undefined 라고 떠버림

    // useEffect(()=>{},[able]);

    const handleInputChange = async (event) => { // 값이 변하면 setInputvalue호출
        const {name, value} = event.target;
        setInputValue({
            name: inputValue.name ,  // 여기 있는놈들은 [name]: value 만하면 이전꺼가 다 지워지게 되버려서그럼
            imageUrl :inputValue.imageUrl,
            text: inputValue.text,
            web: inputValue.web,
            gender: inputValue.gender,
            email: inputValue.email,
            age: inputValue.age,
            part: inputValue.part,
            [name]: value  
            
            // 이렇게 위에 나머지 값들을 계속 저장해주고 마지막에 바뀐값 하나만 반영하면 원래게 위에 정의 되있어도 밑에서 수정됨
            }
            );

            await setAble(false); // 그냥 바로 동작하게 바꿈 --> 근데 이 함수 자체가 비동기 함수가 아니라서 의미가 없다 await 가
            
            // if(event.target.value===profile){
            //      await setAble(true); // 원래 이렇게 하면 바로 랜더링 되야하지만 바로 효율성을 위해서 바로 안하는 경우가 존재
            // // 그래서 useEffect를 이럴때 사용해도 잘 안되서 비동기를 사용하니 되었다.
            // }
            // else{
            //     await setAble(false);
            // } 
            //  // 이러면 able 바뀔때마다 랜더링됨
      };
   
    const changeProfile = async()=> { 
        
        setProfile(inputValue);  // 여긷도 setProfile은 동기함수라 await 는 의미가 없다

        // console.log(inputValue.imgURL, "확인 ㄱㄱ");
        // console.log("Wls", updatedImageUrl);
        // let Image = await updatedImageUrl;
        const data = await {
            // "name": profile.name,  --> 이렇게 처리를 안정적이게 하고 싶으면 setProfile 을 비동기 함수로 만들어줘서
            // "age": profile.age,
            // "part": profile.part,
            // "imgURL": profile.imageurl
            
            "name": inputValue.name,
            "age": inputValue.age,
            "part": inputValue.part,
            "imgURL":  localStorage.getItem('ImageUrl') // 전역변수임 이미지 바뀐게 여기 저장되있음
          };
          
          try {
            const response = await axios.patch(`http://3.35.236.83/pard/update/김도형`, data);
            
            console.log('API Response: ', response.data);
          } catch (error) {
            console.log('Error fetching notices: ', error);
          }
           
          

        alert("정보가 수정되었습니다.");
        await setAble(true);
        // useEffect(()=>{},[able]); // 이러면 able 바뀔때마다 랜더링됨 - 이건 이 함수 밖에 총 1번만 사용되있음
    }

    

    const handleImageChangeClick = () => { // 만약 useRef를 사용하는게 여러개라면 이 함수의 매개변수에 index 변수(사용할때 map으로 index로 나눠주고 button에서도 받음)를 써서 받아야함
        fileInputRef.current.click();
    };

    const handleImageChange = (event) =>  {
        // const file = event.target.files[0]; // 꼭 이렇게 list 형식으로 받아야 하는듯 아님  오류남!!
        // 기존 꺼는 비주얼 스튜디오에서 제공해주는 서버라 이렇게 보냈는데 파드 서버에 보낼려고 수정함

        const formData = new FormData();
        formData.append("image", event.target.files[0]); // image 인거 명시해줘서 JSON 으로 보낼라고 image 달아주는듯


        // if (file) {
        //     const fileUrl = URL.createObjectURL(file); // 내부 파일 인터넷에 업로드해서 주소 쓸수 있게 하는듯
        //     setImageUrl (fileUrl);
        //     setInputValue((prevInputValue) => ({
        //         ...prevInputValue, // 기존 inputValue를 복사
        //         imageUrl: fileUrl, // imageUrl만 변경
        //     }));
        axios
        .post("http://3.35.236.83/image", formData)
        .then((response) => {

            localStorage.setItem('ImageUrl',response.data) ; // 업데이트 이미지에 할당
            // console.log("찐", updatedImageUrl);

          console.log("이미지가 성공적으로 업로드되었습니다:", response.data);
          setImageUrl (response.data); // imageUrl 업데이트
            setInputValue((prevInputValue) => ({
                ...prevInputValue, // 기존 inputValue를 복사
                imageUrl: response.data, // imageUrl만 변경
            }));
            // console.log(inputValue.imageUrl);
            // console.log(imageUrl);
            // console.log(response.data);
          // 서버에서의 응답을 처리합니다.
          setAble(false); // 버튼 색 활성화
        })
        .catch((error) => {
          console.error("이미지 업로드 중 오류 발생:", error);
          // 오류를 처리합니다.
        });
    };
    
        
        
        
        
    

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
                            <Name>{localStorage.getItem('userName')}</Name>
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
                    <InputContaioner>나이 <Input type='text' name='age' value={inputValue.age} onChange={handleInputChange}></Input></InputContaioner>
                    <InputContaioner>파트 <Input type='text' name='part' value={inputValue.part} onChange={handleInputChange}></Input></InputContaioner>
                    
                    <Submit primary={able} onClick={changeProfile} disabled={able} > <Text>제출</Text></Submit>
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
    background-color: ${(props) => props.primary?   'gray':'#0095F6'};
    
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
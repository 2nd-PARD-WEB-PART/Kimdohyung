import './App.css';
import styled from 'styled-components';
import Mypage from './Mypage';
import { Route, Routes } from 'react-router-dom';
import EditProfile from './EditProfile';
import MyBoard from './myBoard';
import React,{createContext, useEffect, useState} from 'react';
import axios from 'axios';



const ProfileContext = createContext();
const UserStateContext = createContext();



function App() {

  const [profile, setProfile] =  useState ({
    
    name: "",  //  이 정보들도 get으로 받아와야함
    imageUrl :"https://i.ibb.co/LPK9dGH/image.png",
    text :'안녕하세요',
    web: '',
    gender: 'male',
    email: 'kkdh1206@gmail.com',
    age: "",
    part: ""
  });
  
  
  const [userState, setUserState] = useState({
    follows: '100' ,
    followers: '100' ,
    boards :'3',
    images : ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpu6vU-z76nkCjeTqAm5UirtDnlsGv8CIm0w&usqp=CAU',
            'https://t1.daumcdn.net/cfile/tistory/9906804C5FB7337315',
            'https://img.hani.co.kr/imgdb/original/2007/1227/68227042_20071227.jpg']
  
  })

  
  const getData = async()=>{
    
    try {
      const Axiosresponse = await axios.get('http://3.35.236.83/pard/search/김도형');
      
      const response = Axiosresponse.data;
      // console.log(response);
      // console.log(">>>>");
      setProfile({
        name: response.data.name,  //  이 정보들도 get으로 받아와야함
        imageUrl :response.data.imgURL,
        text :'안녕하세요',
        web: '',
        gender: 'male',
        email: 'kkdh1206@gmail.com',
        age: response.data.age,
        part: response.data.part
       })

       localStorage.setItem('userName', response.data.name);
       localStorage.setItem('userImage', response.data.imgURL);
       localStorage.setItem('userAge', response.data.age);
       localStorage.setItem('userPart', response.data.part);
      
    } catch (error) {
      console.log('Error fetching notices: ', error);
    }
  }

  useEffect(()=>{ // 한번만 수행 되기 위해서 이걸 둠
    getData();},[] // 배열 끝에 [] 없으면 랜더링이 될때마다 실행된다.
  );
 
  

  
  
  return (
    <div className="App">
      <ProfileContext.Provider value ={{ profile, setProfile}}>
      <UserStateContext.Provider value ={{ userState, setUserState}}>
      <Routes>
        <Route path='/' element = {<Mypage />}/>
        <Route path='/myPage' element = {<Mypage />}/>
        <Route path='/myPage/editProfile' element = {<EditProfile />}/>
        <Route path='/myPage/myBoard/:id' element = {<MyBoard />}/> 
        {/* 여기 :id 있는거에서 useParams로 id 가져옴 */}
      </Routes>
      </UserStateContext.Provider>
      </ProfileContext.Provider>
    </div>
  );
}

export default App;
export {ProfileContext};
export {UserStateContext};

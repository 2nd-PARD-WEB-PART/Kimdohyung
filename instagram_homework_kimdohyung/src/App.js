import './App.css';
import styled from 'styled-components';
import Mypage from './Mypage';
import { Route, Routes } from 'react-router-dom';
import EditProfile from './EditProfile';
import MyBoard from './myBoard';
import React,{createContext, useState} from 'react';


const ProfileContext = createContext();
const UserStateContext = createContext();

function App() {
  const [profile, setProfile] = useState({
    name:'kkdh1206' ,
    imageUrl :"https://i.ibb.co/LPK9dGH/image.png" ,
    text :'안녕하세요',
    web: '',
    gender: 'male',
    email: 'kkdh1206@gmail.com'
  });

  const [userState, setUserState] = useState({
    follows: '100' ,
    followers: '100' ,
    boards :'3',
    images : ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpu6vU-z76nkCjeTqAm5UirtDnlsGv8CIm0w&usqp=CAU',
            'https://t1.daumcdn.net/cfile/tistory/9906804C5FB7337315',
            'https://img.hani.co.kr/imgdb/original/2007/1227/68227042_20071227.jpg']

  })


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

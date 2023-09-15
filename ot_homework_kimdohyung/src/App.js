import image from './image.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className ='main-text'> 나를 소개합니다. </p>
 
        <p > 안녕하세요. 제 이름은 김도형입니다.</p>
        {/* 사진 */}
        <img src={image} className="App-image"  />
        
        

        {/* 글자 */}
        <p className ='title-text'> 이번학기 목표: 재밌고 알차게 한 학기 잘 보내기 </p>
        
        <p className ='title-text'> 좋아하는것 3가지</p>
        <p> 여행 다니기</p>
        <p> 기타 연주하기</p>
        <p> 그림 그리기</p>
        </header>
      
    </div>
  );
}

export default App;

import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("") 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const  response = await fetch("https://datasave.vercel.app/api/serverless" , {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ text : inputValue})
      });

      if(!response.ok){
        throw new Error("서버 응답 실패");
      }

      setMessage("데이터 저장 성공!");
    }catch(error){
      setMessage("네트워크 오류 : " + error.message);
    }

    setInputValue("");
  }

  return (
    <div>
      <h1>사용자 인풋 JSON에 저장하기</h1>

      <form onSubmit={(e) => handleSubmit(e, inputValue)}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter Some Data'
        />

        <button type='submit'>Send Data</button>
      </form>
    </div>
  )
}

export default App

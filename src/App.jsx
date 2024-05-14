import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import './index.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charShow, setCharShow] = useState(false);
  const [password, setPassword] = useState("");

  //use ref
  const passwordRef = useRef("null")

  const passwordGenertaor = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) {
      str += "0123456789";
      
      // console.log(str);
    }
   
    if (charShow) {
      str += "~!@#$%^&*()_+><`{}[]";
      // console.log(str);
    }
    console.log(str);
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, charShow, setPassword]);

  useEffect(() => {
    passwordGenertaor();
  }, [length, charShow, number, passwordGenertaor]);

  const copyPasswordRef = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 ,9);
    window.navigator.clipboard.writeText(password)
  } ,[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator
</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            name=""
            id=""
            value={password}
            placeholder="password"
            className="w-full py-1 px-3 outline-none"
            readOnly
            ref={passwordRef}
          />
          <button className="bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-violet-600" onClick={copyPasswordRef }>
            {" "}
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name=""
              id="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range"> Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id="check"
              checked={number}
              onChange={() => {
                setNumber((prev) =>!prev
                );
              }}
            />
            <label htmlFor="check">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id="check1"
              checked={charShow}
              onChange={() => {
                setCharShow((prev) => !prev
                );
              }}
            />
            <label htmlFor="check1">Special characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

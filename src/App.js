
import './App.css';
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
 
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  //  actually we are using use ref hook to highlight the copied portion so that person who copied will know that it is copied to clipboard
 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
   

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str[char];

    }
    setPassword(pass)
  }, [length, numberAllowed, setPassword])
  const copyPasswordToClipboard = useCallback(() => {
    
    passwordRef.current?.select();
    setTimeout(()=>{
      alert("Your password is copied to clipboard");
    },500);
    
    
    window.navigator.clipboard.writeText(password)
  }, [password])
 

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed])
  return ( 
    <>
    <h1>Random Password Generator</h1>
    <div class="card" style={{width:"60rem"}}>
  
  <div class="card-body">
    <div class="input-group mb-3">
  <input type="text" value={password} class="form-control" placeholder="Password" ref={passwordRef} aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button class="btn btn-primary" type="button" id="button-addon2"  onClick={copyPasswordToClipboard}>Copy</button>
  <div class="form-check">
  <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault" defaultChecked={numberAllowed}
         
          onChange={() => {
              setNumberAllowed((prev) => !prev);
              // this is just like toggling only if our prev is true we make it false if we wont do this then always it will be false
          }}  />
  <label > Numbers</label>
  </div>
  
  <div className="range">
  <input 
        type="range"
        min={6}
        max={100}
        value={length}
         onChange={(e) => {setLength(e.target.value)}}
        //  on changing this like moving the bar then length also should change
          />
           <label > Length: {length}</label>
           </div>
           </div>
  </div>
</div>
           </>
   
  );
}

export default App;


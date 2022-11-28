import React, {useState} from 'react';
import {SignUpFrom} from "./components/sign-up/SignUpFrom";
import {PersonalDataForm} from "./components/personalData/PersonalDataForm";
import {useAuth} from "./hooks/useAuth";

function App() {
    
    const [isLogged, setIsLogged] = useState<boolean>(false);
  
  return (
      <>
        { !isLogged && <SignUpFrom setIsLogged={setIsLogged} /> }
        { isLogged && <PersonalDataForm/> }
      </>
  );
}

export default App;

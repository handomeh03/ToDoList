import './App.css';
import ToDoApp from './ToDoApp';
import {uuid4} from "uuid4";
import { useState } from 'react';
import { Tcon } from './Context/TodoContext';
import { useContext } from 'react';
function App() {
  let [todo,settodo]=useState([{id:uuid4(),title:"ارض زيكولا",deta:"قراءة صفحتين ",iscomplete:false},{id:uuid4(),title:" زيكولا",deta:"قراءة صفحتين باليوم",iscomplete:false}]);
  return (
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"#ec407a",direction:"rtl"}}>
    <Tcon.Provider value={{todo,settodo}}>
    <ToDoApp/>
    </Tcon.Provider>
    </div>
  );
}

export default App;

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToDoComp from './ToDoComp';
import { useEffect, useMemo, useState,useRef } from 'react';
import {uuid4} from "uuid4";
import { Tcon } from './Context/TodoContext';
import { useContext } from 'react';
export default function ToDoApp(){
   let [input,setinput]=useState("");
   let {todo,settodo}=useContext(Tcon);
   const [state,setstate]=useState("all");
   const jojoj=useRef();
   const Completetodo=useMemo(()=>{
    todo.filter((t)=>{
      return t.iscomplete;
   })
   },[])
   const UNCompletetodo=useMemo(()=>{
    todo.filter((t)=>{
      return !t.iscomplete;
    })
   },[])
  

  let todorender=todo;
   if(state=="comp"){
       todorender=Completetodo;
   }
   else if(state=="uncomplete"){
    todorender=UNCompletetodo;
   }
   else{
    todorender=todo;
   }

   let todoList=todorender.map((e)=>{
    return(<ToDoComp key={e.id}  tododo={e}/>);
   });
   function add(){
    let newarr=[...todo,{id:uuid4(),title:input,deta:"",iscomplete:false}];
    settodo(newarr);
    localStorage.setItem("data",JSON.stringify(newarr));
    setinput("");
    jojoj.current.focus()

   }
   useEffect(()=>{
    let newarrr=JSON.parse(localStorage.getItem("data")) ?? [];
    settodo(newarrr);
   },[])
   function chnagestate(e){
    setstate(e.target.value);
   }
   
    return(
          <Container maxWidth="sm">
            <Card sx={{ minWidth: 275 }} >
          <CardContent>
        <Typography  style={{color:"#f06292"}} variant='h2'>
         مهمات  
        </Typography>
       <Divider style={{background:"#f06292"}}/>
       <ToggleButtonGroup
       value={state}
       exclusive
       onChange={chnagestate}
      aria-label="text alignment"
       style={{marginTop:"10px",direction:"ltr"}}
    
    >
      <ToggleButton style={{color:"white",background:"#f06292",border:"3px solid white",borderRadius:"10px"}} value="uncomplete">غير منجز</ToggleButton>
      <ToggleButton style={{color:"white",background:"#f06292",border:"3px solid white",borderRadius:"10px"}}  value="comp">منجز</ToggleButton>
      <ToggleButton style={{color:"white",background:"#f06292",border:"3px solid white",borderRadius:"10px"}}  value="all">الكل</ToggleButton>
    </ToggleButtonGroup>
      {todoList}
    <Grid container spacing={2} style={{marginTop:"10px"}}>
        <Grid item xs={8} >
        <TextField ref={jojoj} value={input} onChange={(e)=>{setinput(e.target.value)}} id="outlined-basic" label="عنوان" variant="outlined" style={{width:"100%",height:"100%"}} />
        </Grid>
        <Grid item xs={4} >
        <Button  onClick={add} style={{height:"100%",width:"90%",fontSize:"20px",background:"#f06292"}} variant="contained">اضافة</Button>
        </Grid>
       
      </Grid>
      </CardContent>
     
    </Card>
           </Container> 
    );
}
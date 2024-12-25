import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tcon } from './Context/TodoContext';
import { useContext, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
export default function ToDoComp({tododo}){
    let {todo,settodo}=useContext(Tcon);
    let[del,setdel]=useState(false);
    let [edits,setedits]=useState(false);
    let [input,setinput]=useState({input1:tododo.title,input2:tododo.deta});
    function change(){
        let newarr=todo.map((e)=>{
            if(e.id==tododo.id){
                if(e.iscomplete==true){
                    e.iscomplete=false;
                }
                else{
                    e.iscomplete=true;
                }
            }
            return e;
        })
        localStorage.setItem("data",JSON.stringify(newarr));
        settodo(newarr);
    }
    function deletee(){
        let newarr=todo.filter((e)=>{
            if(e.id==tododo.id){
                return false;
            }
            else{
                return true;
            }
        })
        localStorage.setItem("data",JSON.stringify(newarr));
        settodo(newarr);
    }
    function Edit(){
        let newarr=todo.map((e)=>{
            if(e.id==tododo.id){
                return {id:e.id,title:input.input1,deta:input.input2,iscomplete:e.iscomplete};
            }
            else{
                return e;
            }
        })
        localStorage.setItem("data",JSON.stringify(newarr));
        settodo(newarr);
        setedits(false);
    }
    return(
       <div>
         <Dialog
         style={{direction:"rtl"}}
         open={edits}
        //onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
    
          },
        }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText>
           اكتب عنوان المهمة الجديد وتفاصيلها
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="العنوان"
            value={input.input1}
            onChange={(e)=>{setinput({...input,input1:e.target.value})}}
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
         
            fullWidth
            value={input.input2}
            onChange={(e)=>{setinput({...input,input2:e.target.value})}}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setedits(false)}}>غير موافق</Button>
          <Button onClick={Edit} type="submit">موافق</Button>
        </DialogActions>
      </Dialog>
          <Dialog
          onClick={()=>{setdel(false)}}
         open={del}
       // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{direction:"rtl"}}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setdel(false)}}>غير موافق</Button>
          <Button onClick={deletee}  autoFocus>
            موافق
          </Button>
        </DialogActions>
      </Dialog>
         <Card sx={{ minWidth: 275 }} style={{background:"#f06292",marginTop:"10px"}}>
      <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={8} style={{display:"flex",flexDirection:"column",justifyContent:"end",alignItems:"flex-start",padding:"3px"}}>
        <Typography gutterBottom variant='h4' style={{marginRight:"5px",color:"white"}}>
            {tododo.title}
        </Typography>
        <Typography gutterBottom variant='h5'style={{marginRight:"5px",color:"white"}}>
          {tododo.deta}
        </Typography>
        </Grid>
        <Grid item xs={4} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <IconButton onClick={change}  style={{background:tododo.iscomplete?"green":"white",border:"3px solid green",color:tododo.iscomplete?"white":"green"}}>
            <CheckIcon/>
          </IconButton>

          <IconButton onClick={()=>{setdel(true)}} style={{background:"white",border:"3px solid red",color:"red"}}>
            < DeleteOutlineOutlinedIcon/>
          </IconButton >   
          <IconButton onClick={()=>{setedits(true)}} style={{background:"white",border:"3px solid blue",color:"blue"}}>
          <EditOutlinedIcon/>
          </IconButton>
        </Grid>
       
      </Grid>
        <Typography variant="h5" component="div">
          
        </Typography>
        
      </CardContent>
    </Card>
       </div>
    );
}
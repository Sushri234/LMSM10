import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './db.css';


const Goals = () => {
let navigate = useNavigate();

useEffect(() => {
    try {
        var auth = localStorage.getItem('email');
        if (auth === null) {
            navigate('./index');
        }
    } catch (error) {
        console.log(error);
    }
})
      
const [data,setData]=useState({ goal:"" ,id:"",achievement:"",eid:""})
const handleChange = (e)=>{setData({...data, [e.target.name]: e.target.value})}

const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
        eid: localStorage.getItem('empID'),
        boxlead: localStorage.getItem('BL'),
namee: localStorage.getItem('username'),
        goal: data.goal
    }
    setIsNModalOpen(false)

        axios.post('https://13.127.224.53/LMS/src/php/goals.php', sendData)
        .then((result) => {
            if (result.data['data']['State'] == 'Inserted') {
                // alert("Goal Added");
            } else {
                alert("Something Went Wrong");
            }
        })
}

const [goaldata, setGoaldata] = useState([]);
useEffect(() => {
    const fetchGoalData = async () => {
        var eid = localStorage.getItem('empID');
        axios.get('https://13.127.224.53/LMS/src/php/goalsres.php', {params: {empid: eid}})
            .then((result) => {
                    setGoaldata(result.data);
            })
            .catch(e => console.log(e));
    }
    fetchGoalData();
});
const gdata = Array.from(goaldata);

const [achivdata, setAchievements] = useState([]);
useEffect(() => {
    const fetchAchData = async () => {
    var eid = localStorage.getItem('empID');
    axios.get('https://13.127.224.53/LMS/src/php/achievements.php',{params:{empid:eid}})
    .then((result) =>{
        if(JSON.stringify(result.data) !== JSON.stringify(achivdata)) {
        setAchievements(result.data)
    }})
    .catch(e => console.log(e));
}
    fetchAchData()
});
const adata = Array.from(achivdata);

const edit = (e) =>{
    e.preventDefault();
    const sendData = {
          id:data.id,
          goal:data.goal,
          empid:localStorage.getItem('empID')       
        }
        setIsEModalOpen(false)
    axios.post('https://13.127.224.53/LMS/src/php/goaledit.php',sendData)
        .then((result) => {
          if(result.data['data']['Msg'] ==   'Edited'){
        //   alert("Goal Updated");
        }else{
          alert("Something went wrong");
        }})
};

const acc = (e) =>{
    e.preventDefault();
    const sendData = {
          id:data.id,
          eid:localStorage.getItem('empID'),
          achievement:data.achievement    
        }
        console.log(sendData)
        setIsAIModalOpen(false)
    axios.post('https://13.127.224.53/LMS/src/php/achievement.php',sendData)
        .then((result) => {
          if(result.data['data']['State'] ==   'Inserted'){
        //   alert("Goal Updated");
        }else{
          alert("Something went wrong");
        }})
};

const completed = (id) => {
    const sendData = {
        id:id      
    }

axios.post('https://13.127.224.53/LMS/src/php/goal2achiv.php', sendData)
        .then((result) => {
            if (result.data['data']['Msg'] == 'Completed') {
                alert("Moved to Achievements");
            } else {
                alert("Something went wrong");
            }
        })
};

const [teamdata, setTeamdata] = useState('');
useEffect(() => {
    if(localStorage.getItem('Role') == 2){
    var name = localStorage.getItem('username');
    axios.get('https://13.127.224.53/LMS/src/php/teamupdates.php',{params:{mname:name}})
    .then((result) =>{
        if(JSON.stringify(result.data) !== JSON.stringify(teamdata)) {
        setTeamdata(result.data)
    }})
    .catch(e => console.log(e));}
});
const Tdata = Array.from(teamdata);

const addreview = (e) => {
    e.preventDefault();
    const sendData = {
          id:data.id,
          review:data.review         
        }
        setIsRModalOpen(false)
        axios.post('https://13.127.224.53/LMS/src/php/addreview.php',sendData)
        .then((result) => {
          if(result.data['data']['Msg'] ==   'Inserted'){
          alert("Submitted Successfully");
        }else{
          alert("Something went wrong");
        }})
}

const [isNModalOpen, setIsNModalOpen] = useState(false);
const [isEModalOpen, setIsEModalOpen] = useState(false);
const [isRModalOpen, setIsRModalOpen] = useState(false);
const [isAIModalOpen, setIsAIModalOpen] = useState(false);


return (
<div>
<div>
<h2>Goals</h2>
<table className="responsive-table">
    <thead>
        <tr>
            <td>ID</td>
            <td>Goal</td>
            <td>Accomplishments</td>
            <td>Update</td>
        </tr>
    </thead>
   <tbody>
        {gdata.map((goal) => (
        <tr key={goal.ID}>
            <td>{goal.ID}</td>
            <td>{goal.Goal}</td>
            <td>{goal.Achievement}</td>
            <td><a href="#" onClick={() => completed(goal.ID)} >Completed</a></td>
        </tr>))}
    </tbody>
</table>
<div>
    <a href="#" onClick={() => setIsNModalOpen(true)}>New Goal</a>
    {isNModalOpen && (
        <div>
        <form onSubmit={submitForm}>
        <textarea
            placeholder='Enter Your New Goal'
            type="text"
            name="goal"
            className="form-control"
            onChange={handleChange}
            value={data.goal}
            required="required"/>
        <br></br>
        <input type='submit' value='Add Goal'/>
    </form>
    </div>)}
</div>
<div>
    <a href="#" onClick={() => setIsEModalOpen(true)}>Edit Goal</a>
    {isEModalOpen && (
    <div>
        <form onSubmit={edit}>
            <textarea
                placeholder='Edit Your Goal'
                type="text"
                name="goal"
                className="form-control"
                onChange={handleChange}
                value={data.goal}
                required="required"/>
            <br></br>
            <input
                placeholder='Enter Goal ID'
                type="Number"
                name="id"
min='1'
                className="form-control"
                onChange={handleChange}
                value={data.id}
                required="required"/>
            <br></br>
            <input type='submit' value='Edit Goal'/>
        </form>
    </div>
    )}
</div>
<div>
    <a href="#" onClick={() => setIsAIModalOpen(true)}>Add/Edit Achievements</a>
    {isAIModalOpen && (
    <div>
        <form onSubmit={acc}>
            <textarea
                placeholder='Add Accomplishment'
                type="text"
                name="achievement"
                className="form-control"
                onChange={handleChange}
                value={data.achievement}
                required="required"/>
            <br></br>
            <input
                placeholder='Enter Goal ID'
                type="Number"
                name="id"
min='1'
                className="form-control"
                onChange={handleChange}
                value={data.id}
                required="required"/>
            <br></br>
            <input type='submit' value='Submit'/>
        </form>
    </div>
    )}
</div>
</div>



<h2>Completed Tasks</h2>
<table className="responsive-table">
    <thead>
        <tr>
            <td>ID</td>
            <td>Goal</td>
            <td>Comments</td>
        </tr>
    </thead>
    <tbody>
        {adata.map((achiv) => (
        <tr key={achiv.ID}>
            <td>{achiv.ID}</td>
            <td>{achiv.Goal}</td>
            <td>{achiv.Remarks}</td>
        </tr>))}
    </tbody>
</table>
{localStorage.getItem('Role') == 2 ? (
<div>
<h2>Team Updates</h2>
<table className="responsive-table">
    <thead>
        <tr>
        <td>ID</td>
<td>Name</td>
            <td>Employee ID</td>
            <td>Goal</td>
            <td>Achievement</td>
             <td>Review</td> 
        </tr>
    </thead>
    <tbody>
    {Tdata.map((tdata) => (
        <tr key={tdata.ID}>
            <td>{tdata.ID}</td>
<td>{tdata.ENAME}</td>
            <td>{tdata.EID}</td>
            <td>{tdata.Goal}</td>
            <td>{tdata.Achievement}</td>
            <td>{tdata.Remarks}</td>
            {/* <td><a href="#" onClick={() => addreview(tdata.ID)} >Add Review</a></td> */}
    </tr>))}
    </tbody>
</table>
<div>
    <a href="#" onClick={() => setIsRModalOpen(true)}>Add/Edit Review</a>
    {isRModalOpen && (
    <div>
    <form onSubmit={addreview}>
        <textarea
            placeholder='Your comments'
            type="text"
            name="review"
            className="form-control"
            onChange={handleChange}
            value={data.review}
            required="required"/>
        <br></br>
        <input
            placeholder='Enter ID'
            type="Number"
            name="id"
min='1'
            className="form-control"
            onChange={handleChange}
            value={data.id}
            required="required"/>
        <br></br>       
        <input type='submit' value='Submit'/>
    </form>
    </div>
    )}
</div>
</div>):null}
</div>
)}

export default Goals;
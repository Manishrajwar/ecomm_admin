import { useState } from "react";
import "./dashboard.css"
import { useNavigate } from "react-router-dom";


function Dashboard(){

  const navigate = useNavigate();
 
   const [formdata , setFormdata] = useState({
       email:"" , 
       password:""
   })

   const changeHandler = (e)=>{
     const {name , value} = e.target;
      setFormdata((prev)=>({
        ...prev , 
        [name]:value
      }))
   }

   const sendCall = async(e)=>{
      e.preventDefault();

      try {
         const response = await fetch('http://localhost:4000/api/v1/start', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formdata.email, password: formdata.password }),
          });

         const result = await response.json();

         console.log("rsut ",result);
   
         // Handle the response from the server
         if (response.ok) {
           console.log('Login successful:', result);
           // Do something with the result
         } else {
           console.error('Login failed:', result);
           // Handle the error
         }
       } catch (error) {
         console.error('Error:', error);
       }

   }



    
    return (


        <div className="w-full min-h-[100vh] bg-[#111827] dashwrap">

          <h2 className="text-white mx-auto ">Please read all the <span onClick={()=>navigate("/termAndCondition")} className="text-red-500 cursor-pointer">term and condition </span> before use.</h2>

          <div className="dashcont">
      

      <form onSubmit={sendCall}>
          <label >
            <p className="text-white">Enter you LinkedIn Email</p>
            <input type="email" name="email" required value={formdata.email} onChange={changeHandler} />
          </label>
          <label >
            <p  className="text-white">Enter you LinkedIn Password</p>
            <input type="password" name="password" required value={formdata.password} onChange={changeHandler}   />
          </label>

<br />
          <button type="submit"><span  className="">submit</span></button>
      </form>

            
      </div>

        </div>
    )
}
export default Dashboard;
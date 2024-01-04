import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage(){
  
  const navigate = useNavigate();

  
    const [formData , setFormData] = useState({
        email:"",
        password:""
     });

     const changeHandler =  (e)=>{
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
     }

    // Handle Form Submission
    const submitHandler =async (e) =>{

      e.preventDefault();
  
  
      const response = await fetch("http://localhost:4000/api/v1/adminLogin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // the body will send like this to backend
        body: JSON.stringify(formData),
      });
  
      const formattedResponse = await response.json();
     
      if(!formattedResponse.success){
      alert(formattedResponse.message);

      } else{
        toast.success(formattedResponse.message);
        localStorage.setItem("ecomm_token" , formattedResponse.token);
 navigate("/dashboard");
        
      }

    }

    return (
       
 <div className="w-full min-h-[100vh] bg-[#111827] flex flex-col items-center justify-center ">

 <h2 className="font-[600] text-[34px] text-white">Login </h2>

  <form onSubmit={submitHandler} class="max-w-sm mx-auto  w-full">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onChange={changeHandler} name="email" value={formData.email} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" value={formData.password} name="password" onChange={changeHandler} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

</div>


    )
}

export default LoginPage;
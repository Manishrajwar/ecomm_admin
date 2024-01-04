import {   useEffect, useState } from "react";
import toast from "react-hot-toast";

function CreateSubCategory({setSelectedItem ,updateSubCategoryId , token }){

  
     const [formData , setFormData] = useState({
        title:"" , 
        category:"",
        thumbnail:""
     })

     const [allCategory , setAllCategory] = useState([]);

        // Function to handle file selection
   const handleImageChange = (event) => {
    const file = event.target.files[0];
setFormData({
      ...formData,
      thumbnail: file
    });
  };

    const changeHandler =  (e)=>{
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
     }

     const fetchAllCategory = async()=>{
        try{
            const response = await fetch(`http://localhost:4000/api/v1/showAllCategory` , {
              method:"GET",
              headers: {
                "content-type": "application/json",
              },
            });
            const formattedResponse = await response.json();        
            if(formattedResponse.success){
                setAllCategory(formattedResponse?.data);
            }
            else{
                toast.error(formattedResponse?.message);
            }
           
          } catch(error){
            console.log(error);
            toast.error("something went wrong , please try again");
        }
     }

      const submitHandler = async()=>{
        const toastId = toast.loading("Loading...");

        try {
    
          const formToSendData = new FormData();
          formToSendData.append("thumbnail" , formData.thumbnail);
          formToSendData.append("title" , formData.title);
          formToSendData.append("categoryId" , formData.category);
    
          const response = await fetch( "http://localhost:4000/api/v1/createSubCategory", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // the body will send like this to backend
            body: formToSendData,
          });
      
          const formattedResponse = await response.json();
          if(formattedResponse.success){
          toast.success("Successfuly created");
          }
          else{
            toast.error(formattedResponse?.message)
          }
        } catch(error){
            console.log(error);
            toast.error("something went wrong , please try again")
        }

        toast.dismiss(toastId);
      }

      const updateHandler = async(e)=>{

        const toastId = toast.loading("Loading...");
      try {
    
        const formToSendData = new FormData();
        formToSendData.append("thumbnail" , formData.thumbnail);
        formToSendData.append("title" , formData.title);
        formToSendData.append("category" , formData.category);
    
        const response = await fetch( `http://localhost:4000/api/v1/updateSubCategory/${updateSubCategoryId}`, {
          method: "PUT",
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // the body will send like this to backend
          body: formToSendData,
        });
    
        const formattedResponse = await response.json();
    
  
      } catch (error) {
        console.log(`error in fetch api `, error);
        toast.error(error);
      }
    
      toast.dismiss(toastId);
    
     }

     useEffect(()=>{
        fetchAllCategory();
     },[])

    return (
        <div className="w-full flex flex-col gap-10  ">

        <h2 className="mx-auto text-white text-[34px] font-[600]">Sub Category</h2>
         
        <form onSubmit={(e)=>{
          e.preventDefault();
          updateSubCategoryId !== null?(updateHandler()):(submitHandler())
        }} class="max-w-sm mx-auto w-full ">
        
          <div class="mb-5">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title </label>
            <input type="text" value={formData.title} name="title" onChange={changeHandler}  id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Title" required />
          </div>

             <div className="my-2">
             <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category </label>
                <select required name="category" onChange={changeHandler}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="">
                    <option value="selectCategory" disabled selected>Select Category</option>
                    {
                        allCategory?.map((category )=>(
                            <option value={`${category?._id}`} key={category?._id}>{category?.title}</option>
                        ))
                    }
                </select>
             </div>
    
        {/* thumbnail */}
        <div className="mt-2">
            <label htmlFor="" className="text-white font-[600]">Choose Image:</label>
        
        <input
                type="file"
                accept="image/*" 

                onChange={handleImageChange}
                style={{ marginBottom: '10px' }}
                className="w-full bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            
        </div>
        
          <button type="submit" class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {
            updateSubCategoryId !== null ? "Update":"Submit"
          } </button>

        </form>
        
              </div>
    )
}

export default CreateSubCategory;
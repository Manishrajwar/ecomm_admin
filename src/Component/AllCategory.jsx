import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AllCategory({token , setSelectedItem ,setUpdateCategoryId ,updateCategoryId ,updateProductId ,setUpdateProductId}){

     const [allCategory , setAllCategory] = useState([]);



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
              setAllCategory(formattedResponse.data);
            }


          }catch (error) {
            console.log(`error in fetch api `, error);
          }  
      }

     useEffect(()=>{
    fetchAllCategory();
    if(updateCategoryId !== null){
        sessionStorage.removeItem("ecommAdmin_CategoryId");
        setUpdateCategoryId(null);
      }
    if(updateProductId !== null){
        sessionStorage.removeItem("ecommAdmin_productId");
        setUpdateProductId(null);
      }
     },[])

     const deleteCategory = async(categoryId)=>{
      const toastId = toast.loading("Loading...");
        try{
            const response = await fetch(`http://localhost:4000/api/v1//deleteCategory/${categoryId}` , {
                method:"DELETE",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${token}`,

                },
              });
              const formattedResponse = await response.json();


              if(formattedResponse.success){
               toast.success("successfully delete the category");
               fetchAllCategory();
              }
              else{
                toast.error(formattedResponse?.message);
              }
        } catch(error){
            console.log(error);
            toast.error(error);
        }
        toast.dismiss(toastId);
     }

    return (
        <div className="w-full flex flex-col gap-10">

        <h2 className="mx-auto text-white text-[34px] font-[600]">All Category</h2>


{
    allCategory?.length > 0 && 
    <div className="flex gap-5 flex-wrap justify-center">


<div class="relative overflow-x-auto">

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-8 py-3">
                    Category Name
                </th>
              
                <th scope="col" class="px-8 py-3">
                    Category Image
                </th>
                
               
                <th scope="col" class="px-8 py-3">
                    Update
                </th>
                <th scope="col" class="px-8 py-3">
                    Delete
                </th>
            </tr>
        </thead>



        <tbody>
        {
  allCategory.map((category , index)=>(
    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

    <th scope="row" class="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       {category?.title}
    </th>
   

    <td class="px-8 py-4">
       <img src={category?.images} className="max-w-[100px] max-h-[50px] mx-auto" alt="" />
    </td>

   
    <td class="px-8 py-4">
    <button type="button" onClick={()=>{
        sessionStorage.setItem("ecommAdmin_CategoryId" ,category?._id );
         setSelectedItem("createCategory")
    }} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>

    </td>

    <td class="px-8 py-4 ">
    <button onClick={()=>deleteCategory(category?._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </td>


</tr>

  ))
 }
           
        </tbody>

    </table>
</div>


    </div>
}
                  
              </div>
    )
}

export default AllCategory;
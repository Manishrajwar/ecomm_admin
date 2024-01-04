import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"


function CreateProduct({setSelectedItem , token ,setUpdateCategoryId ,updateCategoryId , updateProductId ,setUpdateProductId}){

 const [allCategory , setAllCategory]  = useState([]);

 const [chooseSubCat , setChooseSubCat] = useState([]);
    
    const [formData , setFormData]  = useState({
        title:"",
        thumbnail:"" , 
        description:"",
        price:"",
        category:"" , 
        subCategory:""

    })

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

     const fetchAllCategory=async()=>{
  
  
        const response = await fetch("http://localhost:4000/api/v1/showAllCategory", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
                  });
    
        const formattedResponse = await response.json();
       
        if(!formattedResponse.success){
        toast.error(formattedResponse.message);
  
        } else{
         
        setAllCategory(formattedResponse?.data);
        setChooseSubCat(formattedResponse?.data[0]?.subCategory);          
        }
     }
    
     const handleSelectChange = (event) => {
        // Update the category field in the formData state
        setFormData({
          ...formData,
          category: event.target.value
        });
      };

     const handleSubSelectChange = (event) => {
        // Update the category field in the formData state
        setFormData({
          ...formData,
          subCategory: event.target.value
        });
      };

    useEffect(()=>{
    
        fetchAllCategory();

        if(sessionStorage.getItem("ecommAdmin_productId")){
          setUpdateProductId(sessionStorage.getItem("ecommAdmin_productId"));
        }

        if(updateCategoryId !== null){
          sessionStorage.removeItem("ecommAdmin_CategoryId");
          setUpdateCategoryId(null);
        }

 },[])

 const fetchProductDetailById = async()=>{
  try{
    try{
      const response = await fetch(`http://localhost:4000/api/v1/getProductById/${updateProductId}` , {
        method:"GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedResponse = await response.json();
    
      if(formattedResponse.success){
        setFormData((prev) => ({
          ...prev, 
          title: formattedResponse?.data?.title, 
          thumbnail: formattedResponse?.data?.thumbnail,
          description: formattedResponse?.data?.description , 
          price: formattedResponse?.data?.price , 
          category: formattedResponse?.data?.category
        }));
      }
     
    }catch (error) {
      console.log(`error in fetch api `, error);
    }  

  } catch(error){

  }
 }

 useEffect(()=>{
       const foundObj = allCategory.find(obj => obj._id === formData.category);
       setChooseSubCat(foundObj?.subCategory);
 },[formData.category])


 useEffect(()=>{
  if(updateProductId){
   fetchProductDetailById();
  }
 },[updateProductId])


 // Handle Form Submission
 const submitHandler =async () =>{

  const loadingId = toast.loading("Loading...");

    try {

      const formToSendData = new FormData();
      formToSendData.append("thumbnail" , formData.thumbnail);
      formToSendData.append("title" , formData.title);
      formToSendData.append("price" , formData.price);
      formToSendData.append("description" , formData.description);
      formToSendData.append("subCategoryId" , formData.subCategory);


      const response = await fetch( "http://localhost:4000/api/v1/createProduct", {
        method: "POST",
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // the body will send like this to backend
        body: formToSendData,
      });
  
      const formattedResponse = await response.json();

      if(formattedResponse.success){
        toast.success("successfuly created the product");
      }
      else{
        toast.error(formattedResponse?.message);
      }
    } catch (error) {
      console.log(`error in fetch api `, error);
      toast.error(error);
    }

    toast.dismiss(loadingId);

  }

  const updateProductHandler = async()=>{
   

    const toastId = toast.loading("Loading...");
    try {

      const formToSendData = new FormData();
      formToSendData.append("thumbnail" , formData.thumbnail);
      formToSendData.append("title" , formData.title);
      formToSendData.append("price" , formData.price);
      formToSendData.append("description" , formData.description);
      formToSendData.append("category" , formData.category);


      const response = await fetch( `http://localhost:4000/api/v1/updateProduct/${updateProductId}`, {
        method: "PUT",
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // the body will send like this to backend
        body: formToSendData,
      });
  
      const formattedResponse = await response.json();


      if(formattedResponse.success){
        toast.success("successfuly updated the product");
                 setSelectedItem("products");
      }
      else{
        toast.error(formattedResponse?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  
    toast.dismiss(toastId);
  }

    return (
        <div className="w-full flex flex-col gap-10  ">

        <h2 className="mx-auto text-white text-[34px] font-[600]">Product</h2>
                        
        
        <form onSubmit={(e)=>{
          e.preventDefault();

          updateProductId !== null ? updateProductHandler(): submitHandler()
        }} class="max-w-sm mx-auto w-full ">
        
          <div class="mb-5">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input onChange={changeHandler} type="text" name="title" value={formData.title} id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
        
          <div class="mb-5">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input onChange={changeHandler} type="text" id="description" value={formData.description} name="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
        
          <div class="mb-5">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input onChange={changeHandler} type="number" id="price" name="price" value={formData.price} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
         
         {/* category */}
         <div>
         <label htmlFor="category" className="text-white font-[600] ">Choose a category:</label>
         
          <select  onChange={handleSelectChange}  id="category" className="w-full bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                <option value="" selected disabled>Select Category</option>
                {
                    allCategory?.length > 0 && 
                    allCategory.map((item)=>(
                        <option key={item._id}  value={item._id}>{item.title}</option>
                        
                    ))
                }
              </select>
        
              </div>

         {/* sub category */}
         <div className="my-5">
         <label htmlFor="category" className="text-white font-[600] ">Choose a Sub Category:</label>
         
          <select  onChange={handleSubSelectChange} value={formData.subCategory} name="subCategory" id="category" className="w-full bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                <option value="" selected disabled>Select Sub Category</option>
                {
                    chooseSubCat?.length > 0 && 
                    chooseSubCat.map((item)=>(
                        <option key={item._id}  value={item._id}>{item.title}</option>
                        
                    ))
                }
              </select>
        
              </div>
        
        {/* thumbnail */}
        <div className="mt-2">
            <label htmlFor="" className="text-white font-[600]">Choose Thumbnail:</label>
        
        <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                                style={{ marginBottom: '10px' }}
                className="w-full bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            
        </div>
        
          <button type="submit" class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{updateProductId !== null ?"Update":"Submit"}</button>

        </form>
        
            </div>
    )
}

export default CreateProduct;
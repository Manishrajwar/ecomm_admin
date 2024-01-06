import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AllProducts({ token ,setUpdateCategoryId ,updateCategoryId ,setSelectedItem ,updateProductId ,updateSubCategoryId ,setUpdateProductId ,setUpdateSubCategoryId}){

  const [formData , setFormData] = useState({
    category:"",
    subCategory:""
    
  })

   const [allCat, setAllCat] = useState(null);
   const [allSubCat , setAllSubCat] = useState(null);
   const [allProduct , setAllProduct] = useState([]);

   const handleCategoryChange = (event) => {
    // Update the category field in the formData state
    setFormData({
      ...formData,
      category: event.target.value
    });
  };

   const handleSubCategoryChange = (event) => {
    // Update the category field in the formData state
    setFormData({
      ...formData,
      subCategory: event.target.value
    });
  };

   
    const fetchAllCategory = async (e) => {
      try{

        const response = await fetch("http://localhost:4000/api/v1/showAllCategory", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
    
        const formattedResponse = await response.json();

          if(formattedResponse.success){
            setAllCat(formattedResponse?.data);
          }
          else{
            toast.error(formattedResponse?.message);
          }

      } catch(error){
        toast.error(error);
      }
         };

         const categorySetHandler = ()=>{
          if(formData.category === ""){
            formData.subCategory = "";
           }
         else { 
           const catId = allCat?.find((cat)=>cat?._id == formData?.category );
           formData.subCategory = catId?.subCategory[0]?._id;
           setAllSubCat(catId?.subCategory);
       
         }
         }

          useEffect(()=>{
               categorySetHandler();
                       },[formData.category])


      const productSetHandler = ()=>{
        if(formData.category !== ""){
          const catId = allCat?.find((cat)=>cat?._id == formData?.category);
const subCatId = catId?.subCategory?.find((subCat)=> subCat?._id == formData?.subCategory);
setAllProduct(subCatId?.products);

         }
      }


                       useEffect(()=>{
                        productSetHandler();
                       } , [formData.subCategory])


                      //  for delete product 
                       const deleteProductHandler =async (id) =>{

                        const toastId = toast.loading("Loading...");
                        try{
                            const response = await fetch(`http://localhost:4000/api/v1/deleteProduct/${id}` , {
                              method:"DELETE",
                              headers: {
                                "content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            });
                            const formattedResponse = await response.json();

                            if(formattedResponse.success){
                              toast.success("successfuly delete the product");
                              // fetchAllCategory();
                              // categorySetHandler();
                              // productSetHandler();
                            }
                            else{
                              
                              toast.error(formattedResponse?.message)
                            }
                            
                          }catch (error) {
                            console.log(`error in fetch api `, error);
                          }  
                          toast.dismiss(toastId);
                      
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

                        if(updateSubCategoryId !== null){
                          sessionStorage.removeItem("ecommAdmin_subCategoryId");
                          setUpdateSubCategoryId(null);
                        }
                 },[])

    return (
        <div className="w-full flex flex-col gap-10">

        <h2 className="mx-auto text-white text-[34px] font-[600]">My Products</h2>


            {/* category */}
         <div>
         <label htmlFor="category" className="text-white font-[600] ">Choose a category:</label>
         
          <select name="category" onChange={handleCategoryChange} value={formData.category}   id="category" className="w-[90%] bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                <option value="" selected disabled>Select Category</option>
               {
                allCat?.length > 0 && 
                allCat?.map((cat)=>(
                  <option value={cat?._id} key={cat?._id}>{cat?.title}</option>
                ))
               }
              </select>
        
              </div>

         {/* sub category */}
         <div className="my-5">
         <label htmlFor="category" className="text-white font-[600] ">Choose a Sub Category:</label>
         
          <select  name="subCategory" value={formData.subCategory} onChange={handleSubCategoryChange} id="category" className="w-[90%] bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                <option value="" selected  disabled>Select Sub Category</option>
                {
                  allSubCat?.length > 0 && 
                  allSubCat.map((subcat)=>(
                    <option value={subcat?._id} key={subcat?._id}>{subcat?.title}</option>
                  ))
                }
               
              </select>
        
              </div>
 
 {
    allProduct?.length > 0 ?
    <div className="flex gap-5 flex-wrap justify-center">

<div class="relative overflow-x-auto">

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Product Description
                </th>
              
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Thumbnail
                </th>
                <th scope="col" class="px-6 py-3">
                    Update
                </th>
                <th scope="col" class="px-6 py-3">
                    Delete
                </th>
            </tr>
        </thead>

        <tbody>
        {

  allProduct.map((product , index)=>(
    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       {product?.title}
    </th>
    <td class="px-6 py-4">
        {product?.description}
    </td>
   
    <td class="px-6 py-4">
        {product?.price}
    </td>
    <td class="px-6 py-4">
       <img src={product?.thumbnail} className="max-w-[100px] max-h-[50px]" alt="" />
    </td>
    <td class="px-6 py-4">
    <button onClick={()=>{
      sessionStorage.setItem("ecommAdmin_productId" ,product?._id );
      setSelectedItem("createProduct")

    }} type="button"  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>    </td>
    <td class="px-6 py-4">
    <button 
    onClick={()=>deleteProductHandler(product?._id)} 
    type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button> 
       </td>
</tr>

  ))
 }
   
        </tbody>
    </table>
</div>
    </div> :(
      <span className="text-white font-[600] mx-auto text-[32px]">No product found </span>
    )
} 
    </div>
    )
}

export default  AllProducts;









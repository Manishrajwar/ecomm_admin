import { useEffect, useState } from "react";

function AllProducts({ token ,setUpdateCategoryId ,updateCategoryId ,setSelectedItem ,updateProductId ,setUpdateProductId}){

    const [allProducts , setAllProducts] = useState([]); 


    const fetchAllProducts = async (e) => {
         
  
        const response = await fetch("http://localhost:4000/api/v1/fetchAllProducts", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
    
        const formattedResponse = await response.json();
       
        if(!formattedResponse.success){
        alert(formattedResponse.message);
  
        } else{
          console.log(formattedResponse);
          
          setAllProducts(formattedResponse?.allProducts);
        }
  
         };
  
         useEffect(()=>{

        fetchAllProducts();
        if(updateCategoryId !== null){
          sessionStorage.removeItem("ecommAdmin_CategoryId");
          setUpdateCategoryId(null);
        }

        if(updateProductId !== null){
          sessionStorage.removeItem("ecommAdmin_productId");
          setUpdateProductId(null);
        }
         },[])


          const deleteProductHandler =async (id) =>{
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
                  alert("successfuly delete the product");
                fetchAllProducts();
                }

              }catch (error) {
                console.log(`error in fetch api `, error);
              }  
          }

    return (
        <div className="w-full flex flex-col gap-10">

        <h2 className="mx-auto text-white text-[34px] font-[600]">My Products</h2>


{
    allProducts.length > 0 && 
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
                    Category
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
  allProducts.map((product , index)=>(
    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       {product?.title}
    </th>
    <td class="px-6 py-4">
        {product?.description}
    </td>
    <td class="px-6 py-4">
        {product?.category?.title}
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
    <button onClick={()=>deleteProductHandler(product?._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button> 
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

export default  AllProducts;
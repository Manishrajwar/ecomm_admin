import { useEffect, useState } from "react";

function AllProducts({ token}){

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
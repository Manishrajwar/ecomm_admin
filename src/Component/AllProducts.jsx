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

        {
            allProducts.map((product , index)=>(
                <div key={index} className="w-[300px]  bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500">
                     
                     <img src={product?.thumbnail} className="w-[200px] h-[200px] mx-auto" alt="" />

               <div className="py-2 px-3 flex flex-col gap-4">

                     <p className="text-white font-[600] text-[22px]">{product?.title}</p>
                     <p className="font-[500] text-[18px] text-white">Price: {product?.price}</p>

               </div>


  <div className="flex gap-2 py-4">

    <button onClick={()=>deleteProductHandler(product._id)} className="bg-red-200 text-red-600 px-8 py-3 rounded-lg font-[600] text-[20px]">Delete</button>

    <button className="bg-green-200 text-green-600 px-8 py-3 rounded-lg font-[600] text-[20px]">Update</button>



  </div>

                </div>
            ))
        }

    </div>
}
                  
              </div>
    )
}

export default  AllProducts;
import { useEffect, useState } from "react";

function AllUsers({ token ,setUpdateCategoryId ,updateCategoryId ,updateProductId ,setUpdateProductId}){

    const [users , setUsers] = useState([]);

    const fetchAllUsers = async()=>{
        try{
            const response = await fetch(`http://localhost:4000/api/v1/getAllUsers` , {
              method:"GET",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            const formattedResponse = await response.json();

            if(formattedResponse.success){
              setUsers(formattedResponse.data);
            }


          }catch (error) {
            console.log(`error in fetch api `, error);
          }  
    }

    useEffect(()=>{
     fetchAllUsers();
     if(updateCategoryId !== null){
      sessionStorage.removeItem("ecommAdmin_CategoryId");
      setUpdateCategoryId(null);
    }
     if(updateProductId !== null){
      sessionStorage.removeItem("ecommAdmin_productId");
      setUpdateProductId(null);
    }
    },[])

    return (
        <div className="w-full flex flex-col gap-10">

<h2 className="mx-auto text-white text-[34px] font-[600]">All Users Details</h2>

<table >
        <thead >
          <tr >
            <th className="font-[600] text-white ">Name</th>
            <th className="font-[600] text-white ">Contact Number</th>
            <th className="font-[600] text-white ">Email</th>
          </tr>
        </thead>
        <tbody >
          {users?.map((user) => (
            <tr key={user?.id} className="boder border-2  border-white">
              <td className="text-center text-gray-300">{user?.firstName} {user?.lastName}</td>
              <td className="text-center text-gray-300">{user?.phoneNumber}</td>
              <td className="text-center  text-gray-300">{user?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
    )
}

export default AllUsers;
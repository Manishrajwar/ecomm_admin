import { useEffect, useState } from "react";

function PaymentHistory({token}){

     const [allPayment , setAllPayment] = useState([]);


     const fetchAllPayments = async()=>{
        
 try{

    const response = await fetch( "http://localhost:4000/api/v1/payment/fetchAllPayments", {
        method: "GET",
        
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
  
      const formattedResponse = await response.json();

      if(formattedResponse.success){
        setAllPayment(formattedResponse?.allPayments);
      }

 }catch(error){
 console.log(error);
 alert("internal server error , please try again")
 }    }


      useEffect(()=>{
 fetchAllPayments();
      },[])


    return (
        <div className="w-full flex flex-col gap-10">

        <h2 className="mx-auto text-white text-[34px] font-[600]">Payment History</h2>

        {
            allPayment.length > 0 ?(
              
 

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    userName
                </th>
                {/* <th scope="col" class="px-6 py-3">
                    razorpaySignature
                </th> */}
                <th scope="col" class="px-6 py-3">
                razorpay_payment_id

                </th>
                <th scope="col" class="px-6 py-3">
                razorpay_order_id

                </th>
            </tr>
        </thead>
        <tbody>
            {
                allPayment.map((payment)=>(
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {payment?.user?.firstName} {payment?.user?.lastName}
                    </td>

                    {/* <td class="px-6 py-4">
                   {payment?.razorpay_signature}
                    </td> */}

                    <td class="px-6 py-4">
                    {payment?.razorpay_payment_id}

                    </td>

                    <td class="px-6 py-4">
                    {payment?.razorpay_order_id}

                    </td>
                    
                </tr>
           
                ))
            }
          
        </tbody>
    </table>

</div>
                ):(
                <span className="text-white font-[600] mx-auto text-[3rem]">no payment left </span>
            )
        }
                  


              </div>
    )
}
export default PaymentHistory;
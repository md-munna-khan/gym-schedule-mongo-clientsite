// import { useState } from "react";

// import { FiDelete } from "react-icons/fi";
// import { MdDone, MdOutlineDoneAll } from "react-icons/md";
// import { Link, useLoaderData } from "react-router-dom";
// import Swal from "sweetalert2";


// const AllSchedule = () => {
//     const data= useLoaderData()
// const [scheduleData,setScheduleDta]=useState(data)
//     const handleDelete = id=>{
//         console.log(id)
//         fetch(`http://localhost:5000/schedule/${id}`,
//            {
//             method:"DELETE"
//            })
//            .then(res=>res.json())
           
//        .then(data=>{
// if(data.deletedCount>0){

//     Swal.fire({
//         title: 'Item Deleted',
//         text: 'The schedule item has been deleted.',
//         icon: 'success',
//         confirmButtonText: 'OK'
//     });}


//     const remaining = scheduleData.filter(item=> item._id !== id)
//     setScheduleDta(remaining)
 

//        }) }
//        // status
//        const handleStatusUpdate = id=>{
//         console.log(id)
//         fetch(`http://localhost:5000/status/${id}`,
//            {
//             method:"PATCH"
//            })
//            .then(res=>res.json())
           
//        .then((result)=>{
//         const newData = scheduleData.map((schedule)=> schedule._id=== id?{...schedule,isCompleted:true}:schedule)
//         setScheduleDta(newData)
//        })
  
 
//           };
   

//     return (
//         <div>
//             <h2> schedule:{scheduleData.length}</h2>
//             <div className="overflow-x-auto">
//   <table className="table">
//     {/* head */}
//     <thead>
//       <tr>
       
//         <th>number</th>
//         <th>title</th>
//         <th>date</th>
//         <th>time</th>
//         <th>day</th>
//         <th>action</th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* row 1 */}
     
//        {
//         scheduleData.length===0?<p>no data found</p>:
//     scheduleData.map((schedule,index)=>   <tr key={schedule._id}>
            
//                  <td>{index +1}</td>
//                  <td>{schedule.title}</td>
//                  <td>{schedule.date}</td>
                 
//                  <td>{schedule.time}</td>
//                  <td>{schedule.day}</td>
//                  <td>
//                     <button onClick={()=>handleDelete(schedule._id)} className="btn"><FiDelete></FiDelete></button>
//                     <Link to={`/update/${schedule._id}`} className="btn">update</Link>
//                     <button onClick={()=>handleStatusUpdate(schedule._id)} className="bg-pink-500 px-4 py-2 rounded text-white">
//               {isCompleted ? <MdOutlineDoneAll /> : <MdDone  />}
//             </button>
                  
//                  </td>
               
//            </tr>)
//        }
      
   
     
//     </tbody>
//   </table>
// </div>
//         </div>
//     );
// };

// export default AllSchedule;

import { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllSchedule = () => {
    const data = useLoaderData();
    const [scheduleData, setScheduleData] = useState(data);

    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/schedule/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount > 0) {
                Swal.fire({
                    title: 'Item Deleted',
                    text: 'The schedule item has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                const remaining = scheduleData.filter(item => item._id !== id);
                setScheduleData(remaining);
            }
        });
    };

    const handleStatusUpdate = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/status/${id}`, {
            method: "PATCH"
        })
        .then(res => res.json())
        .then((result) => {
            if (result.modifiedCount > 0) {
                const newData = scheduleData.map((schedule) => 
                    schedule._id === id ? { ...schedule, isCompleted: true } : schedule
                );
                setScheduleData(newData);
            }
        });
    };

    return (
        <div>
            <h2>Schedule: {scheduleData.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Day</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scheduleData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No data found</td>
                                </tr>
                            ) : (
                                scheduleData.map((schedule, index) => (
                                    <tr key={schedule._id}>
                                        <td>{index + 1}</td>
                                        <td>{schedule.title}</td>
                                        <td>{schedule.date}</td>
                                        <td>{schedule.time}</td>
                                        <td>{schedule.day}</td>
                                        <td>
                                            <button onClick={() => handleDelete(schedule._id)} className="btn"><FiDelete /></button>
                                            <Link to={`/update/${schedule._id}`} className="btn">Update</Link>
                                            <button 
                                                onClick={() => handleStatusUpdate(schedule._id)} 
                                                className="bg-pink-500 px-4 py-2 rounded text-white">
                                                {schedule.isCompleted ? <MdOutlineDoneAll /> : <MdDone />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSchedule;

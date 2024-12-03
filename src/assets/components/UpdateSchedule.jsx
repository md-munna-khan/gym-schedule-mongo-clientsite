import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const formatTime12Hours = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
};

const UpdateSchedule = () => {
    const {id} = useParams()
    const singleData = useLoaderData();
    console.log(singleData)


    const [title, setTitle] = useState(singleData.title || '');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [day, setDay] = useState('Sunday');
console.log(title)
    const handleSubmited = () => {
        // e.preventDefault();
        const scheduleData = {
            title:title,
            date: date.toLocaleDateString(),
            time: formatTime12Hours(time),
            day:day,
        };
        console.log(scheduleData);


        fetch(`http://localhost:5000/schedule/${id}`,
            {
             method:"PATCH",
             headers:{
                'content-type': 'application/json'
             },
             body:JSON.stringify(scheduleData)
            })
            .then(res=>res.json())
            
      .then((data)=>{
        Swal.fire('data update')
      })
 
 
    //  const remaining = scheduleData.filter(item=> item._id !== id)
    //  setScheduleDta(remaining)
  
 
        // })
    };

    return (
        <div>
            <div className="container mx-auto bg-gray-400 p-10">
                <h2 className="text-5xl">update Schedule</h2>
                
                <form onSubmit={handleSubmited}>
                    <div className="">
                        <div className="flex items-center">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span>Title</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span>Date</span>
                                </label>
                                <DatePicker
                                    className="input input-bordered w-full"
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span>Time</span>
                                </label>
                                <DatePicker
                                    className="input input-bordered w-full"
                                    selected={time}
                                    onChange={(time) => setTime(time)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span>Day</span>
                                </label>
                                <select
                                    className="input input-bordered w-full"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                >
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Update Schedule</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSchedule;

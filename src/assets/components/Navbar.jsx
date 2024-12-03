import { NavLink } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="space-x-4">
            <NavLink className='btn btn-warning' to='/'>Home</NavLink>
            <NavLink className='btn btn-warning' to='/add-schedule'>add schedule</NavLink>
            <NavLink className='btn btn-warning' to='/all-schedule'>all schedule</NavLink>
            <NavLink className='btn btn-warning' to='/sign-up'>sign up</NavLink>
            <NavLink  className='btn btn-warning' to='/sign-in'>sign in</NavLink>
        </div>
    );
};

export default Navbar;
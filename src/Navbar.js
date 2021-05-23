/* eslint-disable jsx-a11y/anchor-has-content */
import { Link } from 'react-router-dom'

const Navbar = () => {

    return ( 
    <div className="navbar">
        <h1>Pomodoro Timer</h1>
        <div>
            <Link to="/" className="links fas fa-home"></Link>
            <a href="https://www.github.com/ahdernasr" className="links fab fa-github"></a>
            {/* <a className="links fas fa-sun"></a> */}
        </div>
    </div> 
    );
}
 
export default Navbar;
import { useState, type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import avatar from '../../Assets/male avatar.jpg'
import { FaBars } from 'react-icons/fa'


// Example user details (Replace with actual user data)
const user = {
    name: 'John Doe',
    avatar: avatar,
};

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <nav className="bg-blue-500 text-white w-full px-6">
            <div className="flex justify-between items-center py-3">
                {/* Logo or brand */}
                <div className="flex">
                    <Link to={'/home'} className="text-xl flex gap-3 font-bold items-center">
                        <img src="https://banner2.cleanpng.com/20180425/jrw/kisspng-node-js-javascript-web-application-express-js-comp-5ae0f84e2a4242.1423638015246930701731.jpg" className='w-8 h-8 rounded-full' alt="logo" />
                        <p className='text-xl'>Node JS</p>
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    {/* User details and logout */}
                    <div className="hidden lg:flex items-center px-4 gap-2">
                        <div>
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div>
                            <span className="font-bold">{user.name}</span>
                        </div>
                        <div>
                            <button className="text-white py-1 font-medium hover:text-amber-300">Logout</button>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="text-white focus:outline-none"
                        >
                            <FaBars className='text-xl' />
                        </button>
                        {/* Desktop menu */}

                    </div>
                </div>

            </div>



            {/* Responsive menu */}
            {showMenu && (
                <div className="flex justify-between">
                    <div className="lg:hidden">
                    </div>
                    <div className="lg:hidden flex flex-col gap-1 items-start">
                        <div className='flex items-center gap-2 py-1'>
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="font-bold">{user.name}</span>
                        </div>
                        <button className="text-white py-1 font-medium hover:text-amber-300">Logout</button>
                    </div>
                </div>
            )}


        </nav>
    );
}

export default Navbar;

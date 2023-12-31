import { useState, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../Assets/male avatar.jpg'
import { FaBars } from 'react-icons/fa'
import { toast } from 'react-toastify';
import logo from '../../Assets/logo.jpg'


// Example user details (Replace with actual user data)


interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
    const user = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]')
    const token = sessionStorage.getItem('token') ?? '';
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        toast.success('Logged Out Successfully')
        setTimeout(() => {
            sessionStorage.clear();
            navigate('/')
        }, 2000);
    }
    return (
        <nav className="bg-blue-500 text-white w-full px-6">
            <div className="flex justify-between items-center py-3">
                {/* Logo or brand */}
                <div className="flex">
                    <Link to={'/home'} className="text-xl flex gap-3 font-bold items-center">
                        <img src={logo} className='w-8 h-8 rounded-full' alt="logo" />
                        <p className='text-xl'>Node JS</p>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    {/* User details and logout */}
                    <div className="hidden lg:flex items-center px-4 gap-2">
                        {token !== '' ?
                            <>
                                <div>
                                    <img
                                        src={avatar}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                                <div>
                                    <span className="font-bold">{user.name}</span>
                                </div> |
                            </>
                            :
                            null
                        }
                        {
                            token !== '' ?
                                <>
                                    <Link to={'/addCard'} className='text-lg font-medium'>Add New Card</Link> |
                                    <div>
                                        <button className="text-white py-1 font-medium hover:text-amber-300" onClick={handleLogOut}>Logout</button>
                                    </div>
                                </>
                                :
                                null
                        }
                    </div>
                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="text-white focus:outline-none"
                        >
                            <FaBars className='text-xl' />
                        </button>
                    </div>
                </div>

            </div>



            {/* Responsive menu */}
            {showMenu && (
                <div className="flex justify-between">
                    <div className="lg:hidden">
                    </div>
                    <div className="lg:hidden flex flex-col gap-1 items-start">
                        {token !== '' ?
                            <>
                                <div className='flex items-center gap-2 py-1'>
                                    <img
                                        src={avatar}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="font-bold">{user.name}</span>
                                </div>
                                <button className="text-white py-1 font-medium hover:text-amber-300" onClick={handleLogOut}>Logout</button>
                            </>
                            : null
                        }
                    </div>
                </div>
            )}


        </nav>
    );
}

export default Navbar;

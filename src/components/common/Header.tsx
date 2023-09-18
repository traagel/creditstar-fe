import React, {useState} from 'react';

const Header = ({user}) => {
    const [role, setRole] = useState('USER');  // Default to USER
    const [showDropdown, setShowDropdown] = useState(false);


    return (
        <header
            className="flex justify-between items-center p-5 bg-blue-600 text-white relative sticky top-0 left-0 w-full z-20">
            <div className="mr-4">User: {user?.first_name ? `${user.first_name} ${user.last_name}` : 'N/A'}</div>
            <div className="relative cursor-pointer">
                <div onClick={() => setShowDropdown(!showDropdown)}>{role} ▼</div>
                {showDropdown && <div
                    className="absolute left-0 mt-2 w-48 bg-white text-black border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        onClick={() => {
                            setRole('USER');
                            setShowDropdown(false);
                        }}>
                        USER
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        onClick={() => {
                            setRole('ADMIN');
                            setShowDropdown(false);
                        }}>
                        ADMIN
                    </button>
                </div>}
            </div>
        </header>
    );
}

export default Header;

import React from 'react';


const Footer = () => {
    const links = ['Privacy Policy', 'Terms & Conditions', 'Contact Us'];
    return (
        <footer className="flex items-center p-5 text-black bottom-0 fixed left-0 w-full justify-between">
            <div className="flex flex-col items-center w-full">
                <ul className="flex justify-center list-none p-0 mb-4">
                    {links.map(link => (
                        <li key={link}
                            className="mx-3 hover:underline cursor-pointer transition-colors duration-300 ease-in-out">
                            {link}
                        </li>
                    ))}
                </ul>
                <div className="flex list-none justify-center p-0 space-x-4">
                    <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook"/>
                    <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter"/>
                    <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram"/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

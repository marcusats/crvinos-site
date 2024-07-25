'use client';
import React from 'react';
import Icon from "../Icons";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    red?: boolean;
    relative?: boolean;
}

export default function Navbar({ red, relative }: NavbarProps) {
    const router = useRouter();

    const textColor = red ? 'text-crred' : 'text-white';
    const borderColor = red ? 'border-crred' : 'border-white';
    const positionClass = relative ? 'relative' : 'absolute';

    const navItems = [
        { name: 'Nosotros', route: "about", available: true },
        // { name: 'Blog', route: "blog", available: false },
        { name: 'Catalogo', route: "catalog", available: true },
        { name: 'Contacto', route: "contact", available: true },
        { name: 'Enoturismo', route: "enoturism", available: true }
    ];

    const handleNavigation = (route: string, available: boolean) => {
        if (available) {
            router.push(`/${route}`);
        }
    };

    return (
        <nav className={`w-full flex justify-between items-center px-32 py-2 bg-transparent z-50 ${positionClass} top-0 left-0 right-0`}>
            <Icon name={`CRVinos${red ? '-red' : ''}`} className="h-20 w-20 md:h-28 md:w-28" link={"/"} />
            <motion.div 
                className={`flex border-b-2 ${borderColor} px-8`}
            >
                <div className="flex py-2 space-x-5">
                    <div className='flex justify-center items-center md:text-sm text-xs space-x-8'>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index} 
                                whileHover={{ y: item.available ? -3 : 0 }}
                                whileTap={{ y: item.available ? -3 : 0 }}
                                initial={{ y: 0 }}
                                animate={{ y: 0 }}
                                exit={{ y: 0 }}
                                transition={{ type: 'ease-in', stiffness: 300 }}
                                className={`${textColor} ${!item.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handleNavigation(item.route, item.available)}
                            >
                                <a className={`${!item.available ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                    {item.name}
                                </a>
                                {!item.available && (
                                    <p className="text-xs text-gray-400">Próximamente</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* <div className='flex items-center justify-center  '>
                        {[ 'Shopping'].map((iconName, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: iconName === 'Search' ? -3 : 0 }}
                                whileTap={{ y: iconName === 'Search' ? -3 : 0 }}
                                initial={{ y: 0 }}
                                animate={{ y: 0 }}
                                exit={{ y: 0 }}
                                transition={{ type: 'ease-in', stiffness: 300 }}
                                className={`${textColor} ${iconName === 'Shopping' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handleNavigation(iconName === 'Search' ? 'contact' : '#', iconName !== 'Shopping')}
                            >   
                                <Icon name={`${iconName}${red ? '-red' : ''}`} className="h-20 w-20 md:h-5 md:w-5" />
                                {iconName === 'Shopping' && (
                                    <p className="text-xs text-gray-400 text-center">Próximamente</p>
                                )}
                            </motion.div>
                        ))}
                    </div> */}
                </div>
            </motion.div>
        </nav>
    );
}

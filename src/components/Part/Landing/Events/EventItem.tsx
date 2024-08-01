'use client';

import React from 'react';
import Icon from '@/components/Icons';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface EventItemProps {
    imageUrl: string;
    title: string;
    description: string;
    endDate: string;
    date: string;
    time: string;
    slug?: string; 
}

const EventItem: React.FC<EventItemProps> = ({ imageUrl, title, description, date, endDate, time, slug }) => {
    const eventDate = new Date(endDate);
    const currentDate = new Date();
    const isPastEvent = eventDate < currentDate;
    const router = useRouter();

    const handleClick = () => {
        if (isPastEvent) return;
     
        if (slug) {
            router.push(`/enoturism/${slug}`);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return date.toLocaleTimeString('en-US', options);
    };

    const divVariants = {
        hover: { opacity: 0.9 },
    };

    const textVariants = {
        hover: { x: 5 },
    };

    return (
        <motion.div 
            className={`w-full overflow-hidden relative ${isPastEvent ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
            onClick={handleClick}
            whileHover={!isPastEvent ? "hover" : undefined}
            transition={{ type: 'ease-in', stiffness: 300 }}
            variants={isPastEvent ? {} : divVariants}
        >
            <img src={imageUrl} alt={title} className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover" />
            {isPastEvent && (
                <div className="absolute inset-0 flex items-center justify-center bg-crred bg-opacity-15">
                    <p className="text-white text-lg sm:text-xl md:text-2xl cormorant-garamond-semibold">Evento Pasado</p>
                </div>
            )}
            <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                <div className='space-y-3'>
                    <div className='space-y-1'>
                        <p className="text-crred text-base sm:text-lg md:text-xl cormorant-garamond-light">{title}</p>
                        <p className="text-crred text-xs sm:text-sm md:text-base">{description}</p>
                    </div>
                    <motion.div 
                        className='flex justify-start items-center space-x-2'
                        transition={{ type: 'ease-in', stiffness: 300 }}
                        variants={isPastEvent ? {} : textVariants}
                    >
                        <p className="text-nowrap font-cormorant text-crred underline cursor-pointer transition-colors duration-300 ease-in-out hover:text-crred-light hover:underline-offset-2">Descubre Más</p>
                        <Icon name='Arrow' className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                </div>
                <div className='flex flex-col items-end space-y-1'>
                    <p className="text-crred text-xs sm:text-xs md:text-sm lg:text-sm">{formatDate(date)}</p>
                    <p className="text-crred text-xs sm:text-xs md:text-sm lg:text-sm">{formatTime(time)}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default EventItem;

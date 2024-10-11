'use client';
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface BasicButtonProps {
    variant: 'transparent' | 'bg-back' | 'bg-crred' | 'main' ;
    sizex?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' | 'xxxxlarge';
    sizey?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' | 'xxxxlarge';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    link?: string;  
}

const BasicButton: React.FC<BasicButtonProps> = ({ variant, sizex = 'medium', sizey = 'medium', children, onClick, className = '', disabled = false, link }) => {
    const router = useRouter();

    const handleClick = () => {
        if (link) {
            router.push(link);
        } else if (onClick) {
            onClick();
        }
    };

    const sizeClassName = clsx({
        'px-4': sizex === 'small',
        'px-6': sizex === 'medium',
        'px-9': sizex === 'large',
        'px-12': sizex === 'xlarge',
        'px-16': sizex === 'xxlarge',
        'px-20': sizex === 'xxxlarge',
        'px-24': sizex === 'xxxxlarge',
        'py-2': sizey === 'small',
        'py-3': sizey === 'medium',
        'py-4': sizey === 'large',
        'py-5': sizey === 'xlarge',
        'py-6': sizey === 'xxlarge',
        'py-7': sizey === 'xxxlarge',
        'py-8': sizey === 'xxxxlarge',
    });

    const baseClassName = clsx(
        'rounded-full  transition-all duration-300 ease-in-out',
        {
            'bg-transparent text-crred hover:bg-crred hover:text-back': variant === 'transparent',
            'bg-back text-crred hover:bg-transparent hover:text-back': variant === 'bg-back',
            'bg-back text-crred hover:bg-crred hover:text-back': variant === 'main',
            'bg-crred text-back hover:bg-back hover:text-crred': variant === 'bg-crred',
            'opacity-50 cursor-not-allowed': disabled,
        },
        sizeClassName,
        className
    );

    return (
        <button className={baseClassName} onClick={handleClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default BasicButton;

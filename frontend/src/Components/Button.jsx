import React from 'react'

const Button = ({title, id, rightIcon, leftIcon, containerClass}) => {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-[#98111E]  px-7 py-3 text-white ${containerClass}`}>
        {leftIcon}

        <span className='relative incline-flex overflow-hidden font-general text-xs uppercase'>
            <div>
                {title}
            </div>
        </span>

        {rightIcon}
    </button>
  )
}

export default Button
import React from 'react'
import Spline from '@splinetool/react-spline'


const Banner3D = () => {
    return (
        <div className='spline-wrapper pointer-events-none'>
            <div className="spline-container">
                {/* <Spline scene="https://prod.spline.design/pMUsUzQd2iNS05xZ/scene.splinecode" /> */}
                <Spline scene='/model/banner_3D.spline' />
            </div>
        </div>
    )
}

export default Banner3D


import React from 'react'
import FollowUs from './FollowUs'

export default function Video() {
    return (
        <div className='green-container'>

            <div className='video'>
            <h3>About us in <span>1 minute</span></h3>

                <video controls poster="/images/video.png" controlsList="nodownload noforms" disablePictureInPicture  playsinline>
                    
                    <source src="/images/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {/* <FollowUs /> */}
        </div>
    )
}
import React from 'react'
import ReactPlayer from 'react-player'

const CompanyVideos = (props) => {
  return (
    <>
      <div>
      <ReactPlayer controls width={600} url={props.data?props.data.video_url:null} />   
      </div>
    </>
  )
}

export default CompanyVideos

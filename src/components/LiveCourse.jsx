import React from 'react'
import YouTube from './Utube'
import CodeEditor from './CodeEditor'

const LiveCourse = () => {
  return (
    <div className='h-[100dvh] w-[100dvw] flex'>
      <div className='w-[50dvw]'>
      <YouTube videoId="vynDPwXuk8U" />
      </div>
      <div className='mb-5 w-[40dvw] bg-slate-300'>
        <CodeEditor/>
      </div>
    </div>
  )
}

export default LiveCourse
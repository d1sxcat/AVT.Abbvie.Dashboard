import { useEffect, useState } from 'react'
import { socket } from './components/socketio'

type Slide = {
  SlideNumber:number
  SlideName:string
  SlideImg:string
}

function App() {

  const [ apiData, setApiData ] = useState<Slide[] | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/jsonFile', )
    .then(data => data.json())
    .then(data => setApiData(data))
  },[])

  useEffect(() => {
    socket.on('jumpToSlide', (val) => {
      console.log(val)
    })
    return() => {socket.off('jumpToSlide') }
  },[])

  return(
    <div className='bg-slate-900 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center p-20 gap-4'>
      {apiData ? apiData.map((value, index) => (
        <div className='relative w-28 h-20 bg-slate-100 flex items-center justify-center cursor-pointer' onClick={()=>socket.emit('slideEmmiter',value.SlideNumber)} key={index}>{`${value.SlideName}`}</div>
      )) : <></>}
    </div>
  )
}

export default App

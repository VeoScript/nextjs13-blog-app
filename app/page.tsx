import React from 'react'
import SideBar from './components/SideBar'
import FeedGrid from './components/FeedGrid'

export default function Home() {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="relative flex flex-row items-start w-full h-full overflow-y-auto">
        <SideBar />
        <FeedGrid />
      </div>
    </div>
  )
}

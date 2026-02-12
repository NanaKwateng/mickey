'use client'

import Bootbutton from "@/components/try/Bootbutton"
import { useState } from "react"

interface Props  {
    items: string[]
    heading: string
}

export default function RenderPage(props: Props) {
    const items = ["Mango", "Avocado", "Pineapple"]
    //const handleClick = (event) => console.log(event)
    const [active, setActive] = useState(-1)
  return (
    <div >
      {items.map((item, i) => (
        <div 
            onClick={() => {
                console.log(i)
                setActive(i)
            }} 
            key={i}
            className={`px-4 py-2 cursor-pointer rounded text-white transition-colors duration-200
            ${active === i ? "bg-emerald-700" : "bg-amber-700"}
          `}
        >
            {item} 
        </div>
      ))} 

      <Bootbutton className="text-black" description="name button"/>
    </div>
  )
}

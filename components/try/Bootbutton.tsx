import { ReactNode } from "react"


interface Props {
    className : string
    description : ReactNode
}

export default function Bootbutton( { className, description } : Props ) {
  return (
    <button 
        className={className}
        description= {description}
    />
  )
}

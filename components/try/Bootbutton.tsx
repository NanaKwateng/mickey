import { ReactNode } from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  description: ReactNode
}

export default function Bootbutton({
  className,
  description,
  ...rest
}: Props) {
  return (
    <button
      className={className}
      {...rest}
    >
      {description}
    </button>
  )
}

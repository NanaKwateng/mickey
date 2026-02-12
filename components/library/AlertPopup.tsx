import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import OptimizedVideo from "../ux/OptimizedVideo"
import { PlayCircle } from "lucide-react"
import { BiLike } from "react-icons/bi"

interface videoProps {
  src: string
  poster: string
  title: string
}

export function AlertDialogDemo({ src, poster, title }: videoProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-4 bg-white/80 px-4 py-2 rounded-full w-fit border border-black/5 shadow-sm lg:my-6">
          <PlayCircle size={50} className="text-orange-600" />
          <div className="font-semibold capitalize text-left">
            <p>{title}</p>

          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mickey shares his story..</AlertDialogTitle>
          <OptimizedVideo
            src={src}
            poster={poster}
            className="w-full h-400 object-cover rounded-3xl border-3 border-slate-300"
            controls
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>
            <BiLike /> Like
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

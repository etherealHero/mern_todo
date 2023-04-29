import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

export type UseOutSideTypes = {
  ref: any
  toggler: any
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean): UseOutSideTypes => {
  const [isShow, setIsShow] = useState(initialIsVisible)
  const ref = useRef<HTMLElement>(null)
  const toggler = useRef<HTMLElement>(null)

  const handleClickOutside = (event: any) => {
    if (toggler.current) {
      if (ref.current) {
        if (
          !toggler.current.contains(event.target) &&
          !ref.current.contains(event.target)
        )
          setIsShow(false)
      } else {
        if (!toggler.current.contains(event.target)) {
          setIsShow(false)
        }
      }
    } else {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShow(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  })

  return { ref, isShow, setIsShow, toggler }
}

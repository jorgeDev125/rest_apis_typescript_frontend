import { PropsWithChildren } from "react";


export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div className="p-3 my-4 font-bold text-center text-white uppercase bg-red-600">
        {children}
    </div>
  )
}

import { /* Link, */ ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"


type ProductDetailsProps = {
    product: Product
}

export async function action ( {params}: ActionFunctionArgs )  {
  if (params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect("/")
    
  }
}

export default function ProductDetails( {product} : ProductDetailsProps) {

  const fetcher = useFetcher()
  const navigate = useNavigate()

  const isAvailable = product.availability

  return (
    <tr className=" grid grid-cols-3 sm:grid-cols-4 border-b text-sm sm:text-lg items-center">
      <td className="p-3  text-gray-800 ">
        {product.name}
      </td>
      <td className="p-3  text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3  text-gray-800 text-center">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id" //el name y el value son el id y no la availability, ya que requiero el id para hacer el patch, no me interesa la availability
            value={product.id}
            className={`${isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 text-xs sm:text-sm uppercase font-bold w-full border border-slate-400 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="pb-3 pt-0 sm:p-3  text-gray-800 col-span-3 sm:col-span-1">
        <div className="flex gap-2 items-center justify-between">
          {/* se puede hacer la navegación hacia el formulario de edición a través de Link */}
          {/* <Link
            to={`productos/${product.id}/editar`}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >Editar</Link> */}
          {/* también se puede hacer a través de useNavigate, tiene mas ventajas */}
          <button
            onClick={() => navigate(`productos/${product.id}/editar`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >Editar</button>
          <Form 
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("Eliminar?")) {
                e.preventDefault()
              }
            }}
          >
            <input 
              type="submit"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
              value="Eliminar"
            />
          </Form> 
        </div>
      </td>
    </tr> 
  )
}

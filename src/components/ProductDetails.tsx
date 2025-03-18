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
    <tr className="grid items-center grid-cols-3 text-sm border-b sm:grid-cols-4 sm:text-lg">
      <td className="p-3 text-gray-800 ">
        {product.name}
      </td>
      <td className="p-3 text-center text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-center text-gray-800">
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
      <td className="col-span-3 pt-0 pb-3 text-gray-800 sm:p-3 sm:col-span-1">
        <div className="flex items-center justify-between gap-2">
          {/* se puede hacer la navegación hacia el formulario de edición a través de Link */}
          {/* <Link
            to={`productos/${product.id}/editar`}
            className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-indigo-600 rounded-lg"
          >Editar</Link> */}
          {/* también se puede hacer a través de useNavigate, tiene mas ventajas */}
          <button
            onClick={() => navigate(`productos/${product.id}/editar`)}
            className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-indigo-600 rounded-lg"
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
              className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-red-600 rounded-lg"
              value="Eliminar"
            />
          </Form> 
        </div>
      </td>
    </tr> 
  )
}

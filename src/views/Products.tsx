import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

//función loader para cargar todos los productos de la base de datos
export async function loader() {
  const products = await getProducts()
  return products
}

//se crea la acción para cambiar a disponibilidad del producto
export async function action ({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateAvailability(+data.id)
  
  return {}
}

//se usa Link para poder conectar las páginas entre sí, definiendo la ruta a la cual se quiere llegar
export default function Products() {

  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-500">Productos</h2>
        <Link
          to="/productos/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"    
        >Agregar Producto</Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto text-sm sm:text-lg">
          <thead className="bg-slate-800 text-white">
              <tr className="grid grid-cols-3 sm:grid-cols-4">
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2 hidden sm:block">Acciones</th>
              </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails 
                key={product.id}
                product= {product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

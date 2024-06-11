import { Link, Form, useActionData, ActionFunctionArgs, redirect} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from '../components/ProductForm';

//se crea la función action que se exporta hacia el router y definirla dentro de las propiedades del NewProduct
//siempre que haya un request de una acción se pone de tipo ActionFunctionArgs
//fucnión para agregar un producto a la base de datos
export async function action ( {request}: ActionFunctionArgs )  {

  //para obtener los datos obtenidos en el request se hace con la siguiente sintaxis
  const data = Object.fromEntries(await request.formData())

  //valida que los campos esten completos
  let error = ""
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios"
  }

  //si hay un error lo retornamos para poder usarlo fuera de la función y renderizarlo en el componente a través del hook useActionData
  if (error.length) {
    return error
  }
  await addProduct(data)
  return redirect("/")
}


export default function NewProduct() {

  const error = useActionData() as string

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-500">Registrar Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm text-center font-bold text-white shadow-sm hover:bg-indigo-500"    
        >Volver a Productos</Link>
      </div>
      {/* si hay algo en error se renderiza el componente de ErrorMessage y se la pasa el error como children */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* se crea el formulario con el componente Form que se importa de react-router-dom, y se le pone el meteodo requerido, en este caso POST, para crear un nuevo producto */}
      <Form
        className="mt-10"  
        method="POST"    
      >
       <ProductForm /> 
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}

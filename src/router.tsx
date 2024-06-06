import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import Products, { action as updateAvailabilityAction, loader as productsLoader} from "./views/Products"
import NewProduct, { action as newProductAction } from "./views/NewProduct"
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct"
import { action as deleteProductAction} from "./components/ProductDetails"


//se define el router con la función createBrowserRouter y se definie un arreglo de objetos, cada objeto puede albergar un path con un layout, al cual se le pueden definir como un arreglo de objetos, los views que sea necesario en la propiedad children
export const router =  createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: "productos/nuevo",
                element: <NewProduct />,
                //se importa la función action (la cual se renombra) y se define dentro de la propiedad del objeto referido a NewProduct
                action: newProductAction
            },
            {
                path: "productos/:id/editar", //ROA pattern o Resource Oriented Design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: "productos/:id/eliminar", //ROA pattern o Resource Oriented Design
                action: deleteProductAction
            }
        ]
    }
])



import { safeParse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

//el tipo de dato se infiere del data de NewProduct
type ProductData = {
    [k: string]: FormDataEntryValue;
}

//función para agregar productos a la base de datos
export async function addProduct (data: ProductData) {
    //se valida que la información enviada sea compatible con el schema através de la función safeParse
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
            
        } else {
            throw new Error("Datos no Válidos")
        }

    } catch (error) {
        console.log(error)
    }
}

//función para obtener todo el arreglo de productos desde la base de datos
export async function getProducts () {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error")
        }
    } catch (error) {
        console.log(error)
    }
}

//función para obetener un producto por el id desde la base de datos
export async function getProductById (id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error")
        }
    } catch (error) {
        console.log(error)
    }
}

//fucnión para actualizar la información del producto
export async function updateProduct ( data: ProductData, id: Product["id"]) {
    try {
        //para convertir datos de string a number, y de string a boolean se crea una función en los utils
        const NumberSchema = (value: ProductData[string]) => {
            const num = parseFloat(value.toString());
            return isNaN(num)? NaN : num;
          };
       
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: NumberSchema(data.price),
            availability: toBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
            
        } else {
            throw new Error("Datos no Válidos")
        }
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct (id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateAvailability (id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}
import { Outlet } from "react-router-dom"


//se crea el header que se comparte en las diferentes páginas
//el Oulet se encierra en un tag de main para poder darle estilos css
export default function Layout() {
  return (
    <>
        <header className="bg-slate-800">
            <div className="mx-auto max-w-6xl py-10">
                <h1 className=" text-3xl sm:text-4xl font-extrabold p-4 text-white">Administrador de productos</h1>
            </div>
        </header>
        <main className="mt-10 mx-auto max-w-6xl p-4 bg-white shadow">
            <Outlet />
        </main>
    </>
  )
}

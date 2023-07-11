import { ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { Link } from "react-router-dom";

export default function PruebaLogin() {
    const [nombre, setNombre] = useState('')
    const getUserByName = trpc.usuario.getUserByName.useQuery({ userName: nombre });
    const content = () => {
        if (getUserByName.data)
            return <Link className="btn" to={"/listado"}>Listado</Link>
    }
    function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (getUserByName.data) {
            //todo:redirecciona al momento de dar click
            alert(nombre)
        } else {
            alert(`error-login_: el usuario${nombre} no está registrado`)
        }
    }
    return (
        <>
            <h1 className="titulo">login</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <button>Subit</button>
            </form>
            {content()}
        </>
    )

}
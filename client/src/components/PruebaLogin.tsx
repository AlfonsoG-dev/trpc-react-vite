import { ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { Link } from "react-router-dom";

export default function PruebaLogin() {
    const [nombre, setNombre] = useState('')
    const getUserByName = trpc.usuario.getUserByName.useQuery({ userName: nombre });
    function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (getUserByName.data) {

            alert(nombre)
        } else {
            return (
                <p> no hay usuarios con ese nombre</p>
            )
        }
    }
    return (
        <>
            <Link className="btn" to={"/"}>listado</Link>
            <form onSubmit={handleOnSubmit}>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <button hidden={true}>Subit</button>
            </form>
        </>
    )

}
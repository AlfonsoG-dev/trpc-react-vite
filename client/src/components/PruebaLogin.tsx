import { ChangeEvent, useState } from "react";
import { trpc } from "../trpc";
import { QueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function PruebaLogin() {
    const [nombre, setNombre] = useState({ userName: '' })
    const getUserByName = trpc.usuario.getUserByName.useQuery(nombre);
    const cliente = new QueryClient()
    const content = () => {
        if (getUserByName.data) {
            return (
                <ul>
                    <li>{getUserByName.data.id}</li>
                    <li>{getUserByName.data.nombre}</li>
                    <li>{getUserByName.data.email}</li>
                    <li>{getUserByName.data.create_at}</li>
                </ul>
            )
        }
    }
    function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (getUserByName.data) {
            alert(getUserByName.data.nombre)
        } else {
            alert("no existe")
        }
        setNombre({ userName: '' })
    }
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setNombre({ userName: e.target.value })
    }
    return (
        <>
            <Link className="btn" to={"/"}>listado</Link>
            <form onSubmit={handleOnSubmit}>
                <input type="text" value={nombre.userName} onChange={(e) => handleOnChange(e)} />

                <button hidden={true}>Subit</button>
            </form>
            {content()}
        </>
    )

}
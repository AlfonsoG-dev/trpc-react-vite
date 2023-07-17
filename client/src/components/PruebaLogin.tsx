import { ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { Link } from "react-router-dom";

export default function PruebaLogin() {
    const [nombre, setNombre] = useState<string>('');
    //todo: necesito pasar esto a otro lado para que no busque exactamente cuando el valor es undefind
    const getUserByName = trpc.usuario.getUserByName.useQuery({ userName: nombre });
    const content = () => {
        if (getUserByName.data) {
            return (
                <>
                    <ul>
                        <li>
                            <p>Nombre :_{getUserByName.data.nombre}</p>
                        </li>
                        <li>
                            <p> Email:_ {getUserByName.data.email}</p>
                        </li>
                        <li>
                            <p>Password:_ {getUserByName.data.password}</p>
                        </li>
                        <li>
                            <p>create_date:_ {getUserByName.data.create_at}</p>
                        </li>

                    </ul>
                    <Link className="btn" to={"/listado"}>Listado</Link>
                </>
            );
        } else {
            return (
                <>
                    <h1>No se encontro el usuario con el nombre <p>{nombre}</p></h1>
                </>
            );
        }
    };
    function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (getUserByName.data) {
            //todo:redirecciona al momento de dar click
            alert(nombre);
        } else {
            alert(`error-login_: el usuario${nombre} no está registrado`);
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
    );

};

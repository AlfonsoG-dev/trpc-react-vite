import { ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { useNavigate } from "react-router-dom";

export default function PruebaLogin() {
    const [nombre, setNombre] = useState<string>('');
    const navigate = useNavigate()
    //todo: necesito pasar esto a otro lado para que no busque exactamente cuando el valor es undefind
    const getUserByName = trpc.usuario.getUserByName.useQuery({ userName: nombre });
    const content = () => {
        if (!getUserByName.data) {
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
            return navigate("/listado", { replace: true })
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

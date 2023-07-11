import { ChangeEvent, useState } from "react";
import { trpc } from '../trpc'
import { QueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
function UserForm() {
	const [user, setUser] = useState({
		id: 0,
		nombre: "",
		email: "",
		password: "",
		rol: ""

	});
	//ingresar usuario a la base de datos 
	const createUser = trpc.usuario.create.useMutation();
	const client = new QueryClient();

	//metodo para ingresar el usuario mediante los datos del formulario
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		createUser.mutate(user, {
			onSuccess: () => {
				client.invalidateQueries({ queryKey: ["create"] });
			},
			onError: () => {
				console.error("error al ingresar el usuario")
			}
		});
	}
	//asignar los datos del formulario al objeto creado para su respectivo guardado
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}
	return (
		<div className="panelRegistro">
			<Link className="btn registro" to={"/"}>Listado</Link>
			<form onSubmit={handleSubmit}>
				<h1>Registro usuario</h1>
				<input type="number" placeholder="idUser" name="id" onChange={handleChange} hidden={true} />

				<input type="text" placeholder="Nombre" name="nombre" onChange={handleChange} />

				<input type="email" placeholder="email" name="email" onChange={handleChange} />

				<input type="password" autoComplete="123asd" placeholder="password" name="password" onChange={handleChange} />

				<input type="text" placeholder="Rol" name="rol" onChange={handleChange} />
				<div className="panelFuncion">
					<input className="btn save" type="submit" value="Save" />
				</div>
			</form>
		</div>
	)
}

export default UserForm;

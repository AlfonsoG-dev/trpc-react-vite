import { ChangeEvent, useContext, useState } from "react";
import { trpc } from '../utils/trpc'
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
	const utils = trpc.useContext()
	const client = new QueryClient();

	//metodo para ingresar el usuario mediante los datos del formulario
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const confirmar = confirm("Seguro desea guardar el nuevo usuario??")
		if (confirmar == true) {

			createUser.mutate(user, {
				onSuccess: () => {
					client.invalidateQueries({ queryKey: ["create"] });
					utils.usuario.get.invalidate()
					setUser({
						id: 0,
						nombre: "",
						email: "",
						password: "",
						rol: ""

					})
				},
				onError: () => {
					console.error("error al ingresar el usuario")
				}
			});
		}
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
			<Link className="btn registro" to={"/listado"}>Listado</Link>
			<form onSubmit={handleSubmit}>
				<h1>Registro usuario</h1>
				<input type="number" value={user.id} placeholder="idUser" name="id" onChange={handleChange} hidden={true} />

				<input type="text" value={user.nombre} placeholder="Nombre" name="nombre" onChange={handleChange} />

				<input type="email" value={user.email} placeholder="email" name="email" onChange={handleChange} />

				<input type="password" value={user.password} autoComplete="123asd" placeholder="password" name="password" onChange={handleChange} />

				<input type="text" value={user.rol} placeholder="Rol" name="rol" onChange={handleChange} />
				<div className="panelFuncion">
					<input className="btn save" type="submit" value="Save" />
				</div>
			</form>
		</div>
	)
}

export default UserForm;

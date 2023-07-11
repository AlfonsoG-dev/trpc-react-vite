import { QueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listaUsuarios, getUserByName } from "../utils/fetchTrpc"
import { setuid } from 'process';
//utilizar el cliente para actualizar los datos 
export default function ListaUsuarios() {
	const [user, setUser] = useState<string>('alf')
	console.log(getUserByName(user).data)
	return (
		<div className='panelUsuairos'>
			<Link className='btn registro' to={"/registro"}>Registro</Link>
			<h1 className='titulo'>Lista Usuarios</h1>
			<table>
				<thead>
					<tr>
						<th>id</th>
						<th>Nombre</th>
						<th>Email</th>
						<th>Password</th>
						<th>Rol</th>
						<th>opciones</th>
					</tr>
				</thead>
				<DataUser
				/>
			</table>
		</div>
	)
}
function DataUser() {
	return (
		<tbody>
		</tbody >
	)
}

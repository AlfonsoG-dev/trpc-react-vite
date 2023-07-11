import { Link } from 'react-router-dom';
import { trpc } from '../utils/trpc';
//utilizar el cliente para actualizar los datos 
export default function ListaUsuarios() {

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
	const listaUsers = trpc.usuario.get.useQuery()
	return (
		<tbody>
			{listaUsers.data?.map(usuario => (
				<tr>
					<td>{usuario.id}</td>
					<td>{usuario.nombre}</td>
					<td>{usuario.email}</td>
					<td>{usuario.password}</td>
					<td>{usuario.rol}</td>
					<td>{usuario.create_at}</td>
				</tr>
			))}
		</tbody >
	)
}

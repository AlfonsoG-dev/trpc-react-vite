import { trpc } from '../trpc'
import { Link } from 'react-router-dom';
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
				<DataUser />
			</table>
		</div>
	)
}
function DataUser() {
	const usuarios = trpc.usuario.get.useQuery();
	return (
		<tbody>
			{(usuarios.data ?? []).map(row => (
				<tr key={row.id}>
					<td>{JSON.stringify(row.id)}</td>
					<td>{JSON.stringify(row.nombre)}</td>
					<td>{JSON.stringify(row.email)}</td>
					<td>{JSON.stringify(row.password)}</td>
					<td>{JSON.stringify(row.rol)}</td>
					<td>{JSON.stringify(row.create_at)}</td>
					<td><a href="#" >delete</a> - <a href="#">Update</a></td>
				</tr>
			))
			}
		</tbody >
	)
}

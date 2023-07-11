import { QueryClient } from '@tanstack/react-query';
import { trpc } from '../trpc'
import { Link } from 'react-router-dom';
//utilizar el cliente para actualizar los datos 
export default function ListaUsuarios() {
	const deleteUser = trpc.usuario.eliminarUsuario.useMutation();
	const client = new QueryClient();

	//
	function handleOnClickDelete(userID) {
		deleteUser.mutate(userID, {
			onSuccess: () => {
				client.invalidateQueries({ queryKey: ["eliminarUsuario"] })
			},
			onError: () => {
				console.log("error al eliminar el usuario")
			}
		})
	}
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
					onClickDelete={handleOnClickDelete}
				/>
			</table>
		</div>
	)
}
function DataUser({ onClickDelete }) {
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
					<td><a href="#" onClick={() => onClickDelete({ userId: row.id })}>delete</a> - <a href="#">Update</a></td>
				</tr>
			))
			}
		</tbody >
	)
}

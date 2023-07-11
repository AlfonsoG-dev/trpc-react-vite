import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './utils/trpc'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
//css archivos
import './App.css'

//componentes
import UserForm from './components/userForm'
import ListaUsuarios from './components/listaUsuario'
import Login from './components/PruebaLogin'

//routes from components
const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />
	},
	{
		path: "/listado",
		element: <ListaUsuarios />
	},
	{
		path: "/registro",
		element: <UserForm />
	}
])

function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:3000/trpc',
				}),
			],
		}),
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default App

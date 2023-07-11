import { trpc } from "../trpc";

export const listaUsuarios = () => trpc.usuario.get.useQuery()
export const getUserByName = (nombre: string) => trpc.usuario.getUserByName.useQuery({ userName: nombre })
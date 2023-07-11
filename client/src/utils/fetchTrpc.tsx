import { trpc } from "../trpc";

export const listaUsuarios = () => trpc.usuario.get.useQuery().data
export const getUserByName = (nombre: string) => trpc.usuario.getUserByName.useQuery({ userName: nombre })
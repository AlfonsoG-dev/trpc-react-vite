import * as model from './../models/myModel';
import { initTRPC } from '@trpc/server';
import { z } from "zod";
import { UserRepository } from '../services/query';
const myUser = new UserRepository();

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

// listar los usurios que se encuentren en la db
const listado = publicProcedure.query(async function () {
    const usuarios: model.User[] = await myUser.readAll();
    return usuarios;
})

//crear un usuario nuevo y guardar en la db
const addUser = publicProcedure.input(z.object({

    nombre: z.string(),
    email: z.string(),
    password: z.string(),
    rol: z.string()

})).mutation(({ input }) => {

    const nuevo: model.User = {
        nombre: input.nombre,
        email: input.email,
        password: input.password,
        rol: input.rol,
        create_at: new Date(Date.now()),
    }
    myUser.create(nuevo);
    return nuevo;
})

//buscar usuario por id

const getUserById = publicProcedure.input(z.object({
    userId: z.number(),
})).query(async function ({ input }) {
    const buscado: model.User | undefined = await myUser.readById(input.userId);
    return buscado;
})


//buscar por nombre
const getUserByName = publicProcedure.input(z.object({
    userName: z.string(),
})).query(async function ({ input }) {
    const buscado: model.User | undefined = await myUser.readUserByName(input.userName)
    return buscado
})

//eliminar el usuario
const eliminarUsuario = publicProcedure.input(z.object({
    userId: z.number()
})).mutation(({ input }) => {
    myUser.remove(input.userId)
})
export const userRouter = router({
    get: listado,
    create: addUser,
    getById: getUserById,
    getUserByName: getUserByName,
    eliminarUsuario: eliminarUsuario
})

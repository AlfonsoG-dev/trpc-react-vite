import express from 'express';
import { UserRepository } from './services/query';
import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import bodyParser, { json } from 'body-parser';
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors';
import { userRouter } from './routes/userRoute';

const createContext = ({
	req,
	res
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const router = t.router;
const appRouter = router({
	usuario: userRouter
});


export type AppRouter = typeof appRouter;


const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json())
app.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
)

app.get('/', async function (req, res) {
	try {
		const nuevo = new UserRepository();
		res.json(await nuevo.readAll());
	} catch (err) {
		console.log(err)
	}
})
app.get('/getById/:userId', async function (req, res) {
	try {
		const buscado = new UserRepository();
		const id = req.params.userId;
		res.status(200).json(await buscado.readById(parseInt(id)));
	} catch (err) {
		console.error(err)
	}
})

app.listen(port, () => {
	return console.log(`express iniciado en puerto: ${port}`)
})

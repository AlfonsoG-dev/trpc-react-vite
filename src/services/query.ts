import { QueryError, RowDataPacket, OkPacket } from 'mysql2';
import * as model from '../models/myModel';
import { connect } from './db';

const conn = connect();

export class UserRepository {
	// lista de todos los usuarios de la db
	readAll(): Promise<model.User[]> {
		return new Promise((resolve, reject) => {
			conn.execute('select * from user', (err: QueryError, res) => {
				if (err) reject(err);
				else resolve(res)
			})
		})
	}
	// usuario dado por id
	readById(user_id: number): Promise<model.User> {
		return new Promise((resolve, reject) => {
			conn.execute('select * from user where id = ?', [user_id], (err, res) => {
				if (err) reject(err);
				else resolve(res?.[0]);
			})
		})
	}
	readUserByName(user_name: string): Promise<model.User> {
		return new Promise((resolve, reject) => {
			conn.execute('select * from user where nombre = ?', [user_name], (err, res) => {
				if (err) reject(err);
				else resolve(res?.[0]);
			})
		})
	}
	// crear un usuario nuevo
	create(user: model.User): Promise<model.User> {
		return new Promise((resolve, reject) => {
			conn.query<OkPacket>('insert into user (nombre, email, password, rol, create_at) values (?, ?, ?, ?, ?)', [user.nombre, user.email, user.password, user.rol, user.create_at], (err, res) => {
				if (err) reject(err);
				else
					this.readById(res.insertId)
						.then(user => resolve(user!))
						.catch(reject)
			})
		})
	}
	// modificar los datos del usuario
	update(user: model.User): Promise<model.User | undefined> {
		return new Promise((resolve, reject) => {
			conn.query<OkPacket>('update user set nombre =?, email =?, password =?, rol =?, create_at =? where id = ?', [user.nombre, user.email, user.password, user.rol, user.create_at, user.id], (err, res) => {
				if (err) reject(err);
				else
					this.readById(user.id!)
						.then(resolve)
						.catch(reject)
			})
		})
	}
	// eliminar el usuario por el identificador
	remove(user_id: number): Promise<number> {
		return new Promise((resolve, reject) => {
			conn.query<OkPacket>('delete from user where id = ?', [user_id], (err, res) => {
				if (err) reject(err);
				else resolve(res.affectedRows);
			})
		})
	}
}

import mysql from "mysql2";

export function connect() {

	const connection = mysql.createConnection({
		host: 'localhost',
		password: '5x5W12',
		user: 'root',
		database: 'consulta'
	})
	return connection;
}

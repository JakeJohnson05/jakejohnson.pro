import { Sequelize } from 'sequelize';
import * as out from 'simple-output';

/** Sequelize is the ORM we are using to interact with the database */
class SequelizeDatabase {
	db: Sequelize;

	constructor() {
		// Set up credentials dependent on environment
		switch (process.env.NODE_ENV) {
			case 'production':
				if (!process.env.JAWSDB_MARIA_URL) throw new Error('JAWSDB MARIA URL for database connection not found');
				this.db = new Sequelize(process.env.JAWSDB_MARIA_URL);
				out.info('Database: JAWSDB');
				break;
			case 'development':
				if (!process.env.DB_USERNAME) throw new Error('Database username not found');
				this.db = new Sequelize(process.env.DB || 'localhost', process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
					host: process.env.DB_HOST,
					dialect: 'mysql',
					pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
					logging: false
				});
				out.info(`Database: \`${process.env.DB || 'localhost'}\``);
				break;
			default:
				throw new Error('Unknown node environment: `' + process.env.NODE_ENV + '`');
		}

		// Test the established connection
		this.db.authenticate().then(
			() => out.success('Connection established to database'),
			(err: any) => out.error('Unable to establish connection to the database: ' + err)
		);

		// Sync the database
		this.db.sync().then(
			() => out.success('Database successfully synced'),
			(err: any) => out.error('Could not sync with the database: ' + err)
		);
	}
}

export const database = new SequelizeDatabase().db;

import { createClient } from "redis"

const redis = createClient( {
	url: `redis://localhost:6677`,
} )

redis.on( "error", err => {

	console.error( "Redis error", err )
} )

// Connect only when first used
let isConnected = false

const ensureConnected = async () => {

	if ( !isConnected && !redis.isOpen ) {

		await redis.connect()

		isConnected = true
	}
}

// Wrap Redis methods to ensure connection
const redisWrapper = {
	async ping() {

		await ensureConnected()

		return redis.ping()
	},
	async info( section ) {

		await ensureConnected()

		return redis.info( section )
	},
	async set( key, value ) {

		await ensureConnected()

		return redis.set( key, value )
	},
	async get( key ) {

		await ensureConnected()

		return redis.get( key )
	},
	async del( key ) {

		await ensureConnected()

		return redis.del( key )
	},
	async quit() {

		if ( isConnected ) {

			await redis.quit()

			isConnected = false
		}
	}
}

export default redisWrapper

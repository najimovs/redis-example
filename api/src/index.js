import fastify from "fastify"
import redis from "./redis.js"

//

const PORT = parseInt( process.env.API_PORT ) || 3_000

const app = fastify( { logger: true } )

app.get( "/heavy", async () => {

	const cache = await redis.get( "/heavy" )

	if ( cache ) {

		return cache
	}
	else {

		const result = await getData()

		redis.set( "/heavy", JSON.stringify( result ), { EX: 10 } )

		return result
	}
} )

app.listen( { port: PORT } )

function getData() {

	return new Promise( resolve => {

		setTimeout( () => resolve( [ Math.random() ] ), 2_000 ) 
	} )
}

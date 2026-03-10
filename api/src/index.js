import { createClient } from "redis"

const redis = await createClient( {
	url: "redis://localhost:6677"
} )

await redis.connect()

redis.on( "error", error => console.log( error ) )

redis.set( "myKey", 20, { EX: 10 } )

setInterval( async () => {

	console.log( await redis.get( "myKey" ) )

}, 1_000 )

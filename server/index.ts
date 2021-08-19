import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextConfig } from "next/dist/server/config-shared";
import { Socket } from "socket.io-client";

const next = require("next"),
	app = require("express")(),
	server = require("http").createServer(app),
	io = require("socket.io")(server);

const dev: Boolean = process.env.NODE_ENV !== "production",
	PORT: Number | String = 3000 || process.env.PORT,
	nextApp: NextConfig = next({ dev }),
	handle: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then((): void => {
	app.get("*", (req: NextApiRequest, res: NextApiResponse) => {
		return handle(req, res);
	});

	io.on("connect", (socket: Socket) => {
		socket.emit("Welcome", { message: "Welcome" });
	});

	server.listen(PORT, (): void => {
		console.log(`> Server listening on port http://localhost/${PORT}`);
	});
});

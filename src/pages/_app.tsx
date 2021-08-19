import React from "react";
import { AppProps } from "next/app";

import "tailwindcss/tailwind.css";

import io from "socket.io-client";

const socket = io();

socket.on("Welcome", ({ message }) => {
	console.log(message);
});

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;

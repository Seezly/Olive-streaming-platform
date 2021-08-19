import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Home = (): ReactElement => (
	<Layout title="Olive | Streaming Platform">
		<section className="container max-w-none min-h-screen">
			<h1 className="font-title text-4xl text-center">Hey, Olive!</h1>
		</section>
	</Layout>
);

export default Home;

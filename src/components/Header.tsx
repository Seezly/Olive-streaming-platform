import React, { ReactElement } from "react";
import Link from "next/Link";
import Image from "next/Image";
import OliveLogo from "../public/assets/images/olive.png";

const Header = (): ReactElement => (
	<header className="container flex justify-between max-w-none p-2">
		{/* <Image src={OliveLogo} width="500" height="500" /> */}
		<form action="" className="w-1/3 relative">
			<input
				type="text"
				placeholder="Search streamers, clips, titles..."
				className="w-full h-full"
			/>
			<button className="absolute bg-mediumSlateBlue h-full w-1/6 inset-0 left-auto hover:bg-tartOrange transition-all">
				🔎
			</button>
		</form>
		<nav className="w-1/3 flex justify-evenly">
			<Link href="/">
				<a className="flex items-center hover:text-orangePeel transition-all">
					Home
				</a>
			</Link>
			<Link href="/about">
				<a className="flex items-center hover:text-orangePeel transition-all">
					About
				</a>
			</Link>
			<Link href="/buy-coins">
				<a className="flex items-center hover:text-orangePeel transition-all">
					Buy Coins!
				</a>
			</Link>
			<Link href="/login">
				<a className="flex items-center hover:text-orangePeel transition-all">
					Login
				</a>
			</Link>
			<Link href="/signup">
				<a className="flex items-center text-isabelline hover:bg-mediumSlateBlue transition-all bg-tartOrange shadow-mediumSlateBlue hover:shadow-tartOrange p-2">
					Signup
				</a>
			</Link>
		</nav>
	</header>
);

export default Header;

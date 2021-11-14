import React, { ReactElement } from "react";
import Link from "next/Link";
import OliveLogo from "../../public/assets/images/olive-logo.svg";
import DarkOliveLogo from "../../public/assets/images/olive-logo-dark.svg";

const Header = (): ReactElement => (
	<header className="container flex justify-between max-w-none p-2 h-16">
		<div className="w-1/3 overflow-hidden">
			<img src="/assets/images/olive-logo.svg" className="h-full transform scale-300 translate-x-8"/>
		</div>
		<form action="" className="w-1/3 relative">
			<input
				type="text"
				placeholder="Search streamers, clips, titles..."
				className="w-full h-full"
			/>
			<button className="absolute hover:bg-mediumSlateBlue text-isabelline h-full w-1/6 inset-0 left-auto bg-tartOrange dark:bg-mediumSlateBlue dark:hover:bg-orangePeel transition-all">
				🔎
			</button>
		</form>
		<nav className="w-1/3 flex justify-evenly">
			<Link href="/">
				<a className="flex items-center hover:text-mediumSlateBlue dark:text-isabelline dark:hover:text-orangePeel transition-all">
					Home
				</a>
			</Link>
			<Link href="/about">
				<a className="flex items-center hover:text-mediumSlateBlue dark:text-isabelline dark:hover:text-orangePeel transition-all">
					About
				</a>
			</Link>
			<Link href="/buy-coins">
				<a className="flex items-center hover:text-mediumSlateBlue dark:text-isabelline dark:hover:text-orangePeel transition-all">
					Buy Coins!
				</a>
			</Link>
			<Link href="/login">
				<a className="flex items-center font-light text-tartOrange hover:text-mediumSlateBlue dark:text-isabelline dark:hover:text-orangePeel transition-all">
					Login
				</a>
			</Link>
			<Link href="/signup">
				<a className="flex items-center text-isabelline font-semibold hover:bg-mediumSlateBlue transition-all bg-tartOrange shadow-mediumSlateBlue hover:shadow-tartOrange dark:bg-mediumSlateBlue dark:hover:shadow-mediumSlateBlue dark:shadow-orangePeel dark:hover:bg-orangePeel p-2">
					Signup
				</a>
			</Link>
		</nav>
	</header>
);

export default Header;

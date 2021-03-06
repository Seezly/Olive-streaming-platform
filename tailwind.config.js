module.exports = {
	purge: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		fontFamily: {
			title: ["DM Sans", "Open Sans", "monospace"],
			body: ["Montserrat", "Helvetica neue", "Helvetica"],
		},
		fontSize: {
			base: "18px",
			title: "2rem",
			subtitle: "1.75rem",
		},
		textColor: {
			blackCoffee: "#393234",
			isabelline: "#f7f4f3",
			tartOrange: "#f05751",
			mediumSlateBlue: "#884dff",
			orangePeel: "#ff9f1a",
		},
		backgroundColor: {
			blackCoffee: "#393234",
			isabelline: "#f7f4f3",
			tartOrange: "#f05751",
			mediumSlateBlue: "#884dff",
			orangePeel: "#ff9f1a",
		},
		boxShadow: {
			innerBlackCoffee: "inset -0.2rem -0.2rem #393234",
			innerIsabelline: "inset -0.2rem -0.2rem #f7f4f3",
			innerTartOrange: "inset -0.2rem -0.2rem #f05751",
			innerMediumSlateBlue: "inset -0.2rem -0.2rem #884dff",
			innerOrangePeel: "inset -0.2rem -0.2rem #ff9f1a",
			blackCoffee: "0.2rem 0.2rem #393234",
			isabelline: "0.2rem 0.2rem #f7f4f3",
			tartOrange: "0.2rem 0.2rem #f05751",
			mediumSlateBlue: "0.2rem 0.2rem #884dff",
			orangePeel: "0.2rem 0.2rem #ff9f1a",
		},
		scale: {
			300: "3",
		},
		margin: {
			4: "1rem",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};

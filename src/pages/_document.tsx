import React, { ReactElement } from "react";
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render(): ReactElement {
		return (
			<Html lang="en" className="text-base">
				<Head></Head>
				<body className="font-body text-blackCoffee leading-8 bg-isabelline dark:bg-blackCoffee dark:text-isabelline min-h-screen">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

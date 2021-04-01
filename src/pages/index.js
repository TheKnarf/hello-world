const GoogleFont = ({
	family,
	display
}) => {
	return <>
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link href={`https://fonts.googleapis.com/css2?family=${family}&display=${display}`} rel="stylesheet" />
	</>
};

const HomePage = ({
	title,
	bgcolor,
	textcolor,
	fontFamily,
	fontSize,
	top,
	marginLeft,
	googleFontFamily,
	googleFontDisplay
}) => {
	const style = `
	body {
		background-color: ${bgcolor};
		color: ${textcolor};
		font-family: ${fontFamily};
		font-size: ${fontSize};
	}
	span {
		position: absolute;
		top: ${top};
		margin-left: ${marginLeft};
	}
`;
  return <>
		{ googleFontFamily && <GoogleFont family={googleFontFamily} display={googleFontDisplay} /> }
		<style>{style}</style>
		<span>{ title }</span>
	</>
}

export default HomePage;

export async function getServerSideProps(context) {
  return {
    props: {
			title: process.env.title ||  "Hello World.",
			bgcolor: process.env.bgcolor || "#2C5F2DFF",
			textcolor: process.env.textcolor || "#FFE77AFF",
			fontFamily: process.env.fontFamily || "sans-serif",
			fontSize: process.env.fontSize || "20vh",
			top: process.env.top || "20vh",
			marginLeft: process.env.marginLeft || "17vw",
			googleFontFamily: process.env.googleFontFamily || "",
			googleFontDisplay: process.env.googleFontDisplay || "",
		}
  }
}

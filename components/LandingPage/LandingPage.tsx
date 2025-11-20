import Landing from "./Landing";
import Footer from "./Footer";
import FAQ from "./FAQ";
import HowItWorks from "./HowItWorks";
import Gallery from "./Gallery";
import Pharagraph from "./Word";
import ParallaxDivider from "./ParallaxDivider";
import ParallaxDividerReverse from "./ParallaxDividerReverse";

const LandingPage = () => {
	const sampletext =
		"FaceScape is an interactive AI website  _image2_ that reacts to your emotions in real-time using your webcam. _image_ Watch background and content shift based on mood while learning how AI works. _image3_ It's easier to get started with AI than you think!";

	return (
		<div className="flex flex-col pt-[0vh] w-full overflow-x-hidden">
			<Landing />
			<ParallaxDividerReverse />
			<Pharagraph value={sampletext} />
			<ParallaxDivider />
			<Gallery />
			<ParallaxDividerReverse />
			<FAQ />
			<ParallaxDivider />
			<HowItWorks />
			<Footer />
		</div>
	);
};

export default LandingPage;

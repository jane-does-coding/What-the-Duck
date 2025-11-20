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
		"What the Duck is an AI-powered sprint analyzer _image2_ that detects chaos risks, vague requirements, and anti-patterns in your workflow. _image_ With rollover rates hovering around 30%, the goal is to reduce sprint waste and improve team predictability. _image3_";

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

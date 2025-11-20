"use client";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxDivider = () => {
	const { scrollYProgress } = useScroll();

	const x = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

	return (
		<div className="relative w-screen overflow-hidden w-[100vw] max-w-[100vw]">
			<motion.img
				src="/leaf-divider-long.png"
				alt="divider"
				style={{ x }}
				className="
          w-[200vw]
          select-none
          pointer-events-none
          translate-x-[-100vw]  
                    min-w-[200vw]

        "
			/>
		</div>
	);
};

export default ParallaxDivider;

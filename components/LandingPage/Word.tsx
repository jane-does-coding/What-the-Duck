"use client";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";
import React, { useRef, ReactNode } from "react";

const Pharagraph = ({ value }: { value: string }) => {
	const element = useRef(null);
	const { scrollYProgress } = useScroll({
		target: element,
		offset: ["start 0.7", "start 0.1"],
	});

	const imageMap: Record<string, string> = {
		_image_: "/ducky.png",
		_image2_: "/ducky-stamp.png",
		_image3_: "/ducky-peeking.png",
	};

	const words = value.split(" ");

	return (
		<div className="w-full pb-[15vh] pt-[15vh] flex flex-col items-center justify-center bg-white text-black">
			<h3 className="w-fit mx-auto px-6 py-2 border-dashed border-black border-2 text-[1.2rem] rounded-full font-extrabold">
				What the Duck?!
			</h3>
			<p
				className="text-[6vh] w-full md:max-w-[80vw] p-[40px] flex flex-wrap text-center items-center justify-center pt-6 mx-auto"
				ref={element}
			>
				{words.map((word: string, i: number) => {
					const start = i / words.length;
					const end = start + 1 / words.length;

					if (imageMap[word]) {
						return (
							<Word range={[start, end]} progress={scrollYProgress} key={i}>
								<img
									src={imageMap[word]}
									alt=""
									className="inline-block w-[9vh] h-[9vh] rounded-md align-middle object-cover"
								/>
							</Word>
						);
					}

					return (
						<Word range={[start, end]} progress={scrollYProgress} key={i}>
							{word}
						</Word>
					);
				})}
			</p>
		</div>
	);
};

const Word = ({
	children,
	range,
	progress,
}: {
	children: ReactNode;
	range: [number, number];
	progress: MotionValue<number>;
}) => {
	const opacity = useTransform(progress, range, [0.1, 1]);
	return (
		<motion.span style={{ opacity }} className="mr-4">
			{children}
		</motion.span>
	);
};

export default Pharagraph;

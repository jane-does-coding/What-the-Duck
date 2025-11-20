"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const faqs = [
	{
		question: "What is What the Duck?!",
		answer:
			"It's an AI-powered sprint analyzer that detects chaos risks, vague tasks, and anti-patterns before they derail your sprint.",
	},
	{
		question: "How does it reduce rollover?",
		answer:
			"The system highlights tasks likely to spill over and suggests fixes, helping teams reduce rollover from ~30% to healthier levels.",
	},
	{
		question: "What kind of predictions does it make?",
		answer:
			"It uses Monte Carlo simulations to generate best, worst, and most likely outcomes for sprint success.",
	},
	{
		question: "Can it detect unclear or incomplete tasks?",
		answer:
			"Yes! It flags vague descriptions, missing acceptance criteria, blocked dependencies, and other anti-practices.",
	},
	{
		question: "Does it work with uploaded sprint files?",
		answer:
			"It analyzes JSON, CSV, PDF, or text-based sprint plans and converts them into structured data automatically.",
	},
	{
		question: "Can it integrate with real tools like Jira?",
		answer:
			"Integration support is planned. For now you can export from Jira and upload directly for immediate analysis.",
	},
];

const FAQItem = ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.scrollHeight);
		}
	}, [contentRef, answer]);

	return (
		<div
			className="w-full mx-auto my-4 rounded-[2vh] overflow-hidden cursor-pointer bg-[#F7F4EA]"
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className="bg-[#F7F4EA] py-[1.5vh] px-[2vw] font-bold text-[3vh] flex justify-between items-center">
				{question}
				<span>{isOpen ? "−" : "+"}</span>
			</div>

			<motion.div
				animate={{ height: isOpen ? height : 0 }}
				transition={{ duration: 0.25, ease: "easeInOut" }}
				className="overflow-hidden"
			>
				<div
					ref={contentRef}
					className="py-[1.5vh] px-[2vw] text-[2.25vh] border-t font-extrabold"
				>
					{answer}
				</div>
			</motion.div>
		</div>
	);
};

const FAQ = () => {
	return (
		<div>
			<div className="bg-[#42b0f5] py-[12.5vh] w-full relative my-[8vh]">
				<div className="absolute left-0 w-full bg-white h-[15vh] top-[-8vh] z-[10] rounded-[15vh] border-b-4"></div>
				<img
					src="/ducky-mail.png"
					className="w-[10vw] mx-auto mb-[3vh]"
					alt=""
				/>
				<div className="flex gap-[1vw] w-[70vw] mx-auto items-center justify-center transition-all">
					<div className="py-[0vh] gap-[1vh] w-1/2 transition-all">
						{faqs.slice(0, 3).map((faq, index) => (
							<FAQItem
								key={index}
								question={faq.question}
								answer={faq.answer}
							/>
						))}
					</div>
					<div className="py-[0vh] gap-[1vh] w-1/2 transition">
						{faqs.slice(3, 7).map((faq, index) => (
							<FAQItem
								key={index}
								question={faq.question}
								answer={faq.answer}
							/>
						))}
					</div>
				</div>
				<div className="absolute left-0 w-full bg-white h-[15vh] bottom-[-8vh] z-[10] rounded-[15vh] border-t-4"></div>
			</div>
		</div>
	);
};

export default FAQ;

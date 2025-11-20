"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const faqs = [
	{
		question: "What is 'What the Duck?!'?",
		answer:
			"It's a playful way to describe unexpected surprises in sprint planning. Our platform helps you avoid them!",
	},
	{
		question: "How does AI help with my sprints?",
		answer:
			"AI can analyze your workflow, predict bottlenecks, and suggest optimal task distribution.",
	},
	{
		question: "Can I integrate with other tools?",
		answer:
			"Yes! You can connect your GitHub, Jira, or other project management tools easily.",
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
						{faqs.map((faq, index) => (
							<FAQItem
								key={index}
								question={faq.question}
								answer={faq.answer}
							/>
						))}
					</div>
					<div className="py-[0vh] gap-[1vh] w-1/2 transition">
						{faqs.map((faq, index) => (
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

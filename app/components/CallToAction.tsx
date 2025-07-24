import { motion } from "motion/react";

interface CallToActionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick: () => void;
  className?: string;
}

export default function CallToAction({
  title = "Ready to Work Together?",
  description = "Let's discuss how my skills and experience can help bring your next project to life.",
  buttonText = "Return to Portfolio",
  onButtonClick,
  className = "",
}: CallToActionProps) {
  return (
    <motion.section
      className={`flex flex-col items-center text-center gap-6 ${className}`}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="border border-black bg-white flex flex-col items-center gap-6 p-12 max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-black">{title}</h2>
        <p className="text-xl text-black">{description}</p>
        <button
          onClick={onButtonClick}
          className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 border border-black rounded-full"
        >
          {buttonText}
        </button>
      </div>
    </motion.section>
  );
}

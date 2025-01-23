import * as motion from "motion/react-client";

export default function BouncingBall() {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* Ball */}
      <motion.circle
        cx="100"
        cy="50"
        r="20"
        fill="#F94C35"
        initial={{ cy: 50 }}
        animate={{
          cy: [50, 150, 50], // Bouncing effect
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}
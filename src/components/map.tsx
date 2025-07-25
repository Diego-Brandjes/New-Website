import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface PathDrawingProps {
  darkMode: boolean;
  country: string;
}


const countryPaths: Record<string, string[]> = {
  japan: [
    // existing Japan path(s)
    "M77.972,205.527l3.567,4.927l-6.62,7.338l-10.572-0.462l-5.414,2.72l-4.773,8.442l-5.517-1.155l-2.078-1.719l-1.129-8.827 l4.927-4.208l1.822-5.029l5.671,1.642l6.928-1.18l0.975-2.899l8.031-3.13L77.972,205.527z M231.618,32.893l1.257-8.365l-4.644,5.055 h-5.979l-2.284-2.746l-7.082-1.052l-9.391-7.133L189.948,2l-4.773,6.363l2.617,7.287l-1.745,15.164l-4.003,4.131l1.411,6.415 l-2.822,3.823l-5.594-0.693l-7.415,7.852l-5.209,1.719l-1.309,7.595l4.798,4.901l-2.284,7.698l3.053,2.951l6.004-7.544l1.001-5.825 l-5.722-2.335l1.232-4.465l4.798-1.078l3.823,4.542l9.571-5.542l20.604,12.188l1.488-7.133l3.746-6.363l8.981-6.569l9.109-0.103 l4.567-6.004L231.618,32.893z M187.1,94.603l-3.438-4.003l-0.821-12.83l-6.543-2.335l-1.95,6.492l6.492-1.693l-0.693,5.979 l-12.701,1.77l-5.183,3.053l0.565,3.9l1.283,16.935l-2.463,7.082l-4.901,10.366l-1.796,6.825l-8.442,6.081l-4.234,7.672 l-4.978,3.875l-9.366,3.515l-4.285,3.721l-4.105-3.695l1.206-5.953l-5.209-1.591l-0.231,8.929l-8.365,10.341l-4.285,5.517 l0.026,6.286l-7.595,1.18l-3.515-4.413l-5.568,1.77l-7.492,0.565l-15.703,1.334l-0.975-1.386l-9.468,1.001l-3.849,4.567 l-11.906,8.237l-4.388,4.182l-5.157-0.513l-3.823,5.388l5.927,4.054l8.621-0.949l3.951,3.105l2.669-5.645l4.978,0.385l13.728-4.105 l8.288-0.411l5.081-2.977l6.723-0.616l4.388,2.848l5.619-0.898l-5.363,6.902l-0.744,7.569l10.315,7.954l3.669-3.567l3.772-6.8 l10.879-6.261l-5.799-4.747l3.772-6.184l2.284,4.696l8.262,2.232l11.316-0.411l5.26-6.877l2.72,6.774l6.03-2.463l-0.616-4.516 l6.851-3.002l3.618-4.054l1.206-2.181l-0.231,11.803l8.083-3.772l1.36-6.748l5.619-3.079l-4.157-7.775l3.284-12.522l2.386-2.181 l1.206-7.518l-1.591-9.366l2.386-8.801l3.387-0.693l4.336-10.238l2.951-1.026l3.053-9.519l-1.796-8.313L187.1,94.603z M35.609,213.815l-8.083-1.36l-3.9-5.542h-6.569l-2.001,4.465l-5.748,2.13l-3.669,1.95l-3.515,6.184l3.438,6.261l5.363-4.67 l2.617-3.413l0.924,3.079l2.258,3.284l-1.206,7.108l-3.875,4.542l-3.413,6.569l2.309,3.284l-2.489,6.8L18.905,258l4.182-6.261 l2.617,1.77l7.441-20.579l3.284-3.336l2.669-3.336l-4.285-6.774L35.609,213.815z"
  ]
};


const draw = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    fill: "rgba(0, 0, 0, 0)" // transparent fill initially
  },
  visible: (i: number) => {
    const delay = i * 0.9;
    return {
      pathLength: 1,
      opacity: 1,
      fill: "rgba(0, 0, 0, 1)", // fully colored after
      transition: {
        pathLength: { delay, type: "spring", duration: 6.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
        fill: { delay: delay + 1.5, duration: 1 } // start filling after drawing
      }
    };
  }
};

export default function PathDrawing({ darkMode, country }: PathDrawingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
return (
  <motion.svg
    ref={ref}
    viewBox="0 0 250 260"   // Defines internal coordinates
    initial="hidden"
    animate={controls}
    style={{
      width: "80vw",         // Fill container width
      height: "75vh",        // Maintain aspect ratio
    }}
  >
    {countryPaths[country]?.map((d, i) => (
      <motion.path
        key={i}
        d={d}
        stroke={darkMode ? "#ffffff" : "#000000"}
        variants={draw}
        custom={i + 1}
        style={{
          strokeWidth: 1,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
    ))}
  </motion.svg>
);
}

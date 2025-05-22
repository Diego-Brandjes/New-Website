"use client";

import * as motion from "motion/react-client";

export default function Drag() {
    return (
        <motion.div drag style={box}>
            <p style= {textStyle}>404</p>
        </motion.div>
    );
}

/**
 * ==============   Styles   ================
 */

const box: React.CSSProperties = {
    width: 150,
    height: 150,
    backgroundColor: "black",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "grab", // Show grab cursor for draggable items
};

const textStyle: React.CSSProperties = {
    fontFamily: "poppins",
    fontSize: "4vh",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
};

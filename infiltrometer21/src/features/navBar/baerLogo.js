import React from "react"

export function BaerLogo(props) {
    return (
        <svg viewBox={"0 0 " + props.width + " " + props.height} width="127" height="53">
            <path fill="#ffffff" d="M34 29L34 31L35.4722 32.5L36.6944 34.0556L37.1944 35L37.4722 37L37 39L36.6667 40L36.3333 41L35.3333 44L35 45L34.6944 46L34.4167 47L34.1111 49L34.1111 50L34.3889 52L34.7778 54L34.9167 55L34.9722 57L34.9167 58L34.7778 59L34.3611 61L34.1389 62L33.8611 63L33.3889 65L33.1944 66L32.8056 68L32.3889 70L32.0833 72L31.9167 74L31.7778 75L31.3889 77L31.0833 79L31.0278 80L31 82L31 84L31 87L31 90L31 91L31.0278 93L31.0833 94L31.2222 95L31.7222 97L32.6389 98.9167L34.1111 100.583L36 102L37 102.667L38 103.333L40 104.611L41 105.194L43 106.389L45 107.611L47 108.75L48 109.222L50 110.222L51 110.75L53 111.5L54.9722 111.583L55.8889 111.25L57.2778 109.889L57.8333 108.056L57.7222 107.056L57 105L58.5 104.333L60.0556 103.583L62 102.889L63 102.639L64 102.389L66 102.083L68 102L69 102L71 101.917L73 101.611L74 101.389L75 101.222L77 101.111L79 101.472L80 101.833L81 102.167L82 102.556L83 102.833L85 103.361L86 103.611L88 103.833L90 103.583L90.9444 103.333L91.9444 102.972L92.5 102.806L94 102L93.4722 100.583L92.5 99.4167L90.9167 98.25L89.9722 97.75L88.0833 96.5278L86.5 94.9167L85.9444 93.9722L85.4722 93L84.8333 91L84.5556 90L83.7222 88L82.5278 86L81.75 85L79.9722 83L79 82L77 80.0833L76 79.2222L74 77.6111L72 75.9167L70.1111 74.0556L69.3056 73.0556L68.7778 72.5L68 71L70.0556 70.9167L72 70.5278L74 69.7222L75 69.1667L77 68.0278L79 67.1667L80 66.9722L82 67.25L83 67.5556L84.9444 67.9167L85.5 67.9722L87 68L87 66.5L86.9167 64.9444L86.75 64L86.5278 63L86.1389 62L85.1389 60.0833L83.75 58.5L82.9167 57.9444L81 57.25L80 57.0833L78 57L77 57L75 56.9722L74 56.8889L72 56.3056L70.0556 55.1944L69.5 54.75L68 54L68 52L69.25 51.2222L69.6667 50.6944L71.1389 48.9722L72.6389 47.0278L73.3889 46.0833L75.0556 44.3889L75.9444 43.6111L77.5278 41.9167L78.1389 40.9722L78.7222 40L79.1389 39.0556L79.7222 37.5L80 36L78.5 35.3056L77.9444 35.3333L76.9444 35.2778L75 35.6944L73 36.3889L72 36.8333L70 37.7778L69 38.2222L68 38.7778L67 39.25L65 40.3611L64.0556 40.9167L63.0556 41.3611L62.5 41.6667L61 42L61 38.9444L61 37L61.0278 35L61.25 33L61.5 32L62.3889 30L62.9167 29L63.6944 27L63.9722 25L64 23L64 22.0556L64 19L61.9444 19L60 18.9167L58 18.5278L57 18.1667L55 17.4722L53 17.1111L52 17.1111L51 17.2222L49 17.6389L47 18.1667L46 18.4722L44.0833 19.5L43.2222 20.25L42.4167 21.0833L41 22.9722L39.5833 24.75L38.7778 25.5278L37.0278 26.7778L35.5 27.7778L34 29M53 21L52.2778 22.1389L51.75 22.3333L50 23L51 21L53 21M63 27L62.2222 27.7222L61.75 27.75L60.9444 27.9444L59 28L59.7778 27.2778L60.25 27.25L61.0556 27.0556L63 27M39 29.3333L39.3333 29.6667L38.6667 29.6667L39 29.3333M65 56L64.2222 57.5L62.9444 58.9444L62.0278 59.6944L61.5 60.2222L60 61L60.7778 59.5L62.0556 58.0556L62.9722 57.3056L63.5 56.7778L65 56M64.6667 59.6667L64.6667 60.3333L64.3333 60.3333L64.3333 59.6667L64.6667 59.6667M59 61L58 63L57 63L57 62L59 61M65.6667 62.6667L65.6667 63.3333L65.3333 63.3333L65.3333 62.6667L65.6667 62.6667M70.6667 84.6667L70.6667 85L70.3333 85.3333L70.3333 84.6667L70.6667 84.6667M70 87L69.9167 88.5L69.7778 89.0556L69.3333 90.9444L68.9722 91.9444L68.8056 92.5L68 94L67.5278 93.2222L67.6667 92.6944L67.75 91.8889L68.3333 90.0278L68.6389 89.1111L69.0278 88.3056L69.1944 87.7778L70 87M36 88L39 88L40 89L35 89L36 88M42 89L41 90L42 89M67 95L66 96L67 95z" />
        </svg>
    );
}



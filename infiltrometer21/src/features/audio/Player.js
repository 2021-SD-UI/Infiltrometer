import { useState, useEffect } from "react";

export const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (playing) {
            audio.play()
        }
        else {
            audio.pause();
            audio.currentTime = 0;
        }
    },
        [playing, audio]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [playing, setPlaying];
};

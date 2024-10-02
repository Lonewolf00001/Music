const synth = new Tone.Synth().toDestination();
const bass = new Tone.MembraneSynth().toDestination();
const drums = new Tone.Sampler({
    urls: {
        "C2": "https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/samples/drum/kick.wav",
        "D2": "https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/samples/drum/snare.wav",
        "E2": "https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/samples/drum/hihat.wav"
    },
    baseUrl: "https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/samples/drum/"
}).toDestination();

const playMelody = (time) => {
    const melodyNotes = [
        "C4", "C4", "E4", "G4",
        "A4", "G4", "E4", "E4",
        "C4", "C4", "E4", "G4",
        "A4", "G4", "E4", "E4",
        "C5", "B4", "A4", "G4",
        "A4", "G4", "E4", "C4",
        "A4", "A4", "G4", "E4",
        "C4", "C4", "E4", "G4",
        "A4", "G4", "E4", "E4"
    ];

    const noteDuration = "8n";
    melodyNotes.forEach((note, index) => {
        synth.triggerAttackRelease(note, noteDuration, time + index * 0.5);
    });
};

const playBass = (time) => {
    const bassNotes = [
        "C2", "C2", "G2", "G2",
        "E2", "E2", "A2", "A2",
        "C2", "C2", "G2", "G2",
        "E2", "E2", "A2", "A2",
        "D2", "D2", "C2", "C2",
        "G2", "G2", "E2", "E2",
        "A2", "A2", "G2", "G2",
        "C2", "C2", "E2", "E2"
    ];

    const bassDuration = "2n";
    bassNotes.forEach((note, index) => {
        bass.triggerAttackRelease(note, bassDuration, time + index * 1);
    });
};

const playDrums = (time) => {
    drums.triggerAttack("C2", time);
    drums.triggerAttack("D2", time + 0.5);
    drums.triggerAttack("E2", time + 0.25);
    drums.triggerAttack("E2", time + 0.75);
};

const loopDuration = 16;

Tone.Transport.scheduleRepeat((time) => {
    playMelody(time);
    playBass(time);
    playDrums(time);
}, loopDuration + 0.5);

document.getElementById("startButton").onclick = function() {
    Tone.start().then(() => {
        Tone.Transport.start();
    });
};
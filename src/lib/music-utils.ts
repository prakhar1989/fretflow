export type SCALE = "MAJOR" | "NATURAL MINOR" | "MAJOR PENTATONIC" | "MINOR PENTATONIC";

export const NOTES = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
] as const;

export type KEY = typeof NOTES[number];

export const GUITAR_TUNINGS: Map<string, KEY[]> = new Map([
    ["Standard Tuning", ["E", "A", "D", "G", "B", "E"]],
    ["E Flat Standard Tuning", ["D#", "G#", "C#", "F#", "A#", "D#"]],
    ["D Standard Tuning", ["D", "G", "C", "F", "A", "D"]],
    ["Drop D Tuning", ["D", "A", "D", "G", "B", "E"]],
    ["Drop C Tuning", ["C", "G", "C", "F", "A", "D"]],
    ["Drop B Tuning", ["B", "F#", "B", "E", "G#", "C#"]],
    ["Drop C Sharp Tuning", ["C#", "G#", "C#", "F#", "A#", "D#"]],
    ["Open G Tuning", ["D", "G", "D", "G", "B", "D"]],
    ["Open D Tuning", ["D", "A", "D", "F#", "A", "D"]],
    ["Open C Tuning", ["C", "G", "C", "G", "C", "E"]],
    ["Open A Tuning", ["E", "A", "E", "A", "C#", "E"]],
    ["DADGAD Tuning", ["D", "A", "D", "G", "A", "D"]],
]);

const MAJOR_SCALE_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
const NATURAL_MINOR_SCALE_INTERVALS = [2, 1, 2, 2, 1, 2, 2];
const MAJOR_PENTATONIC_SCALE_INTERVALS = [2, 2, 3, 2, 3];
const MINOR_PENTATONIC_SCALE_INTERVALS = [3, 2, 2, 3, 2];

type ChordQuality = 'major' | 'minor' | 'diminished';

export const generateScaleNotes = (key: KEY, scale: SCALE): Set<KEY> => {
    let intervals = null;

    if (scale === "MAJOR") {
        intervals = MAJOR_SCALE_INTERVALS;
    }

    if (scale === "NATURAL MINOR") {
        intervals = NATURAL_MINOR_SCALE_INTERVALS;
    }

    if (scale === "MAJOR PENTATONIC") {
        intervals = MAJOR_PENTATONIC_SCALE_INTERVALS;
    }

    if (scale === "MINOR PENTATONIC") {
        intervals = MINOR_PENTATONIC_SCALE_INTERVALS;
    }

    if (intervals === null) {
        throw new Error("Unsupported scale");
    }

    // add the key
    const notes = new Set<KEY>([]);

    const startIndex = NOTES.indexOf(key);
    let currentIndex = startIndex;

    intervals.forEach(interval => {
        notes.add(NOTES[currentIndex]);
        currentIndex = (currentIndex + interval) % NOTES.length;
    });
    return notes;
}

export function generateCommonChordProgressions(key: KEY, scale: SCALE) {
    const commonProgressions = [
        [1, 4, 5],        // I-IV-V
        [2, 5, 1],        // ii-V-I
        [1, 4, 6, 5],     // I-IV-vi-V
        [1, 3, 4, 5],     // I-iii-IV-V
        [1, 3, 6, 5],     // I-iii-vi-V
    ];

    // assume scale is one of MAJOR or NATURAL MINOR for now
    // generate scale notes return an array of notes in that scale
    const scaleNotes = generateScaleNotes(key, scale);

    // Convert scale degree to chord symbols
    const degreeToRoman = (degree: number, scaleType: SCALE) => {
        const romanNumerals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
        const romanMinorNumerals = ["i", "ii°", "III", "iv", "v", "VI", "VII"];
        return scaleType === "MAJOR" ? romanNumerals[degree - 1] : romanMinorNumerals[degree - 1];
    };

    // Build the result array
    const progressions = commonProgressions.map(progression => {
        const romanNumerals = progression.map(degree => degreeToRoman(degree, scale));
        const chords = progression.map(degree => Array.from(scaleNotes)[degree - 1]);
        return {
            progression: romanNumerals,
            chords: chords
        };
    });

    return progressions;
}

export function generateDiatonicChords(key: KEY, scale: SCALE = "MAJOR"): { chord: string; quality: ChordQuality }[] {
    let effectiveScale = scale;

    // For pentatonic scales, just use the corresponding major or minor
    // since pentatonic scale sound good over the diatonic chords
    if (scale === "MAJOR PENTATONIC") {
        effectiveScale = "MAJOR";
    }
    if (scale === "MINOR PENTATONIC") {
        effectiveScale = "NATURAL MINOR";
    }

    const scaleNotes = generateScaleNotes(key, effectiveScale);
    const majorChordQualities: ChordQuality[] = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished']
    const minorChordQualities: ChordQuality[] = ['minor', 'diminished', 'major', 'minor', 'minor', 'major', 'major'];

    const chords = effectiveScale === "MAJOR" ? majorChordQualities : minorChordQualities;

    return Array.from(scaleNotes).map((note, index) => ({
        chord: note,
        quality: chords[index]
    }))
}

export const generateFretboard = (tuning: KEY[], numberOfFrets = 24) =>
    tuning
        .map((stringNote: KEY) => {
            const startIndex = NOTES.indexOf(stringNote);
            return Array.from({ length: numberOfFrets }).map(
                (_, i) => NOTES[(startIndex + i + 1) % NOTES.length],
            );
        })
        .reverse();
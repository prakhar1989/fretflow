import { generateScaleNotes, generateFretboard, NOTES, GUITAR_TUNINGS, type SCALE, type KEY } from './music-utils';

const STANDARD_TUNING = GUITAR_TUNINGS.get("Standard Tuning")!;

describe('generateFretboard', () => {
  it('should generate the correct fretboard for standard tuning with default frets', () => {
    const fretboard = generateFretboard(STANDARD_TUNING);

    // E string
    expect(fretboard[0]).toEqual(["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"]);

    // B string
    expect(fretboard[1]).toEqual(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);

    // G string
    expect(fretboard[2]).toEqual(['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G']);

    // D string
    expect(fretboard[3]).toEqual(['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D']);

    // A string
    expect(fretboard[4]).toEqual(['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A']);

    // E string
    expect(fretboard[5]).toEqual(["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"]);
  });

  it('should generate the correct fretboard for standard tuning with 3 frets', () => {
    const fretboard = generateFretboard(STANDARD_TUNING, 3);
    // D string
    expect(fretboard[3]).toEqual(['D#', 'E', 'F']);

    // A string
    expect(fretboard[4]).toEqual(['A#', 'B', 'C']);

    // E string
    expect(fretboard[5]).toEqual(["F", "F#", "G"]);
  });

  it('should generate the correct fretboard for a custom tuning - drop C', () => {
    const tuning: KEY[] = ['C', 'G', 'C', 'F', 'A', 'D'];
    const fretboard = generateFretboard(tuning);
    expect(fretboard[5]).toEqual(["C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"]);
    expect(fretboard[3]).toEqual(["C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"]);
  });
});

describe('generateScaleNotes', () => {
  it('should generate the correct notes for a C Major scale', () => {
    const cMajorScale = generateScaleNotes('C', 'MAJOR');
    const expectedNotes = new Set(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    expect(cMajorScale).toEqual(expectedNotes);
  });

  it('should generate the correct notes for a G Major scale', () => {
    const gMajorScale = generateScaleNotes('G', 'MAJOR');
    const expectedNotes = new Set(['G', 'A', 'B', 'C', 'D', 'E', 'F#']);
    expect(gMajorScale).toEqual(expectedNotes);
  });

  it('should throw an error for an unsupported scale', () => {
    expect(() => generateScaleNotes('A', 'MINOR' as SCALE)).toThrowError('Unsupported scale');
  });
});

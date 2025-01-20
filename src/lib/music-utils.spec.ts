import { generateScaleNotes, generateFretboard, generateDiatonicChords, GUITAR_TUNINGS, type SCALE, type KEY } from './music-utils';

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

  // Tests for Natural Minor Scale
  it('should generate the correct notes for an A Natural Minor scale', () => {
    const aMinorScale = generateScaleNotes('A', 'NATURAL MINOR');
    const expectedNotes = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    expect(aMinorScale).toEqual(expectedNotes);
  });

  it('should generate the correct notes for a D Natural Minor scale', () => {
    const dMinorScale = generateScaleNotes('E', 'NATURAL MINOR');
    const expectedNotes = new Set(['E', 'F#', 'G', 'A', 'B', 'C', 'D']);
    expect(dMinorScale).toEqual(expectedNotes);
  });

  // Tests for Major Pentatonic Scale
  it('should generate the correct notes for a C Major Pentatonic scale', () => {
    const cMajorPentatonic = generateScaleNotes('C', 'MAJOR PENTATONIC');
    const expectedNotes = new Set(['C', 'D', 'E', 'G', 'A']);
    expect(cMajorPentatonic).toEqual(expectedNotes);
  });

  it('should generate the correct notes for a G Major Pentatonic scale', () => {
    const gMajorPentatonic = generateScaleNotes('G', 'MAJOR PENTATONIC');
    const expectedNotes = new Set(['G', 'A', 'B', 'D', 'E']);
    expect(gMajorPentatonic).toEqual(expectedNotes);
  });

  // Tests for Minor Pentatonic Scale
  it('should generate the correct notes for an A Minor Pentatonic scale', () => {
    const aMinorPentatonic = generateScaleNotes('A', 'MINOR PENTATONIC');
    const expectedNotes = new Set(['A', 'C', 'D', 'E', 'G']);
    expect(aMinorPentatonic).toEqual(expectedNotes);
  });

  it('should generate the correct notes for a D Minor Pentatonic scale', () => {
    const dMinorPentatonic = generateScaleNotes('D', 'MINOR PENTATONIC');
    const expectedNotes = new Set(['D', 'F', 'G', 'A', 'C']);
    expect(dMinorPentatonic).toEqual(expectedNotes);
  });

  it('should throw an error for an unsupported scale', () => {
    expect(() => generateScaleNotes('A', 'HARMONIC MINOR' as SCALE)).toThrowError('Unsupported scale');
  });
});

describe('generateDiatonicChords', () => {
  it('should generate correct chords for C major', () => {
    const expectedChords = [
      { chord: 'C', quality: 'major' },
      { chord: 'D', quality: 'minor' },
      { chord: 'E', quality: 'minor' },
      { chord: 'F', quality: 'major' },
      { chord: 'G', quality: 'major' },
      { chord: 'A', quality: 'minor' },
      { chord: 'B', quality: 'diminished' },
    ];
    expect(generateDiatonicChords('C')).toEqual(expectedChords);
  });

  it('should generate correct chords for C major pentatonic', () => {
    const expectedChords = [
      { chord: 'C', quality: 'major' },
      { chord: 'D', quality: 'minor' },
      { chord: 'E', quality: 'minor' },
      { chord: 'F', quality: 'major' },
      { chord: 'G', quality: 'major' },
      { chord: 'A', quality: 'minor' },
      { chord: 'B', quality: 'diminished' },
    ];
    expect(generateDiatonicChords('C')).toEqual(expectedChords);
  });


  it('should generate correct chords for A minor', () => {
    const expectedChords = [
      { chord: 'A', quality: 'minor' },
      { chord: 'B', quality: 'diminished' },
      { chord: 'C', quality: 'major' },
      { chord: 'D', quality: 'minor' },
      { chord: 'E', quality: 'minor' },
      { chord: 'F', quality: 'major' },
      { chord: 'G', quality: 'major' },
    ];
    expect(generateDiatonicChords('A', "NATURAL MINOR")).toEqual(expectedChords);
  });

  it('should generate correct chords for A minor pentatonic', () => {
    const expectedChords = [
      { chord: 'A', quality: 'minor' },
      { chord: 'B', quality: 'diminished' },
      { chord: 'C', quality: 'major' },
      { chord: 'D', quality: 'minor' },
      { chord: 'E', quality: 'minor' },
      { chord: 'F', quality: 'major' },
      { chord: 'G', quality: 'major' },
    ];
    expect(generateDiatonicChords('A', "MINOR PENTATONIC")).toEqual(expectedChords);
  });

  it('should generate correct chords for G major', () => {
    const expectedChords = [
      { chord: 'G', quality: 'major' },
      { chord: 'A', quality: 'minor' },
      { chord: 'B', quality: 'minor' },
      { chord: 'C', quality: 'major' },
      { chord: 'D', quality: 'major' },
      { chord: 'E', quality: 'minor' },
      { chord: 'F#', quality: 'diminished' },
    ];
    expect(generateDiatonicChords('G')).toEqual(expectedChords);
  });

  it('should generate correct chords for E minor', () => {
    const expectedChords = [
      { chord: 'E', quality: 'minor' },
      { chord: 'F#', quality: 'diminished' },
      { chord: 'G', quality: 'major' },
      { chord: 'A', quality: 'minor' },
      { chord: 'B', quality: 'minor' },
      { chord: 'C', quality: 'major' },
      { chord: 'D', quality: 'major' },
    ];
    expect(generateDiatonicChords('E', "NATURAL MINOR")).toEqual(expectedChords);
  });

  it('should generate correct chords for D major', () => {
    const expectedChords = [
      { chord: 'D', quality: 'major' },
      { chord: 'E', quality: 'minor' },
      { chord: 'F#', quality: 'minor' },
      { chord: 'G', quality: 'major' },
      { chord: 'A', quality: 'major' },
      { chord: 'B', quality: 'minor' },
      { chord: 'C#', quality: 'diminished' },
    ];
    expect(generateDiatonicChords('D')).toEqual(expectedChords);
  });

  it('should generate correct chords for A major', () => {
    const expectedChords = [
      { chord: 'A', quality: 'major' },
      { chord: 'B', quality: 'minor' },
      { chord: 'C#', quality: 'minor' },
      { chord: 'D', quality: 'major' },
      { chord: 'E', quality: 'major' },
      { chord: 'F#', quality: 'minor' },
      { chord: 'G#', quality: 'diminished' },
    ];
    expect(generateDiatonicChords('A')).toEqual(expectedChords);
  });

  it('should generate correct chords for E major', () => {
    const expectedChords = [
      { chord: 'E', quality: 'major' },
      { chord: 'F#', quality: 'minor' },
      { chord: 'G#', quality: 'minor' },
      { chord: 'A', quality: 'major' },
      { chord: 'B', quality: 'major' },
      { chord: 'C#', quality: 'minor' },
      { chord: 'D#', quality: 'diminished' },
    ];
    expect(generateDiatonicChords('E')).toEqual(expectedChords);
  });
});
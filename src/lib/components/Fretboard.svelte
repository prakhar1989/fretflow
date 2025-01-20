<script lang="ts">
    import {
        GUITAR_TUNINGS,
        type KEY,
        type SCALE,
        generateFretboard,
        generateDiatonicChords,
        generateScaleNotes,
        generateCommonChordProgressions,
    } from "$lib/music-utils";
    import { fade } from "svelte/transition";

    let numberOfFrets = 24;
    let key: KEY = "C";

    $: selectedScale = "MAJOR";
    $: selectedTuning = "Standard Tuning";
    $: fretCount = parseInt(numberOfFrets.toString());
    $: fretboard = generateFretboard(
        GUITAR_TUNINGS.get(selectedTuning)!,
        fretCount,
    );
    $: selectedKey = key;
    $: scaleNotes = generateScaleNotes(key, selectedScale as SCALE);
    $: progressions = generateCommonChordProgressions(
        key,
        selectedScale as SCALE,
    );
    $: showAllNotes = false;
    $: idxToRomanNumeral = (idx: number) =>
        ["I", "II", "III", "IV", "V", "VI", "VII"][idx];
</script>

<article class="controls">
    <div class="grid">
        <div class="all-notes">
            <label>
                All notes
                <input
                    name="notes"
                    type="checkbox"
                    bind:checked={showAllNotes}
                />
            </label>
        </div>
        <div class="keys">
            <label for="key">Key</label>
            <select id="key" bind:value={key}>
                <option value="A">A</option>
                <option value="A#">A#/Bb</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="D">D</option>
                <option value="D#">D#/Eb</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#/Gb</option>
                <option value="G">G</option>
                <option value="G#">G#/Ab</option>
            </select>
        </div>
        <div class="tunings">
            <label for="tuning">Tuning</label>
            <select id="tuning" bind:value={selectedTuning}>
                {#each Array.from(GUITAR_TUNINGS.keys()) as tuningName}
                    <option value={tuningName}>{tuningName}</option>
                {/each}
            </select>
        </div>
        <div class="scales">
            <label for="scale">Scale</label>
            <select id="scale" bind:value={selectedScale}>
                <option value="MAJOR">Major</option>
                <option value="NATURAL MINOR">Natural Minor</option>
                <option value="MINOR PENTATONIC">Minor Pentatonic</option>
                <option value="MAJOR PENTATONIC">Major Pentatonic</option>
            </select>
        </div>
    </div>
</article>

<!--  FRETBOARD -->
<article class="overflow-auto">
    <header class="scale">
        <h3>
            <span class="key">{selectedKey}</span>
            {selectedScale.toLocaleLowerCase()}
            scale
        </h3>
        <nav>
            <ul>
                {#each scaleNotes as note}
                    <li class="fret">{note}</li>
                {/each}
            </ul>
        </nav>
    </header>
    <div class="numbers">
        {#each Array.from( { length: fretCount + 1 }, ).map((_, i) => i) as fretIndex}
            <div class="fret">{fretIndex}</div>
        {/each}
    </div>
    <div class="fretboard-container">
        <div class="tuning">
            {#each GUITAR_TUNINGS.get(selectedTuning)!.reverse() as note, index (index)}
                <div class="string" transition:fade>
                    <div class="fret" class:highlighted={scaleNotes.has(note)}>
                        {note}
                    </div>
                </div>
            {/each}
        </div>
        <div class="fretboard">
            {#each fretboard as string, stringIndex}
                <div class="string" transition:fade>
                    {#each string as note, fretIndex (fretIndex)}
                        <div
                            class="fret"
                            class:root={note === selectedKey}
                            class:hide={!showAllNotes}
                            class:highlighted={scaleNotes.has(note)}
                            transition:fade
                        >
                            {note}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</article>

<div class="grid scale-section">
    <!-- SCALE -->
    <article>
        <header><h3>Diatonic Chords</h3></header>
        <ul class="chords">
            {#each generateDiatonicChords(selectedKey, selectedScale as SCALE) as diatonicChords, index}
                <li>
                    <span class="numeral">{idxToRomanNumeral(index)}</span>
                    <span class="chord">{diatonicChords.chord}</span>
                    {diatonicChords.quality}
                </li>
            {/each}
        </ul>
    </article>

    <!-- Chord Progressions -->
    <article>
        <header><h3>Common Chord Progressions</h3></header>
        <ul class="progressions">
            {#each progressions as progression}
                <li>
                    {#each progression.progression as p, indx}
                        <div class="progress">
                            <span class="chord">{progression.chords[indx]}</span>
                            <span><strong>{p}</strong></span>
                        </div>
                    {/each}
                </li>
            {/each}
        </ul>
    </article>
</div>

<style>
    .scale-section {
        grid-template-columns: 3fr 2fr;
    }

    .controls .grid {
        align-items: center;
    }

    .chords {
        margin: 0;
        padding: 0;
    }

    .chords li {
        list-style-type: none;
        display: flex;
        align-items: center;
        gap: 0.2em;
    }

    .progressions {
        margin: 0;
        padding: 0;
    }

    .progressions li {
        display: flex;
        gap: 20px;
    }

    .progressions .progress {
        display: flex;
        border-radius: 8px;
        padding: 8px 24px;
        flex-direction: column;
        background-color: var(--pico-blockquote-border-color);
        align-items: center;
    }

    .chords li .numeral {
        width: 40px;
        font-weight: 500;
        text-align: right;
        margin-right: 16px;
    }

    .chords li .chord {
        font-size: 1.1em;
        font-weight: 800;
    }

    .fretboard-container {
        display: flex;
        gap: 10px;
    }

    .fretboard {
        display: flex;
        flex-direction: column;
        gap: var(--string-gap);
    }

    article header.scale {
        display: flex;
        gap: 12px;
    }

    article header h3 {
        margin: 0;
        color: var(--pico-primary-background);
    }

    div.string::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        background-color: var(--string-color);
        transform: translateY(-50%);
        z-index: 2;
    }

    .string {
        position: relative;
        display: flex;
        gap: var(--notes-gap);
    }

    .tuning {
        display: flex;
        flex-direction: column;
        gap: var(--string-gap);
        border-right: 16px solid var(--string-color);
        padding-right: 12px;
    }

    .fret {
        text-align: center;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--pico-contrast-underline);
        background-color: var(--pico-blockquote-border-color);
        z-index: 10;
        transition: all 0.1s ease;
    }

    .tuning .fret {
        color: var(--pico-primary);
    }

    .numbers {
        display: flex;
        margin-bottom: 23px;
        gap: var(--notes-gap);
        border-bottom: 4px solid var(--string-color);
        padding-bottom: 12px;
        min-width: 1400px;
    }

    .numbers .fret:first-child {
        visibility: hidden;
        margin-right: 16px;
    }

    .numbers .fret {
        width: 40px;
        height: 40px;
        background: none;
    }

    article header.scale .fret {
        margin: 0 16px;
        background-color: var(--pico-primary-background);
        color: white;
    }

    .fret.hide {
        color: var(--pico-blockquote-border-color);
        transform: scale(0.7);
    }

    .fret.highlighted {
        background-color: var(--pico-primary-background);
        color: white;
        transform: scale(1);
    }

    .fret.root {
        background-color: var(--pico-primary);
        color: white;
        transform: scale(1.2);
    }
</style>

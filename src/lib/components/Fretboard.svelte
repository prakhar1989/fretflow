<script lang="ts">
    import {
        GUITAR_TUNINGS,
        type KEY,
        type SCALE,
        generateFretboard,
        generateScaleNotes,
    } from "$lib/music-utils";

    let numberOfFrets = 24;
    let key: KEY = "A";

    $: selectedScale = "MINOR PENTATONIC";
    $: selectedTuning = "Standard Tuning";
    $: fretCount = parseInt(numberOfFrets.toString());
    $: fretboard = generateFretboard(
        GUITAR_TUNINGS.get(selectedTuning)!,
        fretCount,
    );
    $: selectedKey = key;
    $: scaleNotes = generateScaleNotes(key, selectedScale as SCALE);
</script>

<article class="controls">
    <div class="frets">
        <label for="frets">Frets</label>
        <input type="number" id="frets" bind:value={numberOfFrets} />
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
</article>

<!--  FRETBOARD -->
<article class="overflow-auto">
    <header>
        <h3>
            <span class="key">{selectedKey}</span>
            {selectedScale.toLocaleLowerCase()}
        </h3>
    </header>
    <div class="numbers">
        {#each Array.from( { length: fretCount + 1 }, ).map((_, i) => i) as fretIndex}
            <div class="fret">{fretIndex}</div>
        {/each}
    </div>
    <div class="fretboard-container">
        <div class="tuning">
            {#each GUITAR_TUNINGS.get(selectedTuning)!.reverse() as note}
                <div class="string">
                    <div class="fret" class:highlighted={scaleNotes.has(note)}>
                        {note}
                    </div>
                </div>
            {/each}
        </div>
        <div class="fretboard">
            {#each fretboard as string, stringIndex}
                <div class="string">
                    {#each string as note, fretIndex}
                        <div
                            class="fret"
                            class:root={note === selectedKey}
                            class:highlighted={scaleNotes.has(note)}
                        >
                            {note}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</article>

<style>
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 2em 0;
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
    }

    .numbers .fret:first-child {
        visibility: hidden;
        margin-right: 24px;
    }

    .fret.highlighted {
        background-color: var(--pico-primary-background);
        color: white;
    }

    .fret.root {
        background-color: var(--pico-primary);
        color: white;
    }
</style>

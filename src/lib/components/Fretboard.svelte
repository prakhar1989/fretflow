<script lang="ts">
    import {
        STANDARD_TUNING,
        type KEY,
        generateFretboard,
        generateScaleNotes,
    } from "$lib/music-utils";

    let numberOfFrets = 24;
    let key: KEY = "A";

    $: fretCount = parseInt(numberOfFrets.toString());
    $: fretboard = generateFretboard(STANDARD_TUNING, fretCount);
    $: selectedKey = key;
    $: scaleNotes = generateScaleNotes(key, "MAJOR");
</script>

<div class="controls">
    <div class="frets">
        <label for="frets">Frets</label>
        <input type="number" id="frets" bind:value={numberOfFrets} />
    </div>
    <div class="keys">
        <label for="key">Key</label>
        <select id="key" bind:value={key}>
            <option value="A">A</option>
            <option value="Ab">Ab</option>
            <option value="B">B</option>
            <option value="Bb">Bb</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="D">D</option>
            <option value="Db">Db</option>
            <option value="E">E</option>
            <option value="Eb">Eb</option>
            <option value="F">F</option>
            <option value="F#">F#</option>
            <option value="G">G</option>
            <option value="G#">G#</option>
        </select>
    </div>
</div>

<!--  FRETBOARD -->
<div class="numbers">
    {#each Array.from({ length: fretCount + 1 }).map((_, i) => i) as fretIndex}
        <div class="fret">{fretIndex}</div>
    {/each}
</div>
<div class="fretboard-container">
    <div class="tuning">
        {#each STANDARD_TUNING.reverse() as string}
            <div class="fret">{string}</div>
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

<style>
    .controls {
        display: flex;
        gap: 24px;
        justify-content: center;
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
        gap: 0px;
    }

    .string {
        display: flex;
        gap: 0px;
    }

    .fret {
        padding: 5px;
        border: 1px solid #ccc;
        text-align: center;
        width: 30px;
        color: #454545;
    }

    .tuning .fret {
        color: #ccc;
    }

    .numbers {
        display: flex;
        margin-bottom: 10px;
    }

    .numbers .fret {
        border: 1px solid #242424;
        color: #ccc;
    }

    .numbers .fret:first-child {
        display: hidden;
        margin-right: 10px;
    }

    .fret.highlighted {
        background-color: blue;
        color: white;
    }

    .fret.root {
        background-color: rebeccapurple;
        color: white;
    }
</style>

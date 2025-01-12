<script lang="ts">
    import { STANDARD_TUNING, type KEY, NOTES, generateFretboard, generateScaleNotes } from "$lib/music-utils";

    const NUMBER_OF_FRETS = 24;

    $: fretboard = generateFretboard(STANDARD_TUNING, NUMBER_OF_FRETS);
</script>

<div class="numbers">
    {#each Array.from({ length: NUMBER_OF_FRETS+1 }).map((_, i) => i) as fretIndex}
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
                    <div class="fret">{note}</div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
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
</style>

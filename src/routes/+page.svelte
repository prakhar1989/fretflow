<script lang="ts">
    import Fretboard from "../lib/components/Fretboard.svelte";
    import img from "../lib/fretflow.png";
</script>

<header class="container">
    <img src={img} alt="logo" />
    <hgroup>
        <h1>FretFlow</h1>
        <p>Guitar Fretboard Visualizer</p>
    </hgroup>
</header>

<main class="container">
    <Fretboard></Fretboard>
</main>

<style>
    header {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    img {
        height: 150px;
    }
    h1 {
        font-size: 3em;
    }
</style>

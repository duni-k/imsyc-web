<script>
    import Siema from "siema";
    import { onMount, createEventDispatcher } from "svelte";

    export let perPage = { 300: 1, 900: 2, 1300: 3 };
    export let loop = true;
    export let autoplay = 0;
    export let duration = 200;
    export let easing = "ease-in-out";
    export let startIndex = 0;
    export let draggable = true;
    export let multipleDrag = true;
    export let controls = true;
    export let threshold = 20;
    export let rtl = false;
    let currentIndex = startIndex;

    let siema;
    let controller;
    let timer;
    const dispatch = createEventDispatcher();

    $: pips = controller ? controller.innerElements : [];
    $: currentPerPage = controller ? controller.perPage : perPage;

    onMount(() => {
        controller = new Siema({
            selector: siema,
            perPage: typeof perPage === "object" ? perPage : Number(perPage),
            loop,
            duration,
            easing,
            startIndex,
            draggable,
            multipleDrag,
            threshold,
            rtl,
            onChange: handleChange,
        });

        if (autoplay) {
            timer = setInterval(right, autoplay);
        }
        return () => {
            autoplay && clearInterval(timer);
            controller.destroy();
        };
    });

    export function left() {
        controller.prev();
    }

    export function right() {
        controller.next();
    }

    export function go(index) {
        controller.goTo(index);
    }

    export function pause() {
        clearInterval(timer);
    }

    export function resume() {
        if (autoplay) {
            timer = setInterval(right, autoplay);
        }
    }

    function handleChange(event) {
        currentIndex = controller.currentSlide;
        dispatch("change", {
            currentSlide: controller.currentSlide,
            slideCount: controller.innerElements.length,
        });
    }

    function resetInterval(node, condition) {
        function handleReset(event) {
            pause();
            resume();
        }

        if (condition) {
            node.addEventListener("click", handleReset);
        }

        return {
            destroy() {
                node.removeEventListener("click", handleReset);
            },
        };
    }
</script>

<div class="carousel">
    <div class="slides" bind:this={siema}>
        <slot />
    </div>
    {#if controls}
        <button
            class="left"
            on:click={left}
            use:resetInterval={autoplay}
            aria-label="left"
        >
            <img src="/images/arrow-left.svg" alt="left arrow" />
        </button>
        <button
            class="right"
            on:click={right}
            use:resetInterval={autoplay}
            aria-label="right"
        >
            <img src="/images/arrow-right.svg" alt="right arrow" />
        </button>
    {/if}
</div>

<style>
    .carousel {
        position: relative;
        width: 100vw;
        justify-content: center;
        align-items: center;
    }

    button:focus {
        outline: none;
    }

    .left,
    .right {
        width: 64px;
        height: 128px;
        position: absolute;
        top: 40%;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(2px);
        -webkit-transition: background-color .5s ease-out;
        -moz-transition: background-color .5s ease-out;
        -o-transition: background-color .5s ease-out;
        transition: background-color .5s ease-out;
    }

    .left:hover,
    .right:hover {
        background: rgba(200, 200, 200, 0.3);
    }

    .left {
        left: 3vw;
    }

    .right {
        right: 3vw;
    }
</style>

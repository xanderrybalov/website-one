<script lang="ts">
  import type { CollectionSlide } from "./index.js";

    export let currentIndex: number;
    export let slides: CollectionSlide[];
    export let setSlide: (index: number) => void;
  </script>
  
  <div class="flex space-x-[5.1rem]">
    {#each slides, index}
      <button
        class="w-[0.5rem] h-[0.5rem] rounded-full transition-colors duration-300 focus:outline-none"
        class:bg-[#e3ddd6]={currentIndex === index}
        class:bg-[#6b6d73]={currentIndex !== index}
        role="tab"
        aria-selected={currentIndex === index}
        aria-label={`Go to slide ${index + 1}`}
        on:click={() => setSlide(index)}
      ></button>
    {/each}
  </div>
  

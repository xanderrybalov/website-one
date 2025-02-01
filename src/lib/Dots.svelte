<script lang="ts">
  import type { CollectionSlide } from "./index.js";

    export let currentIndex: number;
    export let slides: CollectionSlide[];
    export let setSlide: (index: number) => void;
  </script>
  
  <!-- Контейнер с точками (прижат к правому краю) -->
  <div class="fixed bottom-0 left-0 w-[70rem] text-white flex justify-end items-center p-primary-padding space-x-[5.3125rem]" role="tablist">
    {#each slides, index}
      <button
        class="w-1.5 h-1.5 rounded-full transition-colors duration-300 focus:outline-none"
        class:bg-[#e3ddd6]={currentIndex === index}
        class:bg-[#6b6d73]={currentIndex !== index}
        role="tab"
        aria-selected={currentIndex === index}
        aria-label={`Go to slide ${index + 1}`}
        on:click={() => setSlide(index)}
      ></button>
    {/each}
  </div>
  
<script lang="ts">
  export let onPrevious: () => void;
  export let onNext: () => void;
  export let currentSlide: number;
  export let totalSlides: number;
  
  $: previousLabel = `Go to previous slide (${currentSlide} of ${totalSlides})`;
  $: nextLabel = `Go to next slide (${currentSlide} of ${totalSlides})`;
</script>

<!-- Контейнер для кнопок навигации -->
<div class="absolute top-[25rem] right-12 transform -translate-y-1/2 flex items-center z-10">
  <button
    class="text-white text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
    on:click={onPrevious}
    aria-label={previousLabel}
  >
    Previous
  </button>

  <div class="h-[2px] w-[80px] bg-white mx-4"></div>

  <button
    class="text-white text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
    on:click={onNext}
    aria-label={nextLabel}
  >
    Next
  </button>
</div>

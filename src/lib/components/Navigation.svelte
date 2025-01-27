<script lang="ts">
    export let onPrevious: () => void;
    export let onNext: () => void;
    export let currentSlide: number;
    export let totalSlides: number;
    
    // Accessibility labels
    $: previousLabel = `Go to previous slide (${currentSlide} of ${totalSlides})`;
    $: nextLabel = `Go to next slide (${currentSlide} of ${totalSlides})`;
  </script>
  
  <div class="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-10">
    <button
      class="text-black hover:text-primary-green transition-colors"
      on:click={onPrevious}
      aria-label={previousLabel}
    >
      Previous
    </button>
  
    
    <button
      class="text-black hover:text-primary-green transition-colors"
      on:click={onNext}
      aria-label={nextLabel}
    >
      Next
    </button>
  </div>
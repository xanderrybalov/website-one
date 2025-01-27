<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { CollectionSlider, Header, Navigation } from '$lib/index.js';
  import { collections } from '$lib/types/collection.js';
  import { onMount } from 'svelte';

  
  let currentIndex = 0;
  let isTransitioning = false;
  
  function handlePrevious() {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex = currentIndex === 0 ? collections.length - 1 : currentIndex - 1;
      setTimeout(() => isTransitioning = false, 500);
    }
  }
  
  function handleNext() {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex = (currentIndex + 1) % collections.length;
      setTimeout(() => isTransitioning = false, 500);
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<main class="relative">
  <!-- <Navigation
    onPrevious={handlePrevious}
    onNext={handleNext}
    currentSlide={currentIndex + 1}
    totalSlides={collections.length}
  /> -->

  <Header />
  
  <CollectionSlider
    slides={collections}
    {currentIndex}
  />
  
</main>
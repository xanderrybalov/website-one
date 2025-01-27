<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { TRANSITION_DURATION, type CollectionSlide } from '$lib/index.js';
  
  export let slides: CollectionSlide[];
  export let currentIndex: number;
  
  let mainImageLoaded = false;
  let thumbnailsLoaded: boolean[] = [];
  let sliderId = crypto.randomUUID();
  
  $: if (browser && slides[currentIndex]) {
    const nextIndex = (currentIndex + 2) % slides.length;
    const preloadImage = document.createElement('img');
    preloadImage.src = slides[nextIndex].mainImage;
  }

  function handleMainImageLoad() {
    mainImageLoaded = true;
  }

  function handleThumbnailLoad(index: number) {
    thumbnailsLoaded[index] = true;
  }
</script>

<div class="grid grid-cols-2 min-h-screen max-h-screen" id={sliderId}>
  <!-- Left column - Main image -->
  <div class="relative h-screen overflow-hidden">
    {#key slides[currentIndex].id}
      <div class="relative h-full">
        <!-- Placeholder/Skeleton -->
        <div 
          class="absolute inset-0 bg-gray-200 animate-pulse"
          class:opacity-0={mainImageLoaded}
          class:hidden={mainImageLoaded}></div>
        
        <img
          src={slides[currentIndex].mainImage}
          alt={`${slides[currentIndex].season} ${slides[currentIndex].year} collection main view`}
          class="w-full h-full object-cover transition-opacity duration-300"
          class:opacity-0={!mainImageLoaded}
          loading="lazy"
          on:load={handleMainImageLoad}
        />
        
        <div 
          class="absolute bottom-8 left-8 text-white"
          in:fade={{ duration: TRANSITION_DURATION, delay: TRANSITION_DURATION / 2 }}>
          <h1 
            class="text-header-title font-header-light"
            aria-label={`${slides[currentIndex].season} ${slides[currentIndex].year} collection`}>
            {slides[currentIndex].season}<br />
            {slides[currentIndex].year}
          </h1>
        </div>
      </div>
    {/key}
  </div>

  <!-- Right column - Thumbnails -->
  <div class="bg-[#FAF9F7] h-screen relative">
    <div class="absolute inset-0 flex flex-col justify-center px-12">
      <div class="space-y-6">
        {#each slides[currentIndex].thumbnails as thumbnail, idx}
          <div class="relative w-full h-64">
            <!-- Placeholder/Skeleton -->
            <div 
              class="absolute inset-0 bg-gray-200 animate-pulse"
              class:opacity-0={thumbnailsLoaded[idx]}
              class:hidden={thumbnailsLoaded[idx]}></div>
            
            <img
              src={thumbnail}
              alt={`Collection detail view ${idx + 1}`}
              class="w-full h-full object-cover transition-opacity duration-300"
              class:opacity-0={!thumbnailsLoaded[idx]}
              loading="lazy"
              on:load={() => handleThumbnailLoad(idx)}
            />
          </div>
        {/each}
      </div>

      <button
        class="absolute bottom-8 right-8 px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors"
        aria-label="Start shopping">
        SHOP NOW
      </button>
    </div>
  </div>
</div>
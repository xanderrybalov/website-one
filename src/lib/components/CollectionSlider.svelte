<script lang="ts">
  import { fade } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { TRANSITION_DURATION, type CollectionSlide } from '$lib/index.js';

  const { slides = [], currentIndex = 0 } = $props<{
    slides?: CollectionSlide[];
    currentIndex?: number;
  }>();

  let mainImageLoaded = $state(false);
  let thumbnailsLoaded: boolean[] = $state(Array(slides.length).fill(false));
  let sliderId = crypto.randomUUID();

  $effect(() => {
    if (browser && slides[currentIndex]) {
      thumbnailsLoaded = Array(slides.length).fill(false);
    }
  });

  $effect(() => {
    if (browser && slides[currentIndex]) {
      const nextIndex = (currentIndex + 1) % slides.length;
      slides[nextIndex]?.mainImage && (new Image().src = slides[nextIndex].mainImage);
    }
  });

  function handleMainImageLoad() {
    mainImageLoaded = true;
  }

  function handleThumbnailLoad(index: number) {
    thumbnailsLoaded[index] = true;
  }
</script>
<div class="grid grid-cols-[3fr_2fr] min-h-screen max-h-screen" id={sliderId}>
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
          onload={handleMainImageLoad}
        />
        
        <!-- <div 
          class="absolute bottom-8 left-8 text-white"
          in:fade={{ duration: TRANSITION_DURATION, delay: TRANSITION_DURATION / 2 }}>
          <h1 
            class="text-header-title font-header-light"
            aria-label={`${slides[currentIndex].season} ${slides[currentIndex].year} collection`}>
            {slides[currentIndex].season}<br />
            {slides[currentIndex].year}
          </h1>
        </div> -->
      </div>
    {/key}
  </div>

<!-- Right column - Thumbnails -->
<div class="bg-[#FAF9F7] h-screen relative grid grid-rows-[auto_1fr_auto] px-12 py-16">
  <!-- Верхнее изображение -->
  <div class="place-self-start self-start w-[320px] mt-[160px] ml-[220px]">
    <!-- Placeholder/Skeleton -->
    <div 
      class="inset-0 bg-gray-200 animate-pulse"
      class:opacity-0={mainImageLoaded}
      class:hidden={mainImageLoaded}></div>
    
    <img
      src={slides[currentIndex].mainImage}
      alt={`Main collection view`}
      class="w-full h-full object-cover transition-opacity duration-300"
      class:opacity-0={!mainImageLoaded}
      loading="lazy"
      onload={handleMainImageLoad}
    />
  </div>

  <!-- Нижнее изображение -->
  <div class="place-self-start self-end w-[260px] mb-[70px] ml-[30px]">
    <!-- Placeholder/Skeleton -->
    <div 
      class="inset-0 bg-gray-200 animate-pulse"
      class:opacity-0={mainImageLoaded}
      class:hidden={mainImageLoaded}></div>
    
    <img
      src={slides[currentIndex].thumbnails[1]} 
      alt={`Collection thumbnail`}
      class="w-full h-full object-cover transition-opacity duration-300"
      class:opacity-0={!mainImageLoaded}
      loading="lazy"
    />
  </div>
</div>



</div>
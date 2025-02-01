<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { Navigation, TRANSITION_DURATION, type CollectionSlide } from '$lib/index.js';

  const { slides = [] } = $props<{
    slides?: CollectionSlide[];
    currentIndex?: number;
  }>();
  let currentIndex = $state(0);

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

  function nextSlide() {
    mainImageLoaded = false;
    currentIndex = (currentIndex + 1) % slides.length;
  }

  function prevSlide() {
    mainImageLoaded = false;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  }
</script>
<div class="grid grid-cols-[3fr_2fr] min-h-screen max-h-screen" id={sliderId}>
  <!-- Left column - Main image -->
<!-- Главный контейнер -->
<div class="relative h-screen overflow-hidden bg-primary" id={sliderId}>
  {#key slides[currentIndex].id}
    <div 
      class="relative h-full"
      in:fly={{ x: 100, duration: 300, opacity: 1 }} 
      out:fly={{ x: -100, duration: 300, opacity: 0 }}
    >
      <!-- Placeholder -->
      <div 
        class="absolute inset-0 bg-gray-200 animate-pulse"
        class:opacity-0={mainImageLoaded}
        class:hidden={mainImageLoaded}></div>

      <img
        src={slides[currentIndex].mainImage}
        alt={`${slides[currentIndex].season} ${slides[currentIndex].year} collection main view`}
        class="w-full h-full object-cover transition-opacity duration-300 ease-in-out transform-gpu"
        class:opacity-0={!mainImageLoaded}
        loading="lazy"
        onload={handleMainImageLoad}
      />
    </div>
  {/key}

  <Navigation 
    onPrevious={prevSlide} 
    onNext={nextSlide} 
    currentSlide={currentIndex} 
    totalSlides={slides.length} />
</div>

<!-- Right column - Thumbnails -->
<div class="bg-primary h-screen p-8 relative">
  <div class="grid grid-cols-3 grid-rows-2 h-full gap-8">
    <!-- Верхнее изображение -->
    <div class="relative col-start-2 col-span-1 mt-[240px] translate-x-[100px] scale-[1.35] transform-gpu origin-center">
      <!-- Placeholder/Skeleton -->
      <div 
        class="absolute inset-0 bg-gray-200 animate-pulse"
        class:opacity-0={thumbnailsLoaded[currentIndex]}
        class:hidden={thumbnailsLoaded[currentIndex]}
      ></div>
      
      <img
        src={slides[currentIndex].thumbnails?.[0] || slides[currentIndex].mainImage}
        alt={`Thumbnail view 1`}
        class="w-full h-auto object-cover"
        class:opacity-0={!thumbnailsLoaded[currentIndex]}
        loading="lazy"
        onload={() => handleThumbnailLoad(currentIndex)}
      />
    </div>
    
    <div class="absolute place-self-end top-1/2 transform -translate-y-1/2 right-[-150px] rotate-90">
      <div class="flex items-center">
        <!-- Верхний текст -->
        <span 
          class="text-sm text-black origin-bottom whitespace-nowrap mr-10"
          aria-label="Reference">
          Ref. 6687/787
        </span>
        
        <!-- Линия -->
        <div class="h-[2px] w-[100px] bg-black"></div>
        
        <!-- Нижний текст -->
        <span 
          class="text-sm text-black origin-top whitespace-nowrap ml-10"
          aria-label="Description">
          White loose dress
        </span>
      </div>
    </div>

    <!-- Нижнее изображение -->
    <div class="relative col-start-1 col-span-1 row-start-2 translate-x-[20px] self-end scale-[1.1] transform-gpu origin-bottom">
      <!-- Placeholder/Skeleton -->
      <div 
        class="absolute inset-0 bg-gray-200 animate-pulse"
        class:opacity-0={thumbnailsLoaded[currentIndex]}
        class:hidden={thumbnailsLoaded[currentIndex]}
      ></div>
      
      <img
        src={slides[currentIndex].thumbnails?.[1] || slides[currentIndex].mainImage}
        alt={`Thumbnail view 2`}
        class="w-full h-auto object-cover transition-opacity duration-300"
        class:opacity-0={!thumbnailsLoaded[currentIndex]}
        loading="lazy"
        onload={() => handleThumbnailLoad(currentIndex)}
      />
    </div>
  

  </div>
    <!-- Button SHOP NOW -->
    <button
    class="absolute bottom-8 right-10 font-bold px-24 py-5 min-w-[200px] border border-black text-black hover:bg-black hover:text-white transition-colors z-10"
    aria-label="Start shopping">
    SHOP NOW
  </button>
</div>
</div>
<script lang="ts">
  import { fly } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { Dots, Navigation, Social, type CollectionSlide } from '$lib/index.js';

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

    <div class="fixed bottom-[1.9rem] left-[1.2rem] right-[5rem] w-[59.3%] text-white flex justify-between items-center p-primary-padding" role="contentinfo">
      <Social />
      <Dots {currentIndex} {slides} setSlide={(index) => currentIndex = index} />
    </div>
</div>

<!-- Правая колонка -->
<div class="bg-primary min-h-[800px] max-h-[100vh] p-8 flex flex-col justify-between items-end overflow-hidden">
  
  <div class="min-w-[245px] min-h-[330px] w-[245px] h-[330px] overflow-hidden mt-[13rem] mr-[6rem] self-end relative">
    <!-- Placeholder/Skeleton -->
    <div 
      class="absolute inset-0 bg-gray-200 animate-pulse"
      class:opacity-0={thumbnailsLoaded[currentIndex]}
      class:hidden={thumbnailsLoaded[currentIndex]}
    ></div>
  
    <img
      src={slides[currentIndex].thumbnails?.[0] || slides[currentIndex].mainImage}
      alt="Thumbnail view 1"
      class="w-full h-full object-cover transition-opacity duration-300 relative"
      class:opacity-0={!thumbnailsLoaded[currentIndex]}
      loading="lazy"
      onload={() => handleThumbnailLoad(currentIndex)}
    />
  </div>

  <!-- Текстовый блок с линией -->
  <div class="flex items-center rotate-90 gap-[2.9rem] mt-[-11.5rem] mr-[-11.1rem] self-end">
    <span class="text-sm text-black origin-bottom whitespace-nowrap" aria-label="Reference">
      Ref. {slides[currentIndex].ref}
    </span>
    <div class="h-[2px] w-[7.5rem] bg-black"></div>
    <span class="text-sm text-black origin-top whitespace-nowrap" aria-label="Description">
      {slides[currentIndex].description}
    </span>
  </div>

  <div class="flex w-[85%] justify-between items-end mb-[2rem] mr-[3rem] gap-[3rem]">

<!-- Нижнее изображение -->
<div class="min-w-[205px] min-h-[275px] w-[205px] h-[275px] overflow-hidden self-end flex-none">
  <!-- Placeholder/Skeleton -->
  <div 
    class="absolute inset-0 bg-gray-200 animate-pulse"
    class:opacity-0={thumbnailsLoaded[currentIndex]}
    class:hidden={thumbnailsLoaded[currentIndex]}
  ></div>

  <img
    src={slides[currentIndex].thumbnails?.[1] || slides[currentIndex].mainImage}
    alt="Thumbnail view 2"
    class="w-full h-full object-cover transition-opacity duration-300 relative"
    class:opacity-0={!thumbnailsLoaded[currentIndex]}
    loading="lazy"
    onload={() => handleThumbnailLoad(currentIndex)}
  />
</div>
  
    <!-- Кнопка SHOP NOW -->
    <button
      class="font-bold px-[4.8rem] py-[1.4rem] min-w-[140px] text-xs border border-black text-black hover:bg-black hover:text-white transition-colors z-10 flex-none"
      aria-label="Start shopping">
      SHOP NOW
    </button>
  
  </div>

</div>


</div>
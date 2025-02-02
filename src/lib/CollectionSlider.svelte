<script lang="ts">
  import { fly } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { Dots, Navigation, Social, TextOverlay, type CollectionSlide } from '$lib/index.js';
  import { cubicOut } from 'svelte/easing';
  import SlideInfo from './SlideInfo.svelte';

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
<div class="grid grid-cols-[auto_605px] min-h-screen max-h-screen" id={sliderId}>
  <!-- Left column - Main image -->
<div class="relative h-screen min-h-[900px] overflow-hidden bg-primary" id={sliderId}>
  {#key slides[currentIndex].id}
    <div 
      class="relative h-full"
      in:fly={{ x: 60, duration: 600, opacity: 1, easing: cubicOut }} 
      out:fly={{ x: -60, duration: 600, opacity: 0, easing: cubicOut }}
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

  <SlideInfo
  season={slides[currentIndex].season}
  title={slides[currentIndex].title}
  year={slides[currentIndex].year}
/>

  <Navigation 
    onPrevious={prevSlide} 
    onNext={nextSlide} 
    currentSlide={currentIndex} 
    totalSlides={slides.length} />

  <TextOverlay season="Summer" title="2020" />

  <div class="absolute top-[52rem] left-0 w-full flex justify-between text-white items-center p-secondary-padding" role="contentinfo">
    <Social />
    <Dots {currentIndex} {slides} setSlide={(index) => currentIndex = index} />
  </div>

</div>

<!-- Правая колонка -->
<div class="bg-primary min-h-[900px] flex flex-col justify-start items-end overflow-hidden">
  
  <div class="min-w-[245px] min-h-[330px] w-[245px] h-[330px] overflow-hidden mt-[15rem] mr-[8.5rem] self-end">
    <!-- Placeholder/Skeleton -->
    <div 
      class="inset-0 bg-gray-200 animate-pulse"
      class:opacity-0={thumbnailsLoaded[currentIndex]}
      class:hidden={thumbnailsLoaded[currentIndex]}
    ></div>
  
    {#key slides[currentIndex].id}
    <img
      src={slides[currentIndex].thumbnails?.[0] || slides[currentIndex].mainImage}
      alt="Thumbnail view 1"
      class="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
      class:opacity-0={!thumbnailsLoaded[currentIndex]}
      loading="lazy"
      onload={() => handleThumbnailLoad(currentIndex)}
      in:fly={{ x: 60, duration: 600, opacity: 1, easing: cubicOut }} 
      out:fly={{ x: -60, duration: 600, opacity: 0, easing: cubicOut }}
    />
  {/key}
  </div>

  <!-- Текстовый блок с линией -->
  <div class="absolute top-[30rem] right-[-8.7rem] flex items-center rotate-90 gap-[3rem]">
    <span class="text-sm text-black origin-bottom whitespace-nowrap" aria-label="Reference">
      Ref. {slides[currentIndex].ref}
    </span>
    <div class="h-[2px] w-[7.5rem] bg-black"></div>
    <span class="text-sm text-black origin-top whitespace-nowrap" aria-label="Description">
      {slides[currentIndex].description}
    </span>
  </div>

    <!-- Нижнее изображение и кнопка-->
  <div class="flex w-[85%] justify-end items-end mt-[2rem] mr-[4rem] gap-[3rem]">

    <!-- Нижнее изображение -->
    <div class="min-w-[205px] min-h-[275px] w-[205px] h-[275px] overflow-hidden self-end flex-none">
      <!-- Placeholder/Skeleton -->
      <div 
        class="inset-0 bg-gray-200 animate-pulse"
        class:opacity-0={thumbnailsLoaded[currentIndex]}
        class:hidden={thumbnailsLoaded[currentIndex]}
      ></div>

      {#key slides[currentIndex].id}
      <img
        src={slides[currentIndex].thumbnails?.[1] || slides[currentIndex].mainImage}
        alt="Thumbnail view 2"
        class="w-full h-full object-cover transition-opacity duration-300"
        class:opacity-0={!thumbnailsLoaded[currentIndex]}
        loading="lazy"
        onload={() => handleThumbnailLoad(currentIndex)}
        in:fly={{ x: 60, duration: 600, opacity: 1, easing: cubicOut }} 
        out:fly={{ x: -60, duration: 600, opacity: 0, easing: cubicOut }}
      />
    {/key}
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
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

    <Social />
    <Dots {currentIndex} {slides} setSlide={(index) => currentIndex = index} />
</div>

<!-- Правая колонка -->
<div class="bg-primary h-screen p-8 relative flex flex-col items-end">
  
  <!-- Верхнее изображение (большая миниатюра) -->
  <div class="absolute top-[25%] right-[20%] scale-[1] transform-gpu w-[250px] h-[340px] overflow-hidden">
    <!-- Placeholder/Skeleton -->
    <div 
      class="absolute inset-0 bg-gray-200 animate-pulse"
      class:opacity-0={thumbnailsLoaded[currentIndex]}
      class:hidden={thumbnailsLoaded[currentIndex]}
    ></div>
    
    <img
      src={slides[currentIndex].thumbnails?.[0] || slides[currentIndex].mainImage}
      alt="Thumbnail view 1"
      class="w-full h-full object-cover transition-opacity duration-300"
      class:opacity-0={!thumbnailsLoaded[currentIndex]}
      loading="lazy"
      onload={() => handleThumbnailLoad(currentIndex)}
    />
  </div>

<!-- Текстовый блок с адаптивными позициями -->
<div class="absolute top-1/2 right-[-120px] md:right-[-120px] sm:right-4 flex items-center rotate-90 w-[22rem]">
  <!-- Верхний текст -->
  <span 
    class="text-sm md:text-xs sm:text-[10px] text-black origin-bottom whitespace-nowrap mr-10 sm:mr-5"
    aria-label="Reference">
    Ref. {slides[currentIndex].ref}
  </span>
  
  <!-- Линия -->
  <div class="h-[2px] w-[100px] md:w-[80px] sm:w-[60px] bg-black"></div>
  
  <!-- Нижний текст -->
  <span 
    class="text-sm md:text-xs sm:text-[10px] text-black origin-top whitespace-nowrap ml-10 sm:ml-5"
    aria-label="Description">
    {slides[currentIndex].description}
  </span>
</div>

  <!-- Нижнее изображение (чуть выше, шире и выровнено по кнопке) -->
  <div class="absolute bottom-[2rem] left-[12%] scale-[1] transform-gpu w-[210px] h-[280px] overflow-hidden">
    <!-- Placeholder/Skeleton -->
    <div 
      class="absolute inset-0 bg-gray-200 animate-pulse"
      class:opacity-0={thumbnailsLoaded[currentIndex]}
      class:hidden={thumbnailsLoaded[currentIndex]}
    ></div>
    
    <img
      src={slides[currentIndex].thumbnails?.[1] || slides[currentIndex].mainImage}
      alt="Thumbnail view 2"
      class="w-full h-full object-cover transition-opacity duration-300"
      class:opacity-0={!thumbnailsLoaded[currentIndex]}
      loading="lazy"
      onload={() => handleThumbnailLoad(currentIndex)}
    />
  </div>


  <button
    class="absolute bottom-[2rem] right-14 font-bold px-14 py-4 min-w-[140px] text-xs border border-black text-black hover:bg-black hover:text-white transition-colors z-10"
    aria-label="Start shopping">
    SHOP NOW
  </button>

</div>


</div>
<script lang="ts">
    import { onMount } from "svelte";
  
    let currentLanguage = $state('ENG');
    let isMenuOpen = $state(false);
  
    let {
        initialLanguage = 'ENG', onLanguageChange = () => {}
    } = $props<{
        initialLanguage?: 'ENG' | 'FR';
        onLanguageChange?: (lang: 'ENG' | 'FR') => void;
    }>();
  
    currentLanguage = initialLanguage;
  
    function switchLanguage(lang: 'ENG' | 'FR') {
        currentLanguage = lang;
        onLanguageChange(lang);
    }
  
    let scrolled = $state(false);
  
    function handleScroll() {
      scrolled = window.scrollY > 50;
    }
  
    function openMenu() {
      isMenuOpen = true;
      document.body.classList.add("overflow-hidden");
    }
  
    function closeMenu() {
      isMenuOpen = false;
      document.body.classList.remove("overflow-hidden");
    }
  
    onMount(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    });
  </script>
  
  <!-- Навигация -->
  <div class="fixed top-0 left-0 w-full p-primary-padding flex justify-between items-center z-50 transition-colors duration-300"
       class:bg-[rgba(247,238,228,0.8)]={scrolled}>
  
      <!-- Кнопка меню -->
      <button
          class="flex items-center gap-2 transition-colors duration-300"
          class:text-text-black={scrolled}
          class:text-text-white={!scrolled}
          onclick={openMenu}
          aria-label="Open menu"
      >
          <img 
              src="/menu.svg" 
              alt=""
              class="w-6 h-14 filter invert transition-all duration-300"
              class:invert-0={scrolled}
              class:invert={!scrolled}
              aria-hidden="true"
          />
          <span class="pl-menu-text-padding">Menu</span>
      </button>
  
      <!-- Переключение языка -->
      <div class="flex gap-[2.8rem]">
          <button
              class="transition-colors font-bold text-lg md:text-sm duration-300"
              class:text-text-black={currentLanguage === 'ENG'}
              class:text-secondary={currentLanguage !== 'ENG'}
              onclick={() => switchLanguage('ENG')}
              aria-label="Switch to English"
              aria-pressed={currentLanguage === 'ENG'}
          >
              ENG
          </button>
          <button
              class="transition-colors font-bold text-lg md:text-sm duration-300"
              class:text-text-black={currentLanguage === 'FR'}
              class:text-secondary={currentLanguage !== 'FR'}
              onclick={() => switchLanguage('FR')}
              aria-label="Switch to French"
              aria-pressed={currentLanguage === 'FR'}
          >
              FR
          </button>
      </div>
  </div>
  
  <!-- Полноэкранное меню -->
  {#if isMenuOpen}
    <div class="fixed inset-0 bg-primary flex flex-col justify-center items-center z-50 transition-all duration-500 opacity-100 scale-100">
        
        <!-- Кнопка закрытия -->
        <button 
            class="absolute top-6 right-8 text-black text-2xl font-bold transition-opacity hover:opacity-70"
            onclick={closeMenu}
            aria-label="Close menu"
        >
            ✕
        </button>
  
        <!-- Ссылки -->
        <nav class="flex flex-col items-center gap-8 text-black text-4xl font-bold">
            <button class="hover:opacity-70 transition-opacity" onclick={() => console.log('FB Clicked')}>FB</button>
            <button class="hover:opacity-70 transition-opacity" onclick={() => console.log('PIN Clicked')}>PIN</button>
            <button class="hover:opacity-70 transition-opacity" onclick={() => console.log('IG Clicked')}>IG</button>
        </nav>
    </div>
  {/if}
  
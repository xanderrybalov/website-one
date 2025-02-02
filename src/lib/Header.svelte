<script lang="ts">
    import { onMount } from "svelte";
  
    let currentLanguage = $state('ENG');
  
    let {
        initialLanguage = 'ENG', onLanguageChange = () => {}, onMenuClick = () => {}
    } = $props<{
        initialLanguage?: 'ENG' | 'FR';
        onLanguageChange?: (lang: 'ENG' | 'FR') => void;
        onMenuClick?: () => void;
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
  
    onMount(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    });
  </script>
  
  <!-- Навигация с изменяющимся полупрозрачным фоном -->
  <div class="fixed top-0 left-0 w-full p-primary-padding flex justify-between items-center z-10 transition-colors duration-300"
       class:bg-[rgba(247,238,228,0.8)]={scrolled}>
  
      <!-- Кнопка меню -->
      <button
          class="flex items-center gap-2 transition-colors duration-300"
          class:text-text-black={scrolled}
          class:text-text-white={!scrolled}
          onclick={onMenuClick}
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
  
      <!-- Переключение языка (возвращаем оригинальную логику) -->
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
  
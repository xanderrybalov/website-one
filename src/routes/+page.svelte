<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { CollectionSlider, Header, Navigation } from '$lib/index.js';
  import { collections } from '$lib/types/collection.js';

  
  let currentIndex = 0;
  
  function handleLanguageChange(newLanguage: 'ENG' | 'FR') {
    console.log(`Language changed to ${newLanguage}`);
  }

  function handleMenuOpen() {
    console.log('Menu clicked');
  }
</script>

<main class="relative">

  <Header 
  initialLanguage="ENG"
  onLanguageChange={handleLanguageChange}
  onMenuClick={handleMenuOpen}
/>
  
  <CollectionSlider
    slides={collections}
    {currentIndex}
  />
  
</main>
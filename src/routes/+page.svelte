<script lang="ts">
  import { CollectionSlider, Footer, Header} from '$lib/index.js';
  import { collections } from '$lib/types/collection.js';

  let currentIndex = 0;

  function handleLanguageChange(newLanguage: 'ENG' | 'FR') {
    console.log(`Language changed to ${newLanguage}`);
  }

  function handleMenuOpen() {
    console.log('Menu clicked');
  }
</script>

<div class="flex flex-col min-h-screen">
  <!-- Header -->
  <Header 
    initialLanguage="ENG"
    onLanguageChange={handleLanguageChange}
    onMenuClick={handleMenuOpen}
  />

  <!-- Main content -->
  <main class="flex-grow">
    <CollectionSlider slides={collections} {currentIndex} />
  </main>

  <!-- Footer -->
  <Footer />
</div>

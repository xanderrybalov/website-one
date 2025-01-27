<!-- src/lib/components/Header.svelte -->
<script lang="ts">
let currentLanguage = $state('ENG');

let {
    initialLanguage = 'ENG', onLanguageChange = () => {}, onMenuClick = () => {}
} = $props < {
    initialLanguage ? : 'ENG' | 'FR';
    onLanguageChange ? : (lang: 'ENG' | 'FR') => void;
    onMenuClick ? : () => void;
} > ();

currentLanguage = initialLanguage;

function switchLanguage(lang: 'ENG' | 'FR') {
    currentLanguage = lang;
    onLanguageChange(lang);
}
</script>

<div class="fixed top-0 left-0 w-full p-header-padding flex justify-between items-center z-10">
    <button
        class="text-text-white flex items-center gap-2"
        onclick={onMenuClick}
        aria-label="Open menu"
    >
        <img 
            src="/menu.svg" 
            alt=""
            class="w-6 h-6 filter invert"
            aria-hidden="true"
        />
        <span class="pl-menu-text-padding">Menu</span>
    </button>

    <div class="flex gap-4">
        <button
class="transition-colors font-bold {currentLanguage === 'ENG' ? 'text-text-black' : 'text-secondary'}"
            onclick={() => switchLanguage('ENG')}
            aria-label="Switch to English"
            aria-pressed={currentLanguage === 'ENG'}
        >
            ENG
        </button>
        <button
            class="transition-colors font-bold {currentLanguage === 'FR' ? 'text-text-black' : 'text-secondary'}"
            onclick={() => switchLanguage('FR')}
            aria-label="Switch to French"
            aria-pressed={currentLanguage === 'FR'}
        >
            FR
        </button>
    </div>
</div>

<script lang="ts">
    function handleMenuClick() {}
    </script>
    
    <div class="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-10">
        <button
            class="text-white hover:text-primary-green transition-colors flex items-center gap-2"
            on:click={handleMenuClick}
            aria-label="Open menu"
        >
            <img 
                src="/menu.svg" 
                alt=""
                class="w-6 h-6 filter invert"
                aria-hidden="true"
            />
            <span>Menu</span>
        </button>
    
        <div class="flex gap-4">
            <button
                class="text-black hover:text-primary-green transition-colors"
                aria-label="Switch to English"
            >
                ENG
            </button>
            <button
                class="text-white hover:text-primary-green transition-colors"
                aria-label="Switch to French"
            >
                FR
            </button>
        </div>
    </div>
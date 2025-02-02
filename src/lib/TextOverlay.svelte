<script lang="ts">
  let { season, title } = $props();
</script>

<div 
  class="absolute text-white text-left leading-[0.75] top-[29rem] left-[3.8rem] 
  font-[Garamond,serif] tracking-[-0.02em]">
  
  <span class="block font-light xl:text-[11rem] lg:text-[5rem] text-[9rem]">
    {season}
  </span>

  <span class="block font-light xl:text-[11rem] lg:text-[10rem] text-[9rem]">
    {title}
  </span>
</div>

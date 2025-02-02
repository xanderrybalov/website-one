<script>
    let { season, title } = $props(); 
  </script>
  
  <div class="text-overlay">
    <span class="season">{season}</span>
    <br />
    <span class="title">{title}</span>
  </div>
  
  <style>
    .text-overlay {
      position: absolute;
      top: 30rem;
      left: 3.8rem;
      color: white;
      text-align: left;
      line-height: 0.75;
    }
  
    .season {
      font-size: 11rem;
      font-weight: 400;
      letter-spacing: -0.02em; /* Регулирует расстояние между буквами */
      font-family: "Garamond", serif; /* Можно попробовать Didot или другой схожий */
    }
  
    .title {
      font-size: 11rem;
      font-weight: 400;
      letter-spacing: -0.02em;
      font-family: "Garamond", serif;
    }
  </style>
  
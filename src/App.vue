<template>
  <Header></Header>
  <div class="p-3">
    <HelloWorld msg="Test from parent element" />
    
    <!-- Contenido (Descripción si no se especifíca un ID, de lo contrario mostrar el video / 360 / fotos) -->
    <!-- División -->
    <!-- Lista de videos del mismo tema -->
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<style>
#app {
  @apply bg-gray-100 min-h-screen;
}
</style>

<template>
  <header
    class="top-0 w-full z-40 bg-white fixed border-b border-gray-200 shadow"
  >
    <div class="flex items-center justify-between h-16 px-6 mx-auto">
      <a href="/">
        <img
          alt="header logo"
          src="../static/nuxt-logo.svg"
          class="h-8 sm:w-8 lg:w-auto"
        />
      </a>
    </div>
  </header>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>

<template>
  <div id="container">
    <h1>Team Sync</h1>
    <p>Every drop counts in saving a life.<br> The Smart Blood Bank connects patients, hospitals, and donors in real time</p>

    <div class="wrapper">
      <nuxt-link to="/donate">Donator</nuxt-link>
      <nuxt-link to="/">Blood Bank</nuxt-link>
      <nuxt-link to="/donate">Hospital</nuxt-link>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
#container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Poppins, sans-serif;
  padding: 20px;
}

p {
  width: 800px;
  font-size: 2rem;
  font-weight: 500;
}

.wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  a {
    width: 300px;
    max-width: 100%;
    background: #e2e2e2;
    padding: 10px 20px;
    color: @color;
    border-radius: 7px;
    font-weight: 500;

    &:hover {
      background: #d2d2d2;
    }
  }
}
</style>

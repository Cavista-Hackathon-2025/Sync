<template>
  <div class="full-panel loading">
    <p class="greeting">
      Welcome, <span class="name">{{ name }}</span>
    </p>
    <div class="center">
      <Icon name="eos-icons:loading" size="50px"></Icon>
      <p>Searching Blood Banks...</p>
      <p class="location">Your Current Location is {{ address }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['name', 'address'])

watchEffect(() => {
  console.log(props.address)
})
</script>

<style scoped lang="less">
.full-panel {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  height: 100%;

  .greeting {
    font-size: 2.2rem;
    font-weight: 500;

    .name {
      font-style: italic;
      color: #6c63ff;
    }
  }
}

.loading {
  p {
    font-size: 1.8rem;
    font-weight: 500;
  }
}

.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 150px;
}

.location {
    max-width: 400px;
    font-size: 1.5rem;
    color: #919191;
    text-align: center;
}
</style>

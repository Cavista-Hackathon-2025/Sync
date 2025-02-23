<template>
  <div id="container">
    <div id="sidebar">
      <div class="sidebar-content">
        <p class="team">Team Sync 4 Blood Banks</p>
        <p class="title">No Shortages, No Delays—Optimise Your Blood Supply!</p>
        <p class="text">
          Low stocks should never mean lost lives. Share inventory, receive
          alerts, and collaborate with other blood banks to make every pint
          count.
        </p>

        <div class="quote">
          <p class="t">Did You Know</p>
          <p>
            A well-managed blood stock isn't just inventory. It is a lifeline
            waiting to be delivered.
          </p>
        </div>
      </div>
    </div>
    <div class="user-panel">
      <div class="bank-wrapper">
        <div class="header">
          <p class="title">Sync Team Blood Bank</p>
          <p>
            Manage your stock and update needed blood groups for instant
            availability and seamless coordination.
          </p>
        </div>
        <div class="info">
          <div class="card">
            <p>Basic Information</p>
            <div class="gridder">
              <input type="text" placeholder="Name" v-model="name" />
              <input type="text" placeholder="Contact Number" v-model="phone" />
              <input type="email" placeholder="email" v-model="email" />
              <input type="text" placeholder="Address" v-model="address" />
            </div>
          </div>

          <div class="card">
            <p>Blood Stock Information</p>
            <div class="gridder">
              <input
                type="number"
                placeholder="A+ (Number of Pints)"
                v-model="bloodGroups.ap"
              />
              <input
                type="number"
                placeholder="A- (Number of Pints)"
                v-model="bloodGroups.an"
              />
              <input
                type="number"
                placeholder="B+ (Number of Pints)"
                v-model="bloodGroups.bp"
              />
              <input
                type="number"
                placeholder="B- (Number of Pints)"
                v-model="bloodGroups.bn"
              />
              <input
                type="number"
                placeholder="AB+ (Number of Pints)"
                v-model="bloodGroups.abp"
              />
              <input
                type="number"
                placeholder="AB- (Number of Pints)"
                v-model="bloodGroups.abn"
              />
              <input
                type="number"
                placeholder="O+ (Number of Pints)"
                v-model="bloodGroups.op"
              />
              <input
                type="number"
                placeholder="O- (Number of Pints)"
                v-model="bloodGroups.on"
              />
            </div>
          </div>

          <button class="update-btn" @click="update">
            <Icon v-if="isLoading" name="codex:loader" size="40px"></Icon>
            <span v-else>Update Stock</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";
/* const name = ref("");
const number = ref(""); */
const config = useRuntimeConfig();
// Create a single supabase client for interacting with your database
const supabaseKey = config.public.SUPABASE_KEY;
const supabase = createClient(
  "https://jyqgjotvulqukidtwivg.supabase.co",
  supabaseKey
);

const isLoading = ref(false);
const name = ref("");
const phone = ref("");
const address = ref("");
const email = ref("");
const bloodGroups = ref({});

onMounted(() => {
  getBank();
});

const update = async () => {
  isLoading.value = true;
  const { data, error } = await supabase
    .from("banks")
    .update({
      name: name.value,
      phone: phone.value,
      address: address.value,
      email: email.value,
      blood: bloodGroups.value,
    })
    .eq("id", 1);
  isLoading.value = false;
  console.log(data);
};

const getBank = async () => {
  const { data, error } = await supabase.from("banks").select().eq("id", 1);
  console.log(data[0].email);
  name.value = data[0].name;
  phone.value = data[0].phone;
  address.value = data[0].address;
  email.value = data[0].email;
  bloodGroups.value = data[0].blood;
  console.log(bloodGroups.value.ap);
};
</script>

<style scoped lang="less">
#container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  position: fixed;
}

#sidebar {
  background: #3b37fe;
  background-size: cover;
  color: white !important;
}

.sidebar-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .team {
    position: absolute;
    top: 10%;
    left: 10%;
    font-size: 2rem;
    font-weight: 500;
  }

  .title {
    max-width: 500px;
    font-size: 3rem;
    font-weight: 500;
    margin-top: 20px;
    line-height: 1.3;
  }

  .text {
    max-width: 500px;
    font-size: 1.7rem;
    margin-top: 20px;
  }

  .notice {
    font-size: 1.5rem;
    margin-top: 20px;
    color: #919191;
  }

  .quote {
    position: absolute;
    bottom: 5%;
    max-width: 500px;
    font-size: 1.5rem;
    margin-top: 20px;
    padding: 20px;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    .t {
      font-weight: 500;
    }
  }
}

.user-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow-y: auto;

  h2 {
    font-size: 2.5rem;
    font-weight: 500;
  }

  p {
    max-width: 500px;
    //font-size: 1.7rem;
  }
}

.bank-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;

  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;
    font-size: 1.7rem;
    font-weight: 500;
    text-align: center;

    .title {
      font-size: 2.5rem;
      font-weight: 500;
    }
  }
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 100px;

  .card {
    margin-top: 20px;
    p {
      font-weight: 500;
    }
  }

  .gridder {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  input,
  select {
    width: 300px;
    max-width: 100%;
    padding: 15px 20px;
    border-radius: 7px;
    border: none;
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: 500;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    transition: 0.3s;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px,
      rgba(0, 0, 0, 0.1) 0px 0px 0px 3px;
    &:focus {
      outline: none;
      //border: 2px solid #6c63ff;
      box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
        rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px,
        rgba(0, 0, 0, 0.3) 0px 0px 0px 3px;
    }
  }
}

.update-btn {
  width: 300px;
  max-width: 100%;
  padding: 15px 20px;
  border-radius: 7px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 500;
  background: #6c63ff;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  outline: none;
  &:hover {
    background: #5a4dfc;
  }
}
</style>

<template>
  <div id="container">
    <div id="sidebar">
      <div class="sidebar-content">
        <p class="team">Team Sync 4 Donors</p>
        <p class="title">A Few Minutes for You, A Lifetime for Someone Else!</p>
        <p class="text">
          Your blood donation could mean the difference between life and death.
          Stay informed, get notified when your blood type is needed, and make a
          life-saving impact.
        </p>

        <div class="quote">
          <p class="t">Did You Know</p>
          <p>
            Every two seconds, someone needs a transfusion. Will you answer the
            call? The need for blood never stops.
          </p>
        </div>
      </div>
    </div>
    <div class="user-panel">
      <div class="info" v-show="stage.info">
        <h2>Welcome to BloodSync</h2>
        <p>
          Instantly check nearby blood banks for the exact blood types your
          patients need.
        </p>
        <input v-model="name" type="text" placeholder="Full Name" />
        <input v-model="number" type="number" placeholder="Phone number" />
        <input v-model="email" type="email" placeholder="Email Address" />
        <input
          v-model="location"
          type="number"
          placeholder="Location"
          disabled
        />
        <select v-model="bloodtype" name="blood" id="blood-select">
          <option value="">--Please select blood type--</option>
          <option value="ap">A+</option>
          <option value="an">A-</option>
          <option value="bp">B+</option>
          <option value="bn">B-</option>
          <option value="abp">AB+</option>
          <option value="abn">AB-</option>
          <option value="op">O+</option>
          <option value="on">O-</option>
          <option value="none">Not known</option>
        </select>
        <button @click="saveDonor()" class="continue-btn">
          <Icon v-if="isLoading" name="codex:loader" size="40px"></Icon>
          <span v-else>Continue</span>
        </button>
        <p class="notice">
          By clicking Continue you agree to receive notifications from blood
          banks and be prompted for donation opportunities.
        </p>
      </div>

      <div class="save" v-show="stage.complete">
        <Icon name="nrk:media-media-complete" size="70px"></Icon>
        <p>
          You're officially part of a life-saving movement!<br /><br />
          We'll notify you when there's an urgent need for your blood type—thank
          you for being a real-world hero!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";

const stage = ref({
  info: true,
  complete: false,
});
const isLoading = ref(false);
const name = ref("");
const number = ref("");
const email = ref("");
const location = ref("");
const bloodtype = ref("");

const config = useRuntimeConfig();

// Create a single supabase client for interacting with your database
const supabaseKey = config.public.SUPABASE_KEY;
const supabase = createClient(
  "https://jyqgjotvulqukidtwivg.supabase.co",
  supabaseKey
);

const saveDonor = async () => {
  console.log(
    name.value,
    number.value,
    email.value,
    location.value,
    bloodtype.value,
    supabaseKey
  );
  isLoading.value = true;
  const { error } = await supabase.from("donors").insert({
    name: name.value,
    phone: number.value,
    email: email.value,
    location: location.value,
    bloodtype: bloodtype.value,
  });

  isLoading.value = false;
  if (error) {
    console.log(error);
  } else {
    stage.value.info = false;
    stage.value.complete = true;
  }
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
  background: #fe3737;
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
}

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

.save {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .iconify {
    color: #6c63ff;
  }

  p {
    font-weight: 500;
    font-size: 1.8rem;
    margin-top: 20px;
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

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

  .continue-btn {
    width: 300px;
    max-width: 100%;
    padding: 15px 20px;
    height: 53px;
    border-radius: 7px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-top: 20px;
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
}
</style>

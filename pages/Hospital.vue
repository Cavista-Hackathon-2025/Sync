<template>
  <div id="container">
    <div id="locator-sidebar">
      <div class="overlay">
        <div class="location-content">
          <div class="permission">Accept location permission</div>
          <div class="icon-wrapper">
            <Icon name="fluent:location-24-filled" />
          </div>
          <p>Let's connect you to a Blood Bank Near You...</p>
        </div>
      </div>
    </div>
    <div class="user-panel">

      <Bank v-if="stage.result" :data="activeBank" @toList="goBackList"></Bank>

      <div class="full-panel listing" v-else-if="stage.list">
        <p class="greeting">
          Welcome, <span class="name">{{ name }}</span>
        </p>
        <div class="center">
          <div
            class="bank-card"
            v-for="bank in banks"
            :key="bank.name"
            @click="toBank(bank)"
          >
            <span class="km">{{ bank.km }}</span>
            <p class="name">{{ bank.name }}</p>
            <p><span class="stock">Address:</span> {{ bank.address }}</p>
            <p>
              <span class="stock">Last Updated Stock:</span> {{ bank.stock }}
            </p>
            <div class="groups">
              <p>Available Blood Groups:</p>
              <div>
                <span class="type" v-for="type in bank.available">{{
                  type
                }}</span>
              </div>
            </div>
            <div class="groups">
              <p>Needed Blood Groups:</p>
              <div>
                <span class="type" v-for="type in bank.needed">{{ type }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Loading
        v-else-if="stage.locate"
        :name="name"
        :address="geolocate"
      ></Loading>

      <div class="info" v-else-if="stage.info">
        <h2>Hi, Welcome to Blood Sync</h2>
        <p>
          Instantly check nearby blood banks for the exact blood types your
          patients need.
        </p>
        <input v-model="name" type="text" placeholder="Hospital Name" />
        <input v-model="number" type="number" placeholder="Telephone number" />
        <button @click="toNext('locate')" class="continue-btn">Continue</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const banks = ref([
  {
    name: "Excel-T Diagnostic Service",
    km: "2.5KM",
    address: "7, Ijagbemi Street, Popoola, Bariga",
    stock: "21st February 2025",
    available: ["A+", "A-", "AB+", "AB-"],
    needed: ["B-", "O-", "B-"],
  },
  {
    name: "Chevron Medical Hospital",
    km: "2.5KM",
    address: "7, Ijagbemi Street, Popoola, Bariga",
    stock: "21st February 2025",
    available: ["A+", "A-", "AB+", "AB-"],
    needed: ["B-", "O-", "B-"],
  },
  {
    name: "St. Dan's Blood Bank",
    km: "2.5KM",
    address: "7, Ijagbemi Street, Popoola, Bariga",
    stock: "21st February 2025",
    available: ["A+", "A-", "AB+", "AB-"],
    needed: ["B-", "O-", "B-"],
  },
]);

const activeBank = ref(null);
const location = ref(null);
const geolocate = ref("");
const error = ref(null);

const toBank = (bank) => {
  activeBank.value = bank;
  stage.value.list = false;
  stage.value.result = true;
};

const goBackList = () => {
  activeBank.value = null;
  stage.value.result = false;
  stage.value.list = true;
};

onMounted(() => {
  // Check if geolocation is available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        fetchAddress(location.value);
        console.log(location.value);
      },
      (err) => {
        error.value = err.message;
      }
    );
  } else {
    error.value = "Geolocation is not supported by your browser.";
  }
});

// Function to perform reverse geocoding using Nominatim
const fetchAddress = async (location) => {
  try {
    console.log(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`
    );
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    geolocate.value = data.display_name;
    console.log(data);
    // data.display_name typically contains a human-readable address
    address.value = data.display_name || "Address not found";
  } catch (err) {
    error.value = err.message;
  }
};

const stage = ref({
  info: true,
  locate: false, //localStorage.getItem("name") || false
  list: false,
  result: false,
});

const name = ref("");
const number = ref("");

import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig();
const supabaseKey = config.public.SUPABASE_KEY;
const supabase = createClient(
  "https://jyqgjotvulqukidtwivg.supabase.co",
  supabaseKey
);

const toNext = (next) => {
  if (next === "locate") {
    triggerWatch();
    stage.value.info = false;
    stage.value.locate = true;
  }
};

const triggerWatch = () => {
  watchEffect(() => {
    if (geolocate.value.length > 1) {
      hideLocate();
    }
  });
};

watchEffect(() => {
  if (geolocate.value.length > 1) {
    getBanks();
  }
});

const hideLocate = () => {
  window.setTimeout(() => {
    stage.value.locate = false;
    stage.value.list = true;
  }, 2000);
};

function updateBankInPlace(banks) {
  // Helper function to format a single blood type
  const formatBloodType = (type) =>
    type.toUpperCase().replace("P", "+").replace("N", "-");

  // Update each object in the banks array
  banks.forEach((bankObj) => {
    bankObj.available = bankObj.available.map(formatBloodType);
    bankObj.needed = bankObj.needed.map(formatBloodType);
  });

  return banks;
}

const getBanks = async () => {
  // Fetch blood banks from the server
  const { data, error } = await supabase.from("banks").select();

  banks.value = updateBankInPlace(data);
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

#locator-sidebar {
  background: #afcacf;
  background: url("/img/map3.png") no-repeat;
  background-size: cover;
}

.overlay {
  padding: 20px;
  background: rgba(23, 20, 20, 0.7);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.location-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;

  p {
    color: white !important;
    margin-top: 30px;
    font-size: 2rem;
  }

  .permission {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 20px;
    border-radius: 20px;
    background: white;
    opacity: 0.6;
    font-weight: 500;
    transform: scale(0.9);
  }

  .icon-wrapper {
    position: relative;
    background: white;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    z-index: 2;
    .iconify {
      font-size: 65px;
      color: rgb(103, 116, 71);
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 120%;
      height: 120%;
      background: rgba(255, 255, 255, 0.848);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      z-index: -1;
      animation: pulse 2s infinite ease-in-out forwards;

      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.12);
          opacity: 0;
        }
      }
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

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
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
    border-radius: 7px;
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

.listing {
  .center {
    width: 100%;
    height: 100%;
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
  margin-top: 300px;
}

.bank-card {
  position: relative;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px,
      rgba(0, 0, 0, 0.1) 0px 0px 0px 3px;
  }

  .name {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .km {
    display: none;
    position: absolute;
    top: 15px;
    right: 15px;
    margin-left: 5px;
    padding: 5px 10px;
    background: #bdeabd;
    border-radius: 5px;
  }

  .stock {
    //padding: 5px 10px;
    border-radius: 5px;
    font-weight: 500;
  }

  .groups {
    margin-top: 10px;
    p {
      font-size: 1.5rem;
      font-weight: 500;
    }

    div {
      display: flex;
      gap: 10px;
    }
  }

  .type {
    padding: 5px;
    background: #ffebe8;
    border: 1px solid #e26450;
    border-radius: 5px;
  }
}
</style>

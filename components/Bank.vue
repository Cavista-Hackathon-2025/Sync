<template>
  <div id="result">
    <h1>{{ data.name }}</h1>
    <p>{{ data.address }}</p>

    <div class="wrapper">
      <div class="card">
        <p class="title">Basic Information</p>
        <div class="gridder">
          <p><span class="bold">Phone numbers:</span> {{ data.phone }}</p>
          <p><span class="bold">Email Address:</span> {{ data.email }}</p>
          <p><span class="bold">Operating hous:</span> Mon-Sat (8am - 5pm)</p>
          <!-- <p><span class="bold">Holiday hours:</span> 9am - 4pm</p> -->
        </div>
      </div>

      <div class="card">
        <p class="title">Blood Stock Data</p>
        <div class="table_component" role="region" tabindex="0">
          <table>
            <caption>
              Real Time Blood Inventory Levels
            </caption>
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Available Units (Pints)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A+<br /></td>
                <td>{{ getBlood("ap") }}</td>
                <td><span class="green">Sufficient</span></td>
              </tr>
              <tr>
                <td>A-</td>
                <td>{{ getBlood("an") }}</td>
                <td><span class="green">Sufficient</span></td>
              </tr>
              <tr>
                <td>B+</td>
                <td>{{ getBlood("bp") }}</td>
                <td><span class="warn">Low Stock</span></td>
              </tr>
              <tr>
                <td>B-</td>
                <td>{{ getBlood("bn") }}</td>
                <td><span class="red">Critical Shortage</span></td>
              </tr>
              <tr>
                <td>AB+</td>
                <td>{{ getBlood("abp") }}</td>
                <td><span class="green">Sufficient</span></td>
              </tr>
              <tr>
                <td>AB-</td>
                <td>{{ getBlood("abn") }}</td>
                <td><span class="warn">Low Stock</span></td>
              </tr>
              <tr>
                <td>O+</td>
                <td>{{ getBlood("op") }}</td>
                <td><span class="warn">Low Stock</span></td>
              </tr>
              <tr>
                <td>O-</td>
                <td>{{ getBlood("on") }}</td>
                <td><span class="red">Critical Shortage</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <p class="title">Status Stock Data</p>
        <div class="groups">
          <p>Available Blood Groups</p>
          <div class="avail">
            <span class="type">A+</span>
            <span class="type">A-</span>
            <span class="type">B+</span>
            <span class="type">B-</span>
            <span class="type">AB+</span>
            <span class="type">AB-</span>
            <span class="type">O+</span>
            <span class="type">O-</span>
          </div>
        </div>
        <div class="groups">
          <p>Needed Blood Groups</p>
          <div>
            <span class="type">A+</span>
            <span class="type">A-</span>
            <span class="type">B+</span>
          </div>
        </div>
      </div>

      <div class="btn-groups">
          <button>Request for Blood Now</button>
          <button @click="$emit('toList')" class="back-btn">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);

const getBlood = (type) => {
  //console.log(props.data.blood[type]);
  return props.data.blood[type];
};
</script>

<style scoped lang="less">
#result {
  width: 100%;
  height: 100%;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 20px;
  padding-bottom: 1200px;

  .card {
    width: 100%;
    margin-top: 30px;
    .title {
      font-size: 1.6rem;
      font-weight: 500;
      margin-bottom: 10px;
      padding-bottom: 10px;
      text-transform: capitalize;
      border-bottom: 2px solid #e2e2e2;
    }
    .gridder {
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;
    }
    .bold {
      font-weight: 500;
    }
  }
}

.table_component {
  overflow: auto;
  width: 100%;

  table {
    border: 1px solid #dededf;
    height: 100%;
    width: 100%;
    table-layout: auto;
    border-collapse: collapse;
    border-spacing: 1px;
    text-align: left;
  }

  caption {
    caption-side: top;
    text-align: left;
  }

  th {
    border: 1px solid #dededf;
    background-color: #daeefb;
    color: #000000;
    padding: 5px;
  }

  td {
    border: 1px solid #dededf;
    background-color: #ffffff;
    color: #000000;
    padding: 15px;
  }

  .green1 {
    padding: 5px 10px;
    background: rgb(73, 178, 73);
    border-radius: 5px;
    color: white;
  }

  .red1 {
    padding: 5px 10px;
    background: rgb(200, 47, 47);
    border-radius: 5px;
    color: white;
  }

  .warn1 {
    padding: 5px 10px;
    background: rgb(248, 194, 189);
    border-radius: 5px;
  }
}

.groups {
  margin-top: 20px;
  p {
    font-size: 1.5rem;
    font-weight: 500;
  }

  div {
    display: flex;
    gap: 10px;
  }
}

.avail {
  .type {
    background: #c7ecc7;
    border: 1px solid #9bdf9b;
  }
}

.type {
  padding: 5px;
  background: #ffebe8;
  border: 1px solid #e26450;
  border-radius: 5px;
}

button {
  width: 300px;
  max-width: 100%;
  padding: 15px 20px;
  border-radius: 7px;
  border: none;
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

.btn-groups {
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-btn {
    width: auto;
    margin-left: 20px;
    background: #e2e2e2 !important;
    color: @color;
    box-shadow: none;
}
</style>

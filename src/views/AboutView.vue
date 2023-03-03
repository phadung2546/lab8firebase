<template>
  <br />

  <main>
    <picture />
  </main>
  <TheWelcome />

  <br />
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-hover v-slot="{ isHovering, props }" disabled>
        <v-card :elevation="isHovering ? 12 : 2" class="mx-auto" height="auto" max-width="auto" v-bind="props"
          variant="outlined">
          <v-card-text class="my-4 text-center text-h6"> CRUD </v-card-text>
          <v-responsive class="mx-auto" max-width="344">
            <v-combobox label="ชื่อเมนูภาษาไทย" v-model="menu.nameTH" :items="[
              'ส้มตำ',
              'ไก่ย่าง',
              'ลาบเนื้อ',
              'ปลาร้า',
              'ข้าวขาหมู',
              'ข้าวคลุกกะปิ',
            ]"></v-combobox>

            <v-combobox label="ชื่อเมนูภาษาอังกฤษ" v-model="menu.nameeng" :items="[
              'Papaya salad',
              'Roast chicken',
              'Spicy minced beef',
              'Pickled fish',
              'Stewed pork leg on rice',
              'Shrimp-paste fried rice',
            ]"></v-combobox>
            <v-text-field label="ราคา" variant="outlined" v-model="menu.price"></v-text-field>
            <v-textarea label="รายละเอียด" variant="outlined" v-model="menu.detail"></v-textarea>
            <br />

            <br />

            <center>
              <v-btn rounded="pill" color="primary" @click="addUserdata()"> ADD </v-btn>

              <v-btn rounded="pill" color="primary" @click="showfood()"> SHOW </v-btn>
            </center>
            <br />
            <div>
              <v-table theme="dark" width="500px" class="text-center">
                <thead>
                  <tr>
                    <th>NameThai</th>
                    <th>nameEng</th>
                    <th>Price</th>
                    <th>detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(manuitem, index) in allmenu" :key="index">
                    <td>{{ manuitem.data.nameTH }}</td>
                    <td>{{ manuitem.data.nameeng }}</td>

                    <td>{{ manuitem.data.price }}</td>
                    <td>{{ manuitem.data.detail }}</td>

                    <td>
                      {{ manuitem.id }}
                    </td>

                    <td>
                      <v-btn variant="flat" color="error" @click="deleteMenu(manuitem.id)">
                        delete
                      </v-btn>
                    </td>

                    <td>
                      <div class="text-center">
                        <v-btn color="primary" @click="update(manuitem.id)">
                          edit

                          <v-dialog v-model="dialog" activator="parent" width="600px">
                            <v-card>
                              <v-card-text>
                                <v-combobox label="ชื่อเมนูภาษาไทย" v-model="menu.nameTH" :items="[
                                  'ส้มตำ',
                                  'ไก่ย่าง',
                                  'ลาบเนื้อ',
                                  'ปลาร้า',
                                  'ข้าวขาหมู',
                                  'ข้าวคลุกกะปิ',
                                ]"></v-combobox>

                                <v-combobox label="ชื่อเมนูภาษาอังกฤษ" v-model="menu.nameeng" :items="[
                                  'Papaya salad',
                                  'Roast chicken',
                                  'Spicy minced beef',
                                  'Pickled fish',
                                  'Stewed pork leg on rice',
                                  'Shrimp-paste fried rice',
                                ]"></v-combobox>

                                <v-text-field v-model="menu.price" clearable hide-details="auto"
                                  label="ราคา"></v-text-field>

                                <v-text-field v-model="menu.detail" clearable hide-details="auto"
                                  label="รายละเอียด"></v-text-field>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn color="primary" @click="dialog = false">Close Dialog</v-btn>
                                <v-btn color="primary" @click="confirmmenu(manuitem.id)">confirm</v-btn>

                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-responsive>
          {{ datamenu }}
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <br /><br />
 
</template>
<script setup>
import { ref } from "vue";

import TheWelcome from "../components/TheWelcome.vue";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../main.js";

const dialog = ref(false);
const menu = ref({ nameTH: "", nameeng: "", price: 0, detail: "" });
const allmenu = ref([]);

async function addUserdata() {
  try {
    const docRef = await addDoc(collection(db, "foodmenu"), menu.value);
    console.log("Document written with ID: ", docRef.id);
    alert("เพิ่มเมนูเสร็จสิ้น")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function showfood() {
  const querySnapshot = await getDocs(collection(db, "foodmenu"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());

    //console.log(doc.id);
    const mydata = ref({ id: doc.id, data: doc.data() });
    allmenu.value.push(mydata.value);
  });
}

async function deleteMenu(data) {
  if (confirm("ต้องการลบเมนูหรือไม่ ?")) {
    await deleteDoc(doc(db, "foodmenu", data));
  }
}
const datamenu = ref();
async function update(data2) {
  const docRef = doc(db, "foodmenu", data2);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.id, docSnap.data());
    datamenu.value = (docSnap.data())
    menu.value = datamenu.value;

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    
  }
}

async function confirmmenu(data1) {
  // Add a new document in collection "cities"
  await setDoc(doc(db, "foodmenu", data1), menu.value);
  console.log("dddd");
  alert("แก้ไขเสร็จสิ้น");
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    color: #8c9eff;
  }
}

* body {
  font-family: "montserrat", sans-serif;
}
</style>

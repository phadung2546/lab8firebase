<template>
  <div>
    Email : <input type="text" placeholder="email" v-model="email" /> <br />
    password :<input type="password" name="pwd" id="" v-model="pwd" />
    <button @click="($event) => login()">Login</button>
    <button @click="($event) => regiter()">regiter</button>
    <button @click="($event) => Googlelogin()">Google login</button>
  </div>
  <div>
    ชื่อเมนูไทย <input type="text" name="" id="" v-model="menu.nameTH" /><br />
    ชื่อเมนูอังกฤษ
    <input type="text" name="" id="" v-model="menu.nameeng" /><br />
    ราคา <input type="number" v-model="menu.price" /> รายละเอียด<input
      type="text"
      name=""
      id=""
      v-model="menu.detail"
    /><br />
    <button @click="addUserdata()">adduser</button>
    <button @click="showfood()">แสดงเมนู</button>
  </div>
  <div>
    <table>
      <tr>
        <td>name</td>
        <td>eng</td>
        <td>price</td>
        <td>details</td>
      </tr>
      <tr v-for="(manuitem, index) in allmenu" :key="index">
        <td>{{ manuitem.data.nameTH }}</td>
        <td>{{ manuitem.data.nameeng }}</td>
        <td>{{ manuitem.data.price }}</td>
        <td>
          {{ manuitem.id }}
        </td>
        <td><button @click="deleteMenu(manuitem.id)">del</button></td>
      </tr>
    </table>
    {{ allmenu }}
  </div>
  <div></div>
</template>

<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../main.js";

const router = useRouter();
const pwd = ref("");
const email = ref("");
const provider = new GoogleAuthProvider();
const menu = ref({ nameTH: "", nameeng: "", price: 0, detail: "" });
const allmenu = ref([]);

async function addUserdata() {
  try {
    const docRef = await addDoc(collection(db, "foodmenu"), menu.value);
    console.log("Document written with ID: ", docRef.id);
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
  if (confirm("ต้องการลบรายวิชาหรือไม่ ?")) {
    await deleteDoc(doc(db, "foodmenu", data));
  }
}

function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User : " + user);
      router.push("about");

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
}

function regiter() {}

function Googlelogin() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(token + user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode + errorMessage + email + credential);
    });
}
</script>

<style></style>

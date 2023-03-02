<script setup>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../main";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
{
  {
    docSnap.data;
  }
}
</script>

<template>
  <main>
    <!--   <TheWelcome /> -->
  </main>
  <input type="text" />
</template>

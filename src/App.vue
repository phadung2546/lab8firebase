<script setup>
import { RouterLink, RouterView } from "vue-router";
import {  ref,onMounted } from "vue";
import { getAuth, signOut ,onAuthStateChanged} from "firebase/auth";
 import { useRouter } from "vue-router";

 const router = useRouter();
const auth = getAuth();

const logout = ref(false);

 onMounted(() => {
    //const auth = getAuth();
   onAuthStateChanged(auth, (user) => {
     if (user) {
       logout.value = true;

      // ...
    } else {
       logout.value = false;
       // ...
     }
   });
 });

function LogOut() {
  // const auth = getAuth();
  signOut(auth)
    .then(() => {
      //
      alert("Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

 function reserve(){
   router.push("/about");
 }
</script>

<template>
  <v-app class="co">
    <v-card>
      <v-layout>
        <v-app-bar title="Application bar" color="indigo-darken-4">
          <nav>
            
            <v-btn @click="reserve()" v-if="logout">
              <RouterLink to="/about">ADDMENU</RouterLink>
        </v-btn>
           
            <v-btn icon>
              <v-icon @click="LogOut()" v-if="logout">mdi-export</v-icon>
            </v-btn>
            <RouterLink to="/login">login</RouterLink>
          </nav></v-app-bar
        >

        <v-main style="min-height: 300px"> <RouterView /></v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .co {
    color: #8c9eff;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

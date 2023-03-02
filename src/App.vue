<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, seie docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    auth.setCredentials(user.ldentifier);

    // ...
  }
});
const logout = ref(false);

onMounted(() => {
  const auth = getAuth();
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
  const auth = getAuth();
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
</script>

<template>
  <v-app class="co">
    <v-card>
      <v-layout>
        <v-app-bar title="Application bar" color="indigo-darken-4">
          <nav>
            <RouterLink to="/about">ADDMENU</RouterLink>
            <RouterLink to="/login">login</RouterLink>
            <v-btn icon>
              <v-icon @click="LogOut()" v-if="logout">mdi-export</v-icon>
            </v-btn>
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

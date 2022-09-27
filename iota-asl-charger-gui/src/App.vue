<template>
  <div id="app">
    <div id="header">
      <div class="logo">
        <img alt="Vue logo" src="./assets/logo-icon-light.svg" />
        <img alt="Vue logo" src="./assets/logo-text.svg" />
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  background-color: #1c3879;
  color: #eae3d2;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eae3d2;
}

#header {
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #eae3d2;
}

#nav a.router-link-exact-active {
  color: #48c78e;
}
</style>

<template>
  <div id="app" class="d-flex">
    <SideBar @SetProblem="SetProblem"/>
    <div id="page-content-wrapper">
      <Header/>
      <component :is="CurrentTab">

      </component>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue'
import BinarySearch from './components/BinarySearch.vue'

export default {
  name: 'app',
  components: {
    SideBar,
    Header,
    BinarySearch
  },
  data(){
    return {
      CurrentTab: 'BinarySearch'
    }
  },
  methods: {
    SetProblem(name) {
      this.CurrentTab = name;
    }
  }
}
</script>

<style>
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#app.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #app.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>

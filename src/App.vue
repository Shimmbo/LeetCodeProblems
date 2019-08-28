<template>
  <div id="app" class="d-flex">
    <SideBar :Tab="CurrentTab" @SetTab="SetComponenet"/>
    <div id="page-content-wrapper">
      <Header :Title="CurrentName"/>
      <keep-alive>
      <component :key="ComponentKey" :is="CurrentTab" :Tab="CurrentTab" :CurrentAlgorithm="CurrentAlgorithm" :NeedTarget="NeedTarget" :NeedSort="NeedSort">

      </component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue'
import BinarySearch from './components/binarySearch/BinarySearch.vue'
import BinaryTree from './components/binaryTree/BinaryTree.vue'

export default {
  name: 'app',
  components: {
    SideBar,
    Header,
    BinarySearch,
    BinaryTree
  },
  data(){
    return {
      CurrentTab: 'BinarySearch',
      CurrentAlgorithm: 'FindTarget',
      CurrentName: 'Binary Search',
      NeedTarget: true,
      NeedSort: true
    }
  },
  computed: {
    ComponentKey() {
      return this.CurrentTab + "_" + this.CurrentAlgorithm;
    }
  },
  methods: {
    SetComponenet(tab, algorithm, name, needTarget, needSort) {
      this.CurrentTab = tab;
      this.CurrentAlgorithm = algorithm;
      this.CurrentName = name;
      this.NeedTarget = needTarget;
      this.NeedSort = needSort;
      this.$forceUpdate();
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


/* Style the sidenav links and the dropdown button */
.sidenav a, .dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  display: block;
  border: none;
  background: none;
  width:100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}

.sidenav .dropdown-btn {
  background-color: #dae0e5 !important;
}

.sidenav a:hover, .dropdown-btn:hover {
  background-color: #dae0e5!important;
}

.active {
  background-color: #dae0e5;
}

.dropdown-container {
  display: none;
  padding-left: 8px;
}
.drop-active{
  display: block;
}
</style>

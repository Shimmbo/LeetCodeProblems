<template>
    <nav id="header" class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <h3>{{Title}}</h3>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
</template>

<script>
export default {
  name: 'Header',
  props:["Title"]
}
</script>
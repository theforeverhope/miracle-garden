<template lang="html">
    <div class="iframe-wrapper">
        <iframe class="iframe-content" src="/city/index.html" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true" name="mapFrame" scrolling="no" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'Car',
    props: {},
    data() {
        return {}
    }
}
</script>

<style>
.iframe-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.iframe-content {
    width: 100%;
    height: -webkit-fill-available;
}
</style>
<template>
    <div>
        <a  v-for="p in pictures" :key="p.id"
            class="img-thumbnail">
            <img :src="p.picture" />
        </a>
    </div>
</template>
<script>
export default {
    name: "PicturePicker",
    data: function () {
        return{

        }
    },
    props: {
        pictures: Array
    }
}
</script>

<style lang="scss">
    .img-thumbnail {
        display: inline-block;
        margin: 5px;
        width: 75px;
        height: 75px;
        text-align: center;
        img {
            max-width: 95%;
            max-height: 95%;
            border-radius: 3px;
        }
    }
</style>

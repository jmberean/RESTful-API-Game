<template>
    <div class="card card-default">
        <div class="embed-responsive embed-responsive-4by3">
            <video @click.prevent="capture" ref="video" id="video" autoplay  class="embed-responsive-item"></video>
        </div>
        <PicturePicker :pictures="captures" ></PicturePicker>
        <canvas ref="canvas" id="canvas"></canvas>
    </div>
</template>

<script>
export default {
    data(){
        return {
            captures: []
        }
    },
    methods: {
        capture(){
            const width = this.canvas.width = this.video.videoWidth;
            const height = this.canvas.height = this.video.videoHeight;

            this.context2d.drawImage(this.video, 0, 0, width, height);
            this.captures.push({
                id: this.captures.length,
                picture: this.canvas.toDataURL("image/png")
            });
        }
    },
    mounted(){
        this.video = this.$refs.video;
        this.canvas = this.$refs.canvas;
        this.context2d = this.canvas.getContext("2d");

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            this.video.src = window.URL.createObjectURL(stream);
            this.video.play();
        }).catch(err => console.log(err));
    },
    computed:{
        
    }
}
</script>

<style lang="scss">
    #canvas {
        display: none;
    }
</style>

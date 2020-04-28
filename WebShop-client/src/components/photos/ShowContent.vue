<template>
    <div></div>
</template>
<script>
export default {
    data() {
        return {
            id: this.$route.query.id * 1
        }
    },
    created() {
        this.getshowbyid()
    },
    methods: {
        async getshowbyid() {
            var result = await this.axios.get('/api/getshowbyid', {
                params: {
                    id: this.id
                }
            })
            console.log(result)
        }
    }
}
</script>
<style lang="less">
.show {
    display: flex;
    div {
        flex: 1;
        // height: 40px;
        background-color: pink;

        img {
            width: 35px;
            height: 35px;
            border-radius: 5px;
        }
    }
}
.imgDiv {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    span {
        font-size: 12px;
    }
}
</style>

<template>
    <div class="pagination">
        <!-- 自定义事件传参使用clcik="$enit(自定义事件的名字,传递的参数)" -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)" >上一页</button>
        <button v-if="continuesPage.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="continuesPage.start>2">···</button>
        <!-- v-for遍历数字和v-if联合使用 -->
        <button v-for="(page,index) in continuesPage.end" :key="index" :class="{active:pageNo==page}" v-if="page>=continuesPage.start" @click="$emit('getPageNo',page)">{{ page }}</button>

        <button v-if="continuesPage.end<this.totalPage-1">···</button>
        <button v-if="continuesPage.end<this.totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
        <button :disabled="pageNo==continuesPage.end" @click="$emit('getPageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共{{ total }}条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        //总共多少页
        totalPage(){
            //return ~~(this.total/this.pageSize) + (this.total%this.pageSize==0?0:1)//~~可以干掉小数部分
            return Math.ceil(this.total/this.pageSize)
        },
        //连续的页码
        continuesPage(){
            let start=0
            let end=0
            if(this.totalPage<this.continues){
                start=1
                end=this.totalPage
            }else{
                start=this.pageNo-~~(this.continues/2)
                end=this.pageNo+~~(this.continues/2)
                if(start<1){
                    start=1
                    end=this.continues
                }else if(end>this.totalPage){
                    end=this.totalPage
                    start=end-this.continues+1
                }
            }
            return {"start":start,"end":end}
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
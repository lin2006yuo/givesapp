<template>
  <div class="request-all">
    <x-header title="全部索取">
    </x-header>
    <div class="box">
      <tab
        :line-width="2"
        prevent-default
        custom-bar-width="24px"
        @on-before-index-change="switchTabItem">
        <tab-item :selected="curIdx === 0">
          禮物（{{giftTotal}}）
        </tab-item>
        <tab-item :selected="curIdx === 1">
          需求（{{needTotal}}）
        </tab-item>
      </tab>
    </div>
    <div class="container g-smooth">
      <group
        class="content-wrapper"
        id="requestIndexPanel"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10">
        <div
          v-if="!demands[type[curIdx]].data.length && !nextPageUrl"
          class="oops">
          暫無相關資料
        </div>
        <cell-box
          :key="index"
          v-for="(item, index) in demands[type[curIdx]].data">
          <item-card
            :pool-type="type[curIdx]"
            :card-info="item"
            :item-id="item[type[curIdx]] && item[type[curIdx]].id">
          </item-card>
        </cell-box>
        <inline-loading
          v-show="curPage !== 0 && isLoading">
        </inline-loading>
        <divider
          v-show="demands[type[curIdx]].data.length && !nextPageUrl"
          class="g-divider p-divider">
          沒有更多了
        </divider>
      </group>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Group, CellBox, Divider } from 'vux'
import ItemCard from '@/components/deals/ReqItemCard'
import {mapActions, mapState, mapMutations} from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import InlineLoading from '@/components/InlineLoading'
import anchorMixin from '@/mixins/anchor'

export default {
  mixins: [anchorMixin],
  directives: {
    infiniteScroll
  },
  components: {
    Tab,
    TabItem,
    ItemCard,
    Group,
    CellBox,
    InlineLoading,
    Divider
  },
  data () {
    return {
      type: ['gift', 'need'],
      needTotal: 0,
      giftTotal: 0,
      gift: {
        isLoading: false,
        busy: false
      },
      need: {
        isLoading: false,
        busy: false
      }
    }
  },
  created () {
    this.getDemandTotal({
      cb: (data) => {
        this.needTotal = data
      }
    })
    this.getDemandTotal({
      type: 'present',
      cb: (data) => {
        this.giftTotal = data
      }
    })
  },
  beforeDestroy () {
    this.resetDeals()
  },
  methods: {
    ...mapActions({
      getDemandTotal: 'getDemandTotal',
      getMyDemands: 'getMyDemands',
      getDealsCategory: 'getDealsCategory'
    }),
    ...mapMutations({
      setDemandsCurIdx: 'setDemandsCurIdx',
      resetDeals: 'resetDeals'
    }),
    switchTabItem (index) {
      if (index !== this.curIdx) {
        const div = document.getElementById('requestIndexPanel')
        div.scrollTo(0, 0)
        this.setDemandsCurIdx({index})
      }
      if (this.curPage === 0 && this.nextPageUrl) {
        const isToGet = (this.type[this.curIdx] === 'need' && !this.needTotal) ||
          (this.type[this.curIdx] === 'gift' && !this.giftTotal)
        if (isToGet) {
          return
        }
        this.loadMore()
      }
    },
    loadMore () {
      if (!this.isNotGetCategory) {
        return this.toLoad()
      }
      this.getDealsCategory({
        cb: this.toLoad
      })
    },
    toLoad () {
      if (this.nextPageUrl && this.isHas) {
        this[this.type[this.curIdx]].busy = true
        // this.$vux.loading.show({
        //   text: '加載中...'
        // })
        this[this.type[this.curIdx]].isLoading = true
        if (this.curPage === 0) {
          this.$Loading.show()
        }
        if (this.type[this.curIdx] === 'gift') {
          this.getMyDemands({
            page: this.curPage + 1,
            cb: this.loadMoreCb
          })
        } else {
          this.getMyDemands({
            page: this.curPage + 1,
            type: 'present',
            cb: this.loadMoreCb
          })
        }
      }
    },
    loadMoreCb () {
      // this.$vux.loading.hide()
      if (this.curPage === 1) {
        this.$Loading.hide()
      }
      this[this.type[this.curIdx]].isLoading = false
      if (this.nextPageUrl) {
        this[this.type[this.curIdx]].busy = false
      }
    }
  },
  computed: {
    ...mapState({
      demands: state => state.deals.demands,
      giftRequest: state => state.deals.category.gift_request
    }),
    isHas () {
      return Object.entries(this.giftRequest).some(([, val]) => val)
    },
    isNotGetCategory () {
      return Object.entries(this.giftRequest).every(([, val]) => val === '')
    },
    curIdx () {
      return this.demands.curIdx
    },
    curPage () {
      return this.demands[this.type[this.curIdx]].curPage
    },
    nextPageUrl () {
      return this.demands[this.type[this.curIdx]].nextPageUrl
    },
    busy () {
      return this[this.type[this.curIdx]].busy
    },
    isLoading () {
      return this[this.type[this.curIdx]].isLoading
    }
  },
  activated () {
    this.initAnchor('requestIndexPanel')
  }
}
</script>

<style lang="less">
  .request-all{
    .box{
      .vux-tab{
        .vux-tab-bar-inner{
          background: linear-gradient(to right, @color-font-CR 50%, @color-CO 50%)
        }
        .vux-tab-item{
          background: none;
          font-size: @font-S1;
          &.vux-tab-selected{
            color: @color-font-CR;
          }
        }
      }
    }
    .container{
      .weui-cells{
        padding: 0;
        margin: 0;
        &:before, &:after{
          display: none;
        }
        .weui-cell{
          padding: 0;
          &:before, &:after{
            display: none;
          }
          &:nth-last-child(3){
            .req-item-card{
              &:after{
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="less" scoped>
  .request-all{
    height: 100%;
    .container{
      padding: 0 @pm-bg;
      margin-top: @pm-md;
      height: calc(~"100% - 100px");
      overflow-y: scroll;
      .content-wrapper{
        height: 100%;
        overflow: scroll;
        .oops{
          margin-top: 100px;
          color: @color-font-C2;
          font-size: @font-S3;
          text-align: center;
        }
        .p-divider{
          padding: @pm-bg 0 !important;
        }
      }
    }
  }
</style>

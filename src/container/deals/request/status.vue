<template>
  <div class="request-some">
    <x-header :title="title">
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
        id="requestStatusPanel"
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
            :item-id="item[type[curIdx]].id">
          </item-card>
        </cell-box>
        <inline-loading v-show="curPage !== 0 && isLoading">
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
  props: {
    status: {
      type: String,
      default: ''
    }
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
  activated () {
    // this.initAnchor('requestStatusPanel')
  },
  created () {
    const status = this.status
    this.getDemandTotal({
      status,
      cb: (data) => {
        this.needTotal = data
      }
    })
    this.getDemandTotal({
      status,
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
      getMyDemands: 'getMyDemands',
      getDemandTotal: 'getDemandTotal',
      getDealsCategory: 'getDealsCategory'
    }),
    ...mapMutations({
      resetDeals: 'resetDeals',
      setDemandsCurIdx: 'setDemandsCurIdx'
    }),
    switchTabItem (index) {
      if (index !== this.curIdx) {
        const div = document.getElementById('requestStatusPanel')
        div.scrollTo(0, 0)
        const status = this.status
        this.setDemandsCurIdx({status, index})
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
      const status = this.status
      if (this.nextPageUrl && this.giftRequest[`${status}_total`]) {
        this[this.type[this.curIdx]].busy = true
        this[this.type[this.curIdx]].isLoading = true
        if (this.curPage === 0) {
          this.$Loading.show()
        }
        if (this.type[this.curIdx] === 'gift') {
          this.getMyDemands({
            status,
            page: this.curPage + 1,
            cb: this.loadMoreCb
          })
        } else {
          this.getMyDemands({
            status,
            page: this.curPage + 1,
            type: 'present',
            cb: this.loadMoreCb
          })
        }
      }
    },
    loadMoreCb () {
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
      demandsAll: state => state.deals.demands,
      giftRequest: state => state.deals.category.gift_request
    }),
    demands () {
      const status = this.status
      return this.demandsAll[status]
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
    isNotGetCategory () {
      return Object.entries(this.giftRequest).every(([, val]) => val === '')
    },
    title () {
      let title = ''
      switch (this.status) {
        case 'requesting': title = '索取中'; break
        case 'remitting': title = '待匯運費'; break
        case 'remitted': title = '寄送中'; break
        case 'sent': title = '待收件'; break
        case 'finished': title = '待感謝'; break
      }
      return title
    },
    busy () {
      return this[this.type[this.curIdx]].busy
    },
    isLoading () {
      return this[this.type[this.curIdx]].isLoading
    }
  }
}
</script>

<style lang="less">
  .request-some{
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
  .request-some{
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

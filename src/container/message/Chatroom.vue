<template>
  <div class="g-block null pad-chatroom-main" style="overflow: hidden">
    <x-header
      v-if="isTrade"
      title="互動卡">
    </x-header>
    <div :class="isTrade ? 'content' : 'content for-user-content'">
      <Steps :steps="steps"
             :is-cancel="(detail.item && detail.item.status) === ShipStatus.SHIP_STATUS_CANCEL"
             :not-obtained="(detail.item && detail.item.status) === ShipStatus.SHIP_STATUS_NOT_OBTAINED"
             :substate="detail.item && detail.item.substate"
             v-if="isTrade"
             :currentStep="detail.currentStep">
      </Steps>
      <x-header
        v-if="!isTrade"
        :title="chatTitle">
      </x-header>
      <div :class="isTrade ? 'pad-chatroom' : 'pad-chatroom for-user'">
        <div class="console-chatroom" id="console-chatroom">
          <ChatItem v-for="(item, index) in messages"
                    v-bind:key="index"
                    v-on:enlarge="doEnlargeImage"
                    :type="item.type"
                    :from-user-id="item.from_user_id"
                    :isMine="item.isMine"
                    :isPicture="item.isPicture"
                    :time="item.created_at | smartDate"
                    :content="item.content"
                    :avatar="item.avatar">
          </ChatItem>
        </div>
        <div class="pad-functions" >
          <div v-if="detail.item">
            <RequestingStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_REQUESTING"
                            :iAmOwner="detail.iAmOwner"
                            :doSend="doSendItem"
                            :doIgnore="doIgnore"
                            :toggleModal="toggleModal">
            </RequestingStep>
            <InitStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_INIT"
                      :iAmOwner="detail.iAmOwner"
                      :doIgnore="doIgnore"
                      :doTake="doSendItem"
                      :toggleModal="toggleModal">
            </InitStep>
            <PassStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_PASS"
                      :iAmOwner="detail.iAmOwner"
                      :wantType="detail.wantType"
                      :doCancel="doCancel"
                      :doAction="doSendItem"
                      :toggleModal="toggleModal">
            </PassStep>
            <RemittingStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_REMITTING"
                           :iAmOwner="detail.iAmOwner"
                           :doCancel="doCancel"
                           :doTransfer="doTransfer"
                           :toggleModal="toggleModal">
            </RemittingStep>
            <RemittedStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_REMITTED"
                          :iAmOwner="detail.iAmOwner"
                          :doCancel="doCancel"
                          :shipway="detail.item.shipway"
                          :doSend="doConfirmShip"
                          :doReceiveMoney="doReceiveMoney"
                          :toggleModal="toggleModal">
            </RemittedStep>
            <ReceivedMoneyStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_RECEIVED_MONEY"
                               :iAmOwner="detail.iAmOwner"
                               :shipway="detail.item.shipway"
                               :shipsn="detail.item.shipsn
                               || (deal.gift_request && (deal.gift_request.gift_ec_order) && deal.gift_request.gift_ec_order.check_code)
                               || (deal.need_donate && (deal.need_donate.need_ec_order) && deal.need_donate.need_ec_order.check_code)
                               || ''"
                               :optIsReceiver="detail.item.shipopts"
                               :doCancel="doCancel"
                               :doSent="doSent"
                               :toggleModal="toggleModal">
            </ReceivedMoneyStep>
            <SentStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_SENT"
                      :iAmOwner="detail.iAmOwner"
                      :identity="user.catHash"
                      :doReceived="doReceived"
                      :toggleModal="toggleModal">
            </SentStep>
            <CanceledStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_CANCEL ||
                                detail.item.status === ShipStatus.SHIP_STATUS_NOT_OBTAINED"
                          :canceled="detail.item.status === ShipStatus.SHIP_STATUS_CANCEL"
                          :notObtained="detail.item.status === ShipStatus.SHIP_STATUS_NOT_OBTAINED"
                          :toggleModal="toggleModal">
            </CanceledStep>
            <FinishedStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_FINISHED"
                          :iAmOwner="detail.iAmOwner"
                          :doThanks="doThanks"
                          :toggleModal="toggleModal">
            </FinishedStep>
            <ThankedStep v-if="detail.item.status === ShipStatus.SHIP_STATUS_THANKS"
                         :iAmOwner="detail.iAmOwner"
                         :identity="user.catHash"
                         :toggleModal="toggleModal">
            </ThankedStep>
          </div>
          <div class="pad-input-detail">
            <input class="input-message"
                   type="text"
                   ref="inputMessage"
                   v-model="cMsg"
                   readonly="readonly"
                   @click="toggleMsgConfrim"
                   placeholder="輸入訊息...">
            <input type="file"
                   accept="image/*"
                   class="input-uploader"
                   @change="uploadImage">
            <button class="btn-choose-image"
                    @click="doTriggerUpload"></button>
            <button class="btn-send-message"
                    @click="sendMessage"></button>
          </div>
        </div>
        <image-enlarge
          :image="enlargeImgSrc"
          @toggleShow="toggleShow"
          :is-show="isEnlargeImage"
        >
        </image-enlarge>
      </div>
      <div :class="showModal ? 'g-modal show' : 'g-modal'">
        <IndexInfo
          :deal="deal"
          :toggleModal="toggleModal"
          :iAmOwner="detail.iAmOwner">
        </IndexInfo>
      </div>
      <div :class="showTransferModal ? 'g-modal show' : 'g-modal'">
        <div class="modal-content">
          <header class="header">
              <span class="g-title">
                確認 <small>/ 請填寫您匯款給對方的帳戶資料</small>
              </span>
            <button class="btn-close" @click="toggleTransferModal">
              <img src="./../../assets/icon/message/icon-times.png" alt="" class="src">
            </button>
          </header>
          <div class="x-row">
            <span class="degree">元</span>
            <x-input title="匯款金額"
                     required
                     v-model="transferInfo.receiver_remit_money"
                     type="number">
            </x-input>
          </div>
          <div class="x-row">
            <label >匯款銀行</label>
            <!--<span class="degree">-->
            <!--<img src="./../../assets/icon/message/icon-arrow-down.png" alt="" />-->
            <!--</span>-->
            <PopupPicker :data="banklist"
                         class="content bank-picker"
                         v-model="chooseBank"
                         :columns="1"
                         :show="showPicker">
            </PopupPicker>
          </div>
          <div class="x-row">
            <x-input title="匯款分行"
                     required
                     placeholder="請輸入"
                     v-model="transferInfo.receiver_bank_branch"
                     type="text">
            </x-input>
          </div>
          <div class="x-row">
            <x-input title="匯款戶名"
                     required
                     placeholder="請輸入"
                     v-model="transferInfo.receiver_bank_account_name"
                     type="text">
            </x-input>
          </div>
          <div class="x-row">
            <x-input title="帳號末五碼"
                     :max="5"
                     required
                     placeholder="請輸入"
                     v-model="transferInfo.receiver_bank_account_number"
                     type="text">
            </x-input>
          </div>
          <div class="x-row" style="margin-top: 15px">
            <button class="g-button red" @click="doConfirmTransfer">通知對方您已匯款</button>
          </div>
        </div>
      </div>
      <confirm
        class="chatroom-message-confirm chatroom-message-input"
        v-model="isOpenMsgConfirm"
        hide-on-blur
        theme="android"
      >
        <x-header
          title="發送訊息"
          :left-options="{preventGoBack: true}"
          @on-click-back="toggleMsgConfrim"
        >
        </x-header>
        <div class="box">
          <div class="box-panel">
            <group>
              <x-textarea
                ref="messageTextarea"
                :rows="2"
                :cols="10"
                :autosize="true"
                :max="300"
                v-model.trim="content"
                placeholder="請輸入訊息..."
                :show-counter="true"
                class="message-textarea"
              >
              </x-textarea>
            </group>
            <div class="pad-stick-bottom">
              <button class="g-button red" @click="sendMessage">
                確認發送
              </button>
              <button class="g-button blank red" @click="toggleMsgConfrim">
                稍後再寫
              </button>
            </div>
          </div>
        </div>
      </confirm>
    </div>
  </div>
</template>
<script>
import MessageAPI from './../../store/apis/message'
import GiftAPI from './../../store/apis/gift'
import NeedAPI from './../../store/apis/need'
import ThingAPI from './../../store/apis/thing'
import { queryString } from './../../tools/axios'
import { messageType, statusMap, ShipStatus, banklist, shipMapping, Shipways } from './../../tools/constant'
import { getSmartDate } from './../../tools/datetime'
import { getConversationContent, getLastChar, getBankFromCode, statusMapStep } from './../../tools/strMap'
import RequestingStep from '../../components/tradeStepButtons/RequestingStep'
import CanceledStep from '../../components/tradeStepButtons/CanceledStep'
import FinishedStep from '../../components/tradeStepButtons/FinishedStep'
import InitStep from '../../components/tradeStepButtons/InitStep'
import PassStep from '../../components/tradeStepButtons/PassStep'
import ReceivedMoneyStep from '../../components/tradeStepButtons/ReceivedMoneyStep'
import RemittedStep from '../../components/tradeStepButtons/RemittedStep'
import RemittingStep from '../../components/tradeStepButtons/RemittingStep'
import SentStep from '../../components/tradeStepButtons/SentStep'
import ThankedStep from '../../components/tradeStepButtons/ThankedStep'
import IndexInfo from '../../components/tradeInfos/Index'
import Steps from '../../components/Steps'
import ChatItem from '../../components/ChatItem'
import ImageEnlarge from '@/components/ImageEnlarge'
import { PopupPicker, Confirm, XTextarea } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Steps,
    RequestingStep,
    ChatItem,
    CanceledStep,
    FinishedStep,
    InitStep,
    PassStep,
    ReceivedMoneyStep,
    RemittedStep,
    RemittingStep,
    SentStep,
    ThankedStep,
    IndexInfo,
    PopupPicker,
    Confirm,
    XTextarea,
    ImageEnlarge
  },
  data () {
    return {
      deal: {},
      isTrade: true, // 是否為交易窗口
      detail: {
        messages: []
      },
      title: '',
      chatTitle: '',
      from: '',
      showModal: false,
      ShipStatus,
      Shipways,
      content: '', // 文本栏
      steps: [
        { text: '索取中' },
        { text: '匯款中' },
        { text: '寄送中' },
        { text: '已完成' }
      ],
      info: { // 寄送資訊
        receiver_name: '',
        receiver_phone: '',
        shipway: '',
        address: '',
        shipsn: '',
        giver_name: '',
        giver_phone: '',
        giver_bank_info: '',
        receiver_bank_info: ''
      },
      transferInfo: {
        receiver_bank: '',
        receiver_bank_account_name: '',
        receiver_bank_account_number: '',
        receiver_bank_branch: '',
        receiver_remit_money: ''
      },
      chooseBank: ['無'],
      showTransferModal: false,
      messages: [],
      timer: null,
      showPicker: false,
      needScroll: false,
      banklist: [],
      isOpenMsgConfirm: false,
      cMsg: '',
      isEnlargeImage: false,
      enlargeImgSrc: ''
    }
  },
  methods: {
    ...mapActions({
      getMyDemands: 'getMyDemands'
    }),
    toggleMsgConfrim () {
      this.isOpenMsgConfirm = !this.isOpenMsgConfirm
      if (this.isOpenMsgConfirm) {
        this.$refs.inputMessage.blur()
        setTimeout(() => {
          this.$refs.messageTextarea.focus()
        }, 300)
      }
    },
    sendMessage () {
      /* eslint-disable camelcase */
      if (!this.content) {
        this.$vux.toast.text('訊息內容不能為空', 'bottom')
        return
      }
      const { isTrade } = this
      this.$vux.loading.show({
        text: '發送訊息中...'
      })
      if (isTrade) {
        const { direct_user_id, gift_request_id, type, need_donate_id } = this.detail
        const bundle = {
          message_content: this.content,
          message_type: 'text',
          direct_user_id,
          gift_request_id,
          type,
          need_donate_id
        }
        MessageAPI.sendTradeMessage(bundle, (data) => {
          this.$vux.loading.hide()
          this.content = ''
          this.getDetail()
          this.toggleMsgConfrim()
        })
      } else {
        const { id: direct_user_id } = this.$route.params
        const bundle = {
          message_content: this.content,
          message_type: 'text',
          direct_user_id
        }
        MessageAPI.sendUserMessage(bundle, (data) => {
          this.$vux.loading.hide()
          this.content = ''
          this.getDetail()
          this.toggleMsgConfrim()
        })
      }
    },
    getDetail () {
      const { isTrade } = this
      const { id } = this.$route.params
      if (isTrade) {
        this.needScroll = false
        MessageAPI.getConversationDetail(id, (data) => {
          (this.detail.messages.length !== data.messages.length) && (this.needScroll = true)
          this.detail = data
          // 定義物品內容
          this.detail.item = data.gift_request || data.need_donate
          // 定義是否為索取類型
          this.detail.wantType = data.type !== 'gift_request'
          // 定義是否為該贈物主人
          this.detail.iAmOwner =
            (data.gift_request && data.gift_request.user_id === data.direct_user_id) ||
            (data.need_donate && data.need_donate.user_id === data.user_id)
          // 定義是否為索取者付運費
          // this.detail.optIsReceiver = this.detail.shipopts === 'receiver'
          for (let item of statusMap) {
            if (item.text === this.detail.item.status) {
              this.detail.currentStep = item.step
              break
            }
          }
          this.title = `${getSmartDate(data.created_at, true)}索取${this.detail.item.title}`
          this._analyseTradeMessages()
          this._analyseTransferInfo()
          this._transferData()
        })
      } else {
        this.needScroll = false
        MessageAPI.getChattingDetail(id, (data) => {
          if (data) {
            this.detail.messages.length !== data.length && (this.needScroll = true)
            this.detail.messages = data
            this._analyseUserMessages()
          }
        })
      }
    },
    // 分析消息方法
    _analyseTradeMessages () {
      const { user, direct_user: directUser } = this.detail
      this.messages = this.detail.messages.map((v) => {
        v.isPicture = v.type === 'image'
        v.type = v.type === 'text'
          ? messageType.MESSAGE_TYPE_TEXT
          : v.type = messageType.MESSAGE_TYPE_PICTURE
        if (v.business_type === 'request_reason') {
          v.type = messageType.MESSAGE_TYPE_REQUEST_REASON
        }
        if (v.business_type === 'thanks') {
          v.type = messageType.MESSAGE_TYPE_THANKS
        }
        v.is_system && (v.type = messageType.MESSAGE_TYPE_SYSTEM)
        v.isMine = (this.user.id === v.from_user_id)
        v.avatar = v.isMine
          ? this.user.pics
          : this.user.id === this.detail.direct_user_id
            ? user.pics
            : directUser.pics
        v.content = getConversationContent(v.content, this.detail)
        return v
      })
      this.needScroll && this.initScrollToBottom()
    },
    _analyseUserMessages () {
      // const { id: direct_user_id, directUserName: nickname } = this.$route.params
      const { directUserName: nickname } = this.$route.query
      this.chatTitle = `與會員${nickname || ''}聊天`
      if (this.detail.messages.length) {
        // const { from_user_id } = this.detail.messages[0]
        // const nickname = (parseInt(direct_user_id) === parseInt(from_user_id)
        //   ? this.detail.messages[0].from_user.nickname
        //   : this.detail.messages[0].to_user.nickname)
        this.messages = this.detail.messages.map((msg) => {
          const { from_user_id, user_id, content, is_system, type } = msg
          return {
            ...msg,
            isMine: from_user_id === user_id,
            content,
            // 消息類型： 1 表示文本 2 表示圖片 3 表示系統消息
            type: is_system ? 3 : (type === 'text' ? 1 : 2),
            avatar: msg.from_user.pics,
            isPicture: type === 'image'
          }
        }).reverse()
        this.needScroll && this.initScrollToBottom()
      }
    },
    _analyseTransferInfo () {
      const { item } = this.detail
      if (item) {
        let {
          receiver_name,
          receiver_phone,
          shipway,
          shipfee,
          shipsn,
          receiver_fami,
          giver_bank_account_name,
          giver_bank_account_number,
          giver_bank_branch,
          giver_bank,
          giver_name,
          giver_phone,
          giver_city,
          giver_district,
          giver_address,
          receiver_bank_account_name,
          receiver_bank_account_number,
          receiver_bank_branch,
          receiver_bank
        } = item
        let address = shipMapping.infos.STRING_SHOW_AFTER_SEND
        let giver_bank_info = ``
        let receiver_bank_info = ''
        if (shipway === Shipways.SHIPWAY_FAMI) {
          address = `全家店號 ${receiver_fami}`
          if (giver_bank) {
            giver_bank_info = `${getBankFromCode(giver_bank)} ${giver_bank_branch} ${giver_bank_account_name} ${giver_bank_account_number}`
          } else {
            giver_bank_info = shipMapping.infos.STRING_SHOW_AFTER_SEND
          }
          if (receiver_bank) {
            receiver_bank_info = `${getBankFromCode(receiver_bank)} ${receiver_bank_branch} ${receiver_bank_account_name} ${receiver_bank_account_number}`
          } else {
            receiver_bank_info = shipMapping.infos.STRING_SHOW_AFTER_TRANSFER
          }
        } else if (shipway === Shipways.SHIPWAY_MEET) {
          address = `${giver_city} ${giver_district} ${giver_address}`
        } else if (shipway === Shipways.SHIPWAY_HCT) {
          shipsn = shipMapping.infos.STRING_SHIPSN_TIPS_FOR_HCT
        }

        this.info = {
          ...this.info,
          receiver_name,
          receiver_phone,
          shipway,
          shipfee,
          shipsn: shipsn || shipMapping.infos.STRING_SHOW_AFTER_GOT_MONEY,
          address,
          giver_name: giver_name || shipMapping.infos.STRING_SHOW_AFTER_SEND,
          giver_phone:
            giver_phone ||
            (!giver_name
              ? shipMapping.infos.STRING_SHOW_AFTER_SEND
              : shipMapping.infos.STRING_NOT_PROVIDE),
          giver_bank_info,
          receiver_bank_info
        }
      }
    },
    // 舊代碼
    _transferData () {
      /* eslint-disable */
      const { detail: payload } = this
      const status = (
        payload &&
        payload.gift_request &&
        payload.gift_request.status) ||
        (payload && payload.need_donate && payload.need_donate.status);
      const step = statusMapStep(status);
      const accepter = payload && payload.need_donate &&
        (payload.need_donate.user_id === payload.user.id ? payload.user : payload.direct_user) ||
        payload && payload.gift_request &&
        (payload.gift_request.user_id === payload.user_id ? payload.direct_user : payload.user);
      const gift = payload && payload.gift_request;
      const needDonate = payload && payload.need_donate;
      const receiver = payload && payload.need_donate && (payload.need_donate.user_id === payload.user.id ? payload.direct_user : payload.user) ||
                       payload.gift_request && (payload.gift_request.user_id === payload.user_id ? payload.user : payload.direct_user);
      this.deal = {
        types: payload.type === 'gift_request' ? 'GIVES':'WANTS',
        step,
        infoHash: payload.id,
        chatHash: payload.id,
        need_donate: payload.need_donate ? payload.need_donate : false,
        need_donate_id:payload.need_donate_id,
        direct_user: payload.direct_user,
        gift_request_id:payload.gift_request_id,
        id: payload.gift_request && payload.gift_request_id || payload.need_donate && payload.need_donate_id,
        updatetime: payload.updated_at,
        title: payload.gift_request && payload.gift_request.gift.title || payload.need_donate && payload.need_donate.need_item.name,
        pic: payload.gift_request && payload.gift_request.gift.image_path ||
        payload.need_donate && payload.need_donate.image_path,
        quant: payload.gift_request && payload.gift_request.quantity || payload.need_donate && payload.need_donate.quantity || 0,
        orgquant: payload.orgquant,
        iAmOwner: payload.gift_request && payload.gift_request.user_id == payload.direct_user_id || payload.need_donate && payload.need_donate.user_id == payload.user_id,
        thgHash: payload.gift_request && payload.gift_request.gift_id || payload.need_donate && payload.need_donate.id,
        shipway: payload.gift_request && payload.gift_request.shipway || payload.need_donate && payload.need_donate.shipway,
        shipfee: (payload.gift_request && payload.gift_request.shipfee) || (payload.need_donate && payload.need_donate.shipfee) || 0,
        shipopts: payload.gift_request && payload.gift_request.shipopts || payload.need_donate && payload.need_donate.shipopts,
        shipsn: payload.gift_request && payload.gift_request.shipsn || payload.need_donate && payload.need_donate.shipsn || '',
        boxes: gift ? (gift.giver_boxes || 0) : 0,		// 新竹物流配送的箱數
        pickdate: gift && gift.giver_sent_at || needDonate && needDonate.giver_sent_at || '待定',
        famiCode: needDonate && needDonate.receiver_fami || gift && gift.receiver_fami,
        ownerHash: payload.user_id,
        address: payload.address,
        wantType: (payload.type !== 'gift_request'),
        items: {
          id: payload.gift_request && payload.gift_request_id || payload.need_donate && payload.need_donate_id,
          ...(payload.gift_request && payload.gift_request.gift || payload.need_donate && payload.need_donate.need_item),
          sums: payload.gift_request && payload.gift_request.gift.quantity || payload.need_donate && payload.need_donate.need_item && payload.need_donate.need_item.quantity,
          sents: payload.gift_request && (payload.gift_request.gift.quantity - payload.gift_request.gift.left) || payload.need_donate && payload.need_donate.need_item && (payload.need_donate.need_item.quantity - payload.need_donate.need_item.left) || 0,
        },
        counts: {
          totalSums: payload.gift_request && payload.gift_request.gift.quantity || payload.need_donate && payload.need_donate.need_item && payload.need_donate.need_item.quantity,
          sums: payload.gift_request && payload.gift_request.quantity || payload.need_donate && payload.need_donate.quantity,
          left: payload.gift_request && payload.gift_request.gift.left || payload.need_donate && payload.need_donate.need_item && payload.need_donate.need_item.left,
          sents: payload.gift_request && (payload.gift_request.gift.quantity - payload.gift_request.gift.left) || payload.need_donate && payload.need_donate.need_item && (payload.need_donate.need_item.quantity - payload.need_donate.need_item.left) || 0,
        },
        accepter: accepter && {
          name: gift ? (gift.giver_name || '-') : '-',
          phone: gift ? (gift.giver_phone || '-') : '-', // 不清楚座机还是手机
          address: gift ? ((gift.giver_city || '') + (gift.giver_district || '') + (gift.giver_address || '')) : '-',
          title: payload.need_donate && payload.need_donate.giver_bank_account_name || payload.gift_request && payload.gift_request.giver_bank_account_name,
          number: payload.need_donate && payload.need_donate.giver_bank_account_number || payload.gift_request && payload.gift_request.giver_bank_account_number,
          bank: payload.need_donate && payload.need_donate.giver_bank || payload.gift_request && payload.gift_request.giver_bank,
          branch: payload.need_donate && payload.need_donate.giver_bank_branch || payload.gift_request && payload.gift_request.giver_bank_branch,
          account_number: gift ? (gift.giver_bank_account_number || '') : '',
          account_name: gift ? (gift.giver_bank_account_name || '') : ''
          // note: accepter.acc_note || (state.deal.accepter && state.deal.accepter.note) || '',     // ?
        },
        receiver: receiver && {
          name: gift ? (gift.receiver_name || '暫無') : '暫無',
          phone: gift ? (gift.receiver_phone || '暫無') : '暫無',
          address: gift ? (gift.receiver_address || '-') : '-',
          title: payload.need_donate && payload.need_donate.receiver_name || payload.gift_request && payload.gift_request.receiver_name,
          last5num: payload.need_donate && payload.need_donate.receiver_bank_account_number || payload.gift_request && payload.gift_request.receiver_bank_account_number,
          fee: payload.need_donate && payload.need_donate.receiver_remit_money || payload.gift_request && payload.gift_request.receiver_remit_money,
          bank: payload.need_donate && payload.need_donate.receiver_bank || payload.gift_request && payload.gift_request.receiver_bank,
          branch: payload.need_donate && payload.need_donate.receiver_bank_branch || payload.gift_request && payload.gift_request.receiver_bank_branch,
          account_number: (gift) ?
            (gift.receiver_bank_account_number || '') :
            (needDonate ? (needDonate.receiver_bank_account_number || '') : ''),
          account_name: (gift) ? (gift.receiver_bank_account_name || '') :
            (needDonate ? (needDonate.receiver_bank_account_name || '') : '')
          // note: receiver.rcv_note || (state.deal.receiver && state.deal.receiver.note) || '',
        },
        gift_request: payload.gift_request,
        user: {
          showName: payload.user && payload.user.name,
          name: payload.user && payload.user.name,
          isGOV: payload.direct_user.gov == 'Y',
          cat_hash: payload.direct_user.cat_hash,
          marks: payload.direct_user.marks || '',
          pic: payload.direct_user.pics,  // 不清楚是字符串还是数组
        },
      }
    },
    doTriggerUpload () {
      // console.log('CLICK:', document.querySelector('.input-uploader'))
      document.querySelector('.input-uploader').click()
    },
    uploadImage () {
      let files = document.querySelector('.input-uploader').files
      this.$vux.loading.show({
        text: '發送圖檔中...'
      })
      const type = 'chat'
      ThingAPI.uploadImg(files[0], type, (data) => {
        if (data === null) {
          this.$vux.loading.hide()
          document.querySelector('.input-uploader').value = ''
          this.$vux.toast.text('圖檔上傳失敗')
          return
        }
        const { isTrade } = this
        if (isTrade) {
          const { direct_user_id, gift_request_id, type, need_donate_id } = this.detail
          const bundle = {
            message_content: data.url,
            message_type: 'image',
            direct_user_id,
            gift_request_id,
            type,
            need_donate_id
          }
          MessageAPI.sendTradeMessage(bundle, (data) => {
            this.$vux.loading.hide()
            document.querySelector('.input-uploader').value = ''
            this.getDetail()
          })
        } else {
          const { id: direct_user_id } = this.$route.params
          const bundle = {
            message_content: data.url,
            message_type: 'image',
            direct_user_id
          }
          MessageAPI.sendUserMessage(bundle, (data) => {
            this.$vux.loading.hide()
            document.querySelector('.input-uploader').value = ''
            this.getDetail()
          })
        }
      })
    },
    // 送給他/收下他
    doSendItem () {
      if (this.detail.gift_request_id) {
        const { id, gift, request_quantity: max, shipway, shipfee, shipopts } = this.detail.item
        let params = {
          id,
          max,
          shipway,
          shipfee,
          pic: gift.image_path,
          name: gift.title,
          shipopts,
          directUserName: this.detail.direct_user.nickname,
          left: gift.left
        }
        params = (shipway === 'palmbox' && shipopts !== 'receiver') ? Object.assign({}, params, {
          recity: this.detail.item.receiver_city,
          readdress: this.detail.item.receiver_address,
          redistrict: this.detail.item.receiver_district,
          edcode: JSON.parse(this.detail.item.gift_ec_order.cabinet_info).EDCODE
        }) : params
        const str = queryString(params)
        this.$router.push(`/gift/send${str}`)
      } else {
        // console.log('ITEM:', this.detail.item)
        const { id, need_item: needItem, need, quantity, shipway, shipfee, shipopts } = this.detail.item
        let params = { id, quantity, shipway, shipfee, shipopts, pic: need.image_path, name: needItem.name }
        params = shipway === 'palmbox' ? Object.assign({}, params, {
          recity: this.getPalmBoxInfo.CITYNAME,
          redistrict: this.getPalmBoxInfo.DICTNAME,
          readdress: this.getPalmBoxInfo.TW_THROWADDRESS
        }) : params
        if (shipopts !== 'receiver' && shipway === 'palmbox') {
          const edcode = JSON.parse(this.detail.item.need_ec_order.cabinet_info).EDCODE
          params = Object.assign({}, params, {
            edcode,
          })
        }
        const str = encodeURI(queryString(params))
        this.$router.push(`/need/take${str}`)
      }
    },
    // 新竹物流确认汇款资讯
    doConfirmShip () {
      // console.log('ITEM:', this.detail.item)
      const { id, need_item: needItem, need, quantity, shipway, shipfee, shipopts } = this.detail.item
      const params = { id, quantity, shipway, shipfee, shipopts, pic: need.image_path, name: needItem.name, max: needItem.left }
      const str = queryString(params)
      this.$router.push(`/confirmShip${str}`)
    },
    initScrollToBottom () {
      const scrollToBottom = () => {
        let div = document.getElementById('console-chatroom')
        if (div) {
          const { scrollTop, offsetHeight, scrollHeight } = div
          const offset = scrollHeight - offsetHeight
          if (offset > 0) {
            div.scrollTo(0, offset)
          }
        }
      }

      setTimeout(scrollToBottom, 0)
    },
    toggleModal () {
      this.showModal = !this.showModal
    },
    toggleTransferModal () {
      this.showTransferModal = !this.showTransferModal
    },
    // 取消贈物
    doCancel () {
      const that = this
      const { need_donate_id: needDonateId, gift_request_id: giftRequestId } = this.detail
      this.$vux.confirm.show({
        content: '是否確定取消？',
        theme: 'android',
        confirmText: '決定了',
        cancelText: '再想想',
        onConfirm () {
          if (needDonateId) {
            NeedAPI.cancelNeedDonate(needDonateId, (data) => {
              that.getDetail()
            })
          } else if (giftRequestId) {
            GiftAPI.cancelGift(giftRequestId, (data) => {
              that.getDetail()
            })
          }
        }
      })
    },
    // 忽略此物
    doIgnore () {
      const that = this
      this.$vux.confirm.show({
        content: '是否確定忽略此項？',
        theme: 'android',
        confirmText: '決定了',
        cancelText: '再想想',
        onConfirm () {
          const { need_donate_id: needDonateId, gift_request_id: giftRequestId } = that.detail
          that.$vux.loading.show({
            text: '確認中'
          })
          if (needDonateId) {
            NeedAPI.ignoreNeedDonate(needDonateId, (data) => {
              that.$vux.loading.hide()
              that.getDetail()
            })
          } else if (giftRequestId) {
            GiftAPI.ignoreGift(giftRequestId, (data) => {
              that.$vux.loading.hide()
              that.getDetail()
            })
          }
        }
      })
    },
    // 從已忽略回復贈送流程 同 doSendItem
    // 確認送出
    doSent () {
      const {
        gift_request_id: giftRequestId,
        need_donate_id: needDonateId
      } = this.detail
      this.$vux.loading.show({
        text: '確認中'
      })
      if (giftRequestId) {
        GiftAPI.sentGift(giftRequestId, (data) => {
          this.$vux.loading.hide()
          this.$router.push('/confirmSent')
        })
      } else if (needDonateId) {
        NeedAPI.sentNeed(needDonateId, (data) => {
          this.$vux.loading.hide()
          this.$router.push('/confirmSent')
        })
      }
    },
    // 彈出確認轉帳對話框
    doTransfer () {
      const { others } = this.user
      let bankInfo = null
      if (others &&
          others.banks &&
          Array.isArray(others.banks) &&
          others.banks.length !== 0) {
        bankInfo = others.banks[0]
      }
      if (bankInfo) {
        this.transferInfo = {
          receiver_bank: bankInfo.banks,
          receiver_bank_account_name: bankInfo.title,
          receiver_bank_account_number: getLastChar(bankInfo.accounts, 5),
          receiver_bank_branch: bankInfo.branchs,
          receiver_remit_money: this.detail.item.shipfee
        }
        for (const bank of banklist) {
          if (bank.code === bankInfo.banks) {
            this.chooseBank = [`${bank.code} ${bank.name}`]
            break
          }
        }
      }
      this.toggleTransferModal()
    },
    // 確認轉帳
    doConfirmTransfer () {
      const { chooseBank } = this
      const { gift_request_id, need_donate_id } = this.detail
      const {
        receiver_bank_account_name,
        receiver_bank_branch,
        receiver_bank_account_number
      } = this.transferInfo
      if (chooseBank[0].indexOf('無') !== -1) {
        this.$vux.toast.text('請選擇匯款銀行')
        return
      }
      if (!receiver_bank_account_name || !receiver_bank_branch || !receiver_bank_account_number) {
        this.$vux.toast.text('請完善匯款資訊')
        return
      }
      this.transferInfo = {
        ...this.transferInfo,
        receiver_bank: chooseBank[0].split(' ')[0]
      }
      this.$vux.loading.show({
        text: '確認中...'
      })
      if (gift_request_id) {
        this.transferInfo.gift_request_id = gift_request_id
        GiftAPI.transferGift(this.transferInfo, (data) => {
          this.$vux.loading.hide()
          this.showTransferModal = false
          this.getDetail()
          const {from} = this.$route.query
          if (from === 'userInfo') {
            this.getMyDemands({
              status: 'remitting'
            })
          }
        })
      } else {
        this.transferInfo.need_donate_id = need_donate_id
        NeedAPI.transferNeed(this.transferInfo, (data) => {
          this.$vux.loading.hide()
          this.showTransferModal = false
          this.getDetail()
          const {from} = this.$route.query
          if (from === 'userInfo') {
            this.getMyDemands({
              status: 'remitting',
              type: 'present'
            })
          }
        })
      }
    },
    // 確認收款
    doReceiveMoney () {
      const { need_donate_id: needDonateId,
        gift_request_id: giftRequestId } = this.detail
      this.$vux.loading.show({
        text: '確認中...'
      })
      if (needDonateId) {
        let tmp = {}
        if (this.detail.need_donate.need_ec_order) {
          tmp = JSON.parse(this.detail.need_donate.need_ec_order.cabinet_info)
        }
        NeedAPI.receiveMoneyNeed(needDonateId, (data) => {
          this.$vux.loading.hide()
          this.getDetail()
        }, tmp.EDCODE)
      } else if (giftRequestId) {
        let tmp = {}
        if (this.detail.gift_request.gift_ec_order) {
          tmp = JSON.parse(this.detail.gift_request.gift_ec_order.cabinet_info)
        }
        GiftAPI.receiveMoneyGift(giftRequestId, (data) => {
          this.$vux.loading.hide()
          this.getDetail()
        }, tmp.EDCODE)
      }
    },
    // 確認收到
    doReceived () {
      const { need_donate_id: needDonateId,
        gift_request_id: giftRequestId } = this.detail
      this.$vux.loading.show({
        text: '確認中...'
      })
      if (needDonateId) {
        NeedAPI.finishNeed(needDonateId, (data) => {
          this.$vux.loading.hide()
          this.getDetail()
          this.doThanks()
        })
      } else if (giftRequestId) {
        GiftAPI.finishGift(giftRequestId, (data) => {
          this.$vux.loading.hide()
          this.getDetail()
          this.doThanks()
        })
      }
    },
    // 前往感谢页面
    doThanks () {
      const { id } = this.$route.params
      const { need_donate_id: needDonateId,
        gift_request_id: giftRequestId } = this.detail
      if (giftRequestId) {
        this.$router.push(`/thanksItem/${giftRequestId}?chatroom_id=${id}`)
      }
      if (needDonateId) {
        this.$router.push(`/thanksItem/${needDonateId}?chatroom_id=${id}&type=need`)
      }
    },
    toggleShow () {
      this.isEnlargeImage = !this.isEnlargeImage
      if (!this.isEnlargeImage) {
        this.enlargeImgSrc = ''
      }
    },
    doEnlargeImage (src) {
      this.isEnlargeImage = true
      this.enlargeImgSrc = src
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.userInfo
    }),
    getPalmBoxInfo () {
      const edcode = JSON.parse(this.detail.item.need_ec_order.cabinet_info).EDCODE
      return this.$store.getters.currentPalmBoxInfo(edcode)
    }
  },
  created () {
    const { type, from } = this.$route.query
    type === 'user' && (this.isTrade = false)
    from === 'env' && (this.from = 'env')
    this.getDetail()
    this.banklist = banklist.map((v) => {
      return {
        name: `${v.code} ${v.name}`,
        value: `${v.code} ${v.name}`
      }
    })
    this.timer = setInterval(() => {
      this.getDetail()
    }, 1000 * 15)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less">
  @import "./../../global.style.less";
  @height-steps: 72px;
  @height-functions: 104px;
  @height-gift: 44px;
  @height-row: 44px;
  .pad-chatroom-main {
    .weui-cell {
      padding: 0!important;
      .weui-cell__ft {
        display: none;
      }
    }
    .bank-picker{
      .weui-cell{
        .weui-cell__ft{
          display: inline-block;
          width: 27px;
          height: 8px;
          &:after{
            width: 13px;
            height: 8px;
            background: #fff url('./../../assets/icon/message/icon-arrow-down.png') right center no-repeat;
            background-size: 13px 8px;
            transform: none;
            border: none;
          }
        }
      }
    }
    .pad-chatroom {
      height: calc(~"100% - @{height-steps}");
      display: block;
      width: 100%;
      &.for-user {
        height: calc(~"100% - @{height-gift}");
        .console-chatroom {
          height: calc(~"100% - 44px");
        }
      }
      .console-chatroom {
        height: calc(~"100% - 104px");
        overflow-y: auto;
        width: 100%;
        display: block;
        overflow-scrolling: touch;
        -webkit-overflow-scrolling: touch;
        background-color: @color-CL;
        padding: 24px @pm-bg @pm-md;
      }
      .pad-functions {
        .functions {
          padding: @pm-md @pm-bg;
          display: flex;
          background-color: white;
          .item {
            flex: 1;
            list-style: none;
            & + .item {
              margin-left: @pm-md;
            }
            button {
              height: 34px;
              font-size: @font-S4;
            }
            .g-button:disabled {
              border: 1px solid #ebebeb;
              color: #aaa;
              background-color: transparent!important;
            }
          }
        }
        .pad-input-detail {
          height: 50px;
          display: block;
          border-top: 1px solid @color-CL;
          padding: @pm-sm 8px @pm-sm @pm-bg;
          background-color: white;
          .input-message {
            float: left;
            width: calc(~"100% - 85px");
            height: 100%;
            font-size: @font-S3;
            color: @color-font-C1;
            outline: none;
            border: none;
            box-shadow: none;
          }
          [class^='btn-'] {
            height: 40px;
            width: 40px;
            border: none;
            background-color: transparent;
            background-size: 100% 100%;
            outline: hidden;
          }
          .btn-choose-image {
            background-image: url("./../../assets/icon/message/icon-choose-image.png");
          }
          .btn-send-message {
            background-image: url("./../../assets/icon/message/icon-send-message.png");
          }
        }
      }
    }
    .x-row {
      position: relative;
      height: @height-row;
      width: 100%;
      display: block;
      border-bottom: 1px solid @color-CL;
      label, input, .degree, .content {
        font-size: @font-S3;
        height: @height-row;
        line-height: @height-row;
      }
      label {
        width: 100px;
        display: inline-block;
      }
      input, .content {
        float: right;
        text-align: right;
        top: -1px;
        position: relative;
        background-color: transparent;
        border: none;
        outline: none;
        width: calc(~"100% - 140px");
      }
      .degree {
        float: right;
        margin-left: @pm-md;
        img {
          opacity: .8;
          width: 15px;
        }
      }
      .vux-cell-value {
        color: @color-font-C1;
      }
    }
    .input-uploader {
      display: none;
    }
  }
  .chatroom-message-confirm{
    .vux-x-dialog{
      .weui-dialog{
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1000 !important;
        width: 100%;
        max-width: 100%;
        height: 100%;
        transform: none;
        border-radius: 0 !important;
        .weui-dialog__bd{
          height: 100%;
          background: @color-CBG;
          .weui-cells{
            margin-top: 0;
          }
          &:first-child{
            padding: 0;
          }
        }
      }
    }
    .vux-x-textarea{
      .weui-textarea, .weui-textarea-counter{
        font-size: @font-S3;
      }
      .weui-textarea-counter{
        margin-top: 5px;
      }
    }
    &.chatroom-message-input{
      position: relative;
      .weui-cell__ft{
        display: flex;
        align-items: center;
      }
      .weui-cell__hd{
        position: absolute;
        right: @pm-bg;
        top: 0;
      }
      .box{
        .weui-cells{
          &:before, &:after{
            display: none;
          }
          .vux-x-textarea{
            padding: 0;
            .weui-cell__bd{
              padding: @pm-md;
            }
          }
        }
      }
    }
  }
</style>
<style lang="less" scoped>
  .pad-chatroom-main{
    height: 100%;
    > .content{
      height: calc(~"100% - 44px");
      &.for-user-content{
        height: 100%;
      }
    }
    .chatroom-message-input{
      &.fade-enter-to, &.fade-leave-to{
        transition: opacity 0.3s;
      }
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
      }
      .mask{
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.5);
      }
      .box{
        width: 100%;
        height: calc(~"100% - 44px");
        background: @color-CBG;
        .box-panel{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          > .pics{
            margin-top: @pm-bg;
            padding: 0 @pm-bg @pm-bg;
          }
          .pad-stick-bottom {
            padding: @pm-bg;
            width: 100%;
            button {
              margin-top: @pm-bg;
            }
          }
        }
      }
    }
  }
</style>

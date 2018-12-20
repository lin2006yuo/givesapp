import Vue from 'vue'
import Router from 'vue-router'
import { local, KEY_USER_TOKEN } from '@/tools/storage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    /* 底部tab路由 */
    {
      path: '/',
      component: resolve => require(['@/container/Root'], resolve),
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: 'gifts',
          name: 'Gifts',
          component: resolve => require(['@/container/gift/Gifts'], resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'needs',
          name: 'Needs',
          component: resolve => require(['@/container/need/Needs'], resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'message',
          name: 'message',
          component: resolve => require(['@/container/message'], resolve),
          meta: {
            auth: true,
            keepAlive: true
          }
        },
        {
          path: '',
          name: 'home',
          component: resolve => require(['@/container/Home'], resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/userinfo',
          name: 'UserInfo',
          component: resolve => require(['@/container/UserInfo'], resolve),
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    /* 底部tab路由 */
    /* 讀故事 */
    {
      path: '/story',
      name: 'Story',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/container/story'], resolve)
    },
    {
      path: '/story/:id',
      name: 'StoryDeatil',
      meta: {
        title: '故事詳情'
      },
      component: resolve => require(['@/container/story/Detail'], resolve)
    },
    /* 讀故事 */
    /* 排行榜 */
    {
      path: '/bonusRanking',
      name: 'BonusRanking',
      component: resolve => require(['@/container/BonusRanking.vue'], resolve)
    },
    /* 排行榜 */
    /* 禮物 */
    {
      path: '/gift/:id(\\d+)',
      name: 'GiftDetail',
      component: resolve => require(['@/container/gift/GiftDetail'], resolve)
    },
    {
      path: '/gift/new',
      name: 'NewGift',
      component: resolve => require(['@/container/gift/NewGift'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/gift/edit/:id',
      name: 'EditGift',
      component: resolve => require(['@/container/gift/EditGift'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/gift/send',
      name: 'SendGift',
      component: resolve => require(['@/container/gift/SendGift'], resolve)
    },
    {
      path: '/request/:id',
      name: 'Request',
      component: resolve => require(['@/container/gift/Request.vue'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/requestSuc',
      name: 'RequestSuc',
      component: resolve =>
        require(['@/container/gift/RequestSuc.vue'], resolve)
    },
    /* 禮物 */
    /* 需求 */
    {
      path: '/need/new',
      name: 'NewNeed',
      meta: {
        auth: true
      },
      component: resolve => require(['@/container/need/NewNeed'], resolve)
    },
    {
      path: '/need/edit/:id',
      name: 'EditNeed',
      component: resolve => require(['@/container/need/EditNeed'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/need/:id(\\d+)',
      name: 'NeedDetail',
      component: resolve => require(['@/container/need/NeedDetail'], resolve)
    },
    {
      path: '/need/take',
      name: 'ReceiveDonate',
      component: resolve => require(['@/container/need/ReceiveDonate'], resolve)
    },
    {
      path: '/confirmShip',
      name: 'ConfirmShip',
      component: resolve => require(['@/container/need/ConfirmShip'], resolve)
    },
    {
      path: '/donate/:id',
      name: 'Donate',
      component: resolve => require(['@/container/need/Donate.vue'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/donateSuc',
      name: 'DonateSuc',
      component: resolve => require(['@/container/need/DonateSuc.vue'], resolve)
    },
    /* 需求 */
    /* 用戶主頁 */
    {
      path: '/user/:hash',
      // name: 'user',
      component: resolve => require(['@/container/user'], resolve),
      children: [
        {
          path: '',
          name: 'NotMe',
          meta: {
            title: {
              self: '我的用戶資料',
              other: 'TA的用戶資料'
            }
          },
          component: resolve => require(['@/container/user/User'], resolve)
        },
        {
          path: 'gifts',
          name: 'UserGifts',
          meta: {
            title: {
              self: '我的送禮物',
              other: 'TA的送禮物'
            }
            // keepAlive: true
          },
          component: resolve => require(['@/container/user/Gifts'], resolve)
        },
        {
          path: 'needs',
          name: 'UserNeeds',
          meta: {
            title: {
              self: '我的需求',
              other: 'TA的需求'
            }
          },
          component: resolve => require(['@/container/user/Needs'], resolve)
        },
        {
          path: 'thanksWord',
          name: 'UserThanks',
          meta: {
            title: {
              self: '我的感謝',
              other: 'TA的感謝'
            }
          },
          component: () => import('@/container/user/ThanksWord')
        },
        {
          path: 'deals',
          name: 'Deals',
          meta: {
            title: {
              self: '我索取過的物品',
              other: 'TA索取過的物品'
            }
          },
          component: resolve => require(['@/container/user/ReqGifts'], resolve)
        },
        {
          path: 'wish',
          name: 'userWish',
          meta: {
            title: {
              self: '心願認養',
              other: 'Ta的心願認養'
            }
          },
          component: resolve =>
            require(['@/container/wishes/UserWish'], resolve)
        },
        {
          path: 'traces',
          name: 'UserTraces',
          meta: {
            title: {
              self: '我的追蹤'
            }
          },
          component: resolve => require(['@/container/user/Traces'], resolve)
        },
        {
          path: 'subscribe',
          name: 'Subscribe',
          meta: {
            title: {
              self: '我的關鍵字訂閱'
            },
            auth: true
          },
          component: resolve => require(['@/container/user/Subscribe'], resolve)
        },
        {
          path: 'privateNote',
          name: 'PrivateNote',
          meta: {
            title: {
              self: '我的好壞名單'
            },
            auth: true
          },
          component: resolve =>
            require(['@/container/user/privateNote'], resolve)
        },
        {
          path: 'love',
          name: 'Love',
          meta: {
            title: {
              self: '我寄送的愛箱'
            },
            auth: true
          },
          component: resolve => require(['@/container/user/Love'], resolve)
        },
        {
          path: 'shop',
          name: 'Shop',
          meta: {
            title: {
              self: '我索取的愛箱'
            },
            auth: true
          },
          component: resolve => require(['@/container/user/Shop'], resolve)
        },
        {
          path: 'deals',
          name: 'deals',
          meta: {
            isShowPrefix: true,
            title: '索取過的物品'
          },
          component: resolve => require(['@/container/user/ReqGifts'], resolve)
        },
        {
          path: 'fans',
          name: 'Fans',
          meta: {
            title: {
              self: ''
            }
          },
          component: resolve => require(['@/container/user/Fans'], resolve)
        },
        {
          path: 'traces',
          name: 'Traces',
          meta: {
            title: {
              self: '追蹤詳情'
            }
          },
          component: resolve => require(['@/container/user/Traces'], resolve)
        },
        {
          path: 'setting',
          name: 'Setting',
          meta: {
            title: {
              self: '設置'
            },
            auth: true
          },
          component: resolve => require(['@/container/user/Setting'], resolve)
        },
        {
          path: 'editBaseInfo',
          name: 'EditBaseInfo',
          meta: {
            title: {
              self: '基本資料'
            },
            auth: true
          },
          component: resolve =>
            require(['@/container/user/EditBaseInfo'], resolve)
        },
        {
          path: 'change',
          name: 'Change',
          meta: {
            title: {
              self: '變更會員身份'
            },
            auth: true
          },
          component: resolve =>
            require(['@/container/user/ChangeIdentity'], resolve)
        },
        {
          path: 'editRemit',
          name: 'EditRemit',
          meta: {
            title: {
              self: '匯款及寄送資訊'
            },
            auth: true
          },
          component: resolve => require(['@/container/user/EditRemit'], resolve)
        },
        {
          path: 'editAdr',
          name: 'EditAdr',
          meta: {
            title: {
              self: '聯絡地址'
            },
            auth: true
          },
          component: resolve => require(['@/container/user/EditAdr'], resolve)
        },
        {
          path: 'infos',
          name: 'Infos',
          meta: {
            title: {
              self: '個人介紹',
              other: '個人介紹'
            }
          },
          component: resolve => require(['@/container/user/Infos'], resolve)
        }
      ]
    },
    {
      path: '/resetpw',
      meta: {
        title: '忘記密碼'
      },
      component: resolve => require(['@/container/user/ResetPw'], resolve)
    },
    {
      path: '/verifycellphone',
      meta: {
        title: '手機驗證',
        auth: true
      },
      component: resolve =>
        require(['@/container/user/VerifyCellPhone'], resolve)
    },
    {
      path: '/confirm/:hash/code/:code',
      redirect: to => {
        const { params } = to
        return {
          path: '/verifyemail',
          query: {
            hash: params.hash,
            code: params.code
          }
        }
      }
    },
    {
      path: '/verifyemail',
      meta: {
        title: '郵箱驗證',
        auth: true
      },
      component: resolve => require(['@/container/user/VerifyEmail'], resolve)
    },
    {
      path: '/verifyname',
      meta: {
        title: '實名驗證',
        auth: true
      },
      component: resolve => require(['@/container/user/VerifyId'], resolve)
    },
    {
      path: '/verifylovebox',
      meta: {
        title: '愛箱送驗證',
        auth: true
      },
      component: resolve => require(['@/container/user/VerifyLoveBox'], resolve)
    },
    {
      path: '/chpw',
      name: 'Chpw',
      meta: {
        title: '修改密碼',
        auth: true
      },
      component: resolve => require(['@/container/user/ChangePw'], resolve)
    },
    {
      path: '/newconnect',
      name: 'NewConnect',
      meta: {
        title: '交接預告',
        auth: true
      },
      component: resolve => require(['@/container/user/NewConnect'], resolve)
    },
    /* 用戶主頁 */
    /* 感謝 */
    {
      path: '/thanks',
      name: 'Thanks',
      component: resolve => require(['@/container/ThanksWall'], resolve)
    },
    /* 登錄 */
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/container/enter/Login'], resolve)
    },
    /* 註冊 */
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/container/enter/Register'], resolve)
    },
    {
      path: '/register/phone',
      name: 'RegisterPhone',
      component: resolve =>
        require(['@/container/enter/RegisterPhoneDetail'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/registerSuccess',
      name: 'RegisterSuccess',
      component: resolve =>
        require(['@/container/enter/RegisterSuccess'], resolve)
    },
    /* 互動卡 */
    {
      path: '/chatroom/:id',
      name: 'chatroom',
      component: resolve => require(['@/container/message/Chatroom'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/service-protocol',
      name: 'ServiceProtocol',
      component: resolve =>
        require(['@/container/info/ServiceProtocol'], resolve)
    },
    {
      path: '/about543new',
      name: 'About543New',
      meta: {
        title: '關於我們'
      },
      component: resolve => require(['@/container/info/About543New'], resolve)
    },
    {
      path: '/about543',
      name: 'About543',
      meta: {
        title: '關於我們'
      },
      component: resolve => require(['@/container/info/About543'], resolve)
    },
    {
      path: '/useIntro',
      name: 'UseIntro',
      component: resolve => require(['@/container/info/UseIntro'], resolve)
    },
    {
      path: '/guide',
      name: 'Guide',
      component: resolve => require(['@/container/info/Guide'], resolve)
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: resolve => require(['@/container/info/Privacy'], resolve)
    },
    {
      path: '/search',
      name: 'Search',
      component: resolve => require(['@/container/Search.vue'], resolve)
    },
    {
      path: '/taipei/about',
      name: 'TaiPeiAbout',
      component: resolve =>
        require(['@/container/info/AboutTaiPei.vue'], resolve)
    },
    {
      path: '/donatefood',
      name: 'DonateFood',
      component: resolve =>
        require(['@/container/info/DonateFood.vue'], resolve)
    },
    /* 会员变更页面 */
    {
      path: '/firmIdentity/:hash',
      name: 'FirmIdentity',
      meta: {
        title: '企業行號',
        auth: true
      },
      component: resolve =>
        require(['@/container/user/FirmIdentity.vue'], resolve)
    },
    {
      path: '/officeIdentity/:hash',
      name: 'OfficeIdentity',
      meta: {
        title: '政府機關',
        auth: true
      },
      component: resolve =>
        require(['@/container/user/OfficeIdentity.vue'], resolve)
    },
    {
      path: '/schoolIdentity/:hash',
      name: 'SchoolIdentity',
      meta: {
        title: '學校單位',
        auth: true
      },
      component: resolve =>
        require(['@/container/user/SchoolIdentity.vue'], resolve)
    },
    {
      path: '/loveMemIdentity/:hash',
      name: 'LoveMemIdentity',
      meta: {
        title: '關懷會員',
        auth: true
      },
      component: resolve =>
        require(['@/container/user/LoveMemIdentity.vue'], resolve)
    },
    {
      path: '/benefitIdentity/:hash',
      name: 'BenefitIdentity',
      meta: {
        title: '公益團體',
        auth: true
      },
      component: resolve =>
        require(['@/container/user/BenefitIdentity.vue'], resolve)
    },
    /* 確認收到提示頁面 */
    {
      path: '/confirmSent',
      name: 'ConfirmSent',
      component: resolve =>
        require(['@/container/message/ItemSent.vue'], resolve)
    },
    /* 感謝頁面 */
    {
      path: '/thanksItem/:id',
      name: 'ThanksItem',
      component: resolve =>
        require(['@/container/message/ThanksItem.vue'], resolve)
    },
    /* 愛箱送 */
    {
      path: '/lovebox',
      name: 'Lovebox',
      component: resolve => require(['@/container/lovebox'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/lovebox/:id',
      name: 'LoveboxDetail',
      component: resolve => require(['@/container/lovebox/Detail.vue'], resolve)
    },
    {
      path: '/shopCart',
      name: 'ShopCart',
      component: resolve =>
        require(['@/container/lovebox/ShopCart.vue'], resolve)
    },
    {
      path: '/bookSuc',
      name: 'BookSuc',
      component: resolve =>
        require(['@/container/lovebox/BookSuc.vue'], resolve)
    },
    {
      path: '/aboutLovebox',
      name: 'AboutLovebox',
      component: resolve => require(['@/container/lovebox/About.vue'], resolve)
    },
    {
      path: '/contactLovebox',
      name: 'ContactLovebox',
      component: resolve =>
        require(['@/container/lovebox/Contact.vue'], resolve)
    },
    {
      path: '/loveboxThanks/:id',
      name: 'LoveboxThanks',
      component: resolve => require(['@/container/lovebox/thanks.vue'], resolve)
    },
    {
      path: '/activitynotice',
      name: 'ActivityNotice',
      component: resolve => require(['@/container/ActivityNotice'], resolve)
    },
    /* 索取赠送交易管理页面 */
    {
      path: '/dealsReq',
      name: 'ReqAll',
      component: resolve => require(['@/container/deals/request'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    // {
    //   path: '/dealsReq/:status',
    //   name: 'ReqStatus',
    //   component: resolve => require(['@/container/deals/request/status.vue'], resolve),
    //   meta: {
    //     auth: true,
    //     // keepAlive: true
    //   }
    // },
    {
      path: '/dealsReq/requesting',
      name: 'ReqRequesting',
      component: resolve =>
        require(['@/container/deals/request/Requesting.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsReq/remitting',
      name: 'ReqRemitting',
      component: resolve =>
        require(['@/container/deals/request/Remitting.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsReq/remitted',
      name: 'ReqRemitted',
      component: resolve =>
        require(['@/container/deals/request/Remitted.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsReq/sent',
      name: 'ReqSent',
      component: resolve =>
        require(['@/container/deals/request/Sent.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsReq/finished',
      name: 'ReqFinished',
      component: resolve =>
        require(['@/container/deals/request/Finished.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsDonate',
      name: 'DonateAll',
      component: resolve => require(['@/container/deals/donate'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    // {
    //   path: '/dealsDonate/:status',
    //   name: 'donateStatus',
    //   component: resolve => require(['@/container/deals/donate/status.vue'], resolve),
    //   meta: {
    //     auth: true
    //   }
    // },
    {
      path: '/dealsDonate/init',
      name: 'DonateInit',
      component: resolve =>
        require(['@/container/deals/donate/Init.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsDonate/remitted',
      name: 'DonateRemitted',
      component: resolve =>
        require(['@/container/deals/donate/Remitted.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsDonate/remitting',
      name: 'DonateRemitting',
      component: resolve =>
        require(['@/container/deals/donate/Remitting.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: '/dealsDonate/sent',
      name: 'DonateSent',
      component: resolve =>
        require(['@/container/deals/donate/Sent.vue'], resolve),
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    /* 索取赠送交易管理页面 */
    /* 台北社會局 */
    {
      path: '/city/taipei',
      name: 'CityTaipei',
      component: resolve => require(['@/container/taipei'], resolve)
    },
    {
      path: '/city/taipei/about',
      name: 'CityTaipeiAbout',
      component: resolve => require(['@/container/taipei/About'], resolve)
    },
    {
      path: '/city/taipei/commonweal',
      name: 'CityTaipeiCommonweal',
      component: resolve => require(['@/container/taipei/Commonweal'], resolve)
    },
    /* 常見問題 */
    {
      path: '/faq',
      name: 'Faq',
      component: resolve => require(['@/container/answer/Faq'], resolve)
    },
    {
      path: '/faq/becomeMember',
      name: 'BecomeMember',
      component: resolve =>
        require(['@/container/answer/BecomeMember'], resolve)
    },
    {
      path: '/faq/uploadGift',
      name: 'UploadGift',
      component: resolve => require(['@/container/answer/UploadGift'], resolve)
    },
    {
      path: '/faq/sendGift',
      name: 'FaqSendGift',
      component: resolve => require(['@/container/answer/SendGift'], resolve)
    },
    {
      path: '/faq/successRecevieGift',
      name: 'SuccessRecevieGift',
      component: resolve =>
        require(['@/container/answer/SuccessRecevieGift'], resolve)
    },
    {
      path: '/faq/demandGift',
      name: 'DemandGift',
      component: resolve => require(['@/container/answer/DemandGift'], resolve)
    },
    {
      path: '/faq/requestRequirement',
      name: 'RequestRequirement',
      component: resolve =>
        require(['@/container/answer/RequestRequirement'], resolve)
    },
    {
      path: '/faq/requirementSend',
      name: 'RequirementSend',
      component: resolve =>
        require(['@/container/answer/RequirementSend'], resolve)
    },
    {
      path: '/faq/memberExchange',
      name: 'MemberExchange',
      component: resolve =>
        require(['@/container/answer/MemberExchange'], resolve)
    },
    {
      path: '/faq/managerGiftRequirement',
      name: 'ManagerGiftRequirement',
      component: resolve =>
        require(['@/container/answer/ManagerGiftRequirement'], resolve)
    },
    /* 用戶反饋 */
    {
      path: '/feedback',
      name: 'Feedback',
      component: resolve => require(['@/container/user/Feedback'], resolve)
    },
    {
      path: '/nearbyPalmBox',
      name: 'nearbyPalmBox',
      meta: {
        title: '查看櫃機'
      },
      component: resolve => require(['@/container/palmbox/Nearby.vue'], resolve)
    },
    {
      path: '/palmboxusage',
      name: 'PalmBoxUsage',
      meta: {
        title: '如何使用掌櫃'
      },
      component: resolve => require(['@/components/PalmboxUsage.vue'], resolve)
    },
    {
      path: '/fathersDay/:id(\\d+)?',
      name: 'FathersDay',
      component: resolve => require(['@/container/FathersDay'], resolve)
    },
    // {
    //   path: '/fathersDay/release',
    //   name: 'Release',
    //   component: resolve => require(['@/container/fathersDay/Release'], resolve),
    //   meta: {
    //     auth: true
    //   }
    // },
    // {
    //   path: '/fathersDay/rewards',
    //   name: 'Rewards',
    //   component: resolve => require(['@/container/fathersDay/Rewards'], resolve)
    // },
    {
      path: '/sportsday/:id(\\d+)?',
      name: 'SportsDay',
      component: resolve => require(['@/container/SportsDay'], resolve)
    },
    {
      path: '/sportsday/release',
      name: 'Release',
      component: resolve =>
        require(['@/container/fathersDay/Release'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/sportsday/rewards',
      name: 'Rewards',
      component: resolve => require(['@/container/fathersDay/Rewards'], resolve)
    },
    {
      path: '/cabinetGift',
      name: 'CabinetGift',
      component: resolve => require(['@/container/cabinetGift/Index'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/wishes',
      name: 'Wishes',
      component: resolve => require(['@/container/wishes/Wishes'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/wish/:id(\\d+)?',
      name: 'Wish',
      component: resolve => require(['@/container/wishes/Details'], resolve)
    },
    {
      path: '/wish/confirm/:id(\\d+)?',
      name: 'WishConfirm',
      component: resolve => require(['@/container/wishes/Confirm'], resolve)
    },
    {
      path: '/wish/finish/:id(\\d+)?',
      name: 'WishFinish',
      component: resolve => require(['@/container/wishes/Finish'], resolve)
    },
    {
      path: '/wish/explain',
      name: 'WishExplain',
      component: resolve => require(['@/container/wishes/Explain'], resolve)
    },
    {
      path: '/wish/after/:id(\\d+)',
      name: 'wishAfter',
      component: resolve => require(['@/container/wishes/After'], resolve)
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: resolve => require(['@/container/Unauthorized'], resolve),
      meta: {
        title: '401 未授權'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.matched.some(t => t.meta.keepAlive)) {
      if (savedPosition === null) {
        to.meta.saved_position = null
      } else {
        savedPosition = to.meta.saved_position
      }
      const back = savedPosition || { x: 0, y: 0 }
      return back
    }
  }
})

router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {
    from.meta.saved_position = {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }
  let token = local.get(KEY_USER_TOKEN)
  if (to.matched.some(record => record.meta.auth)) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
        replace: true
      })
    }
  } else {
    next()
  }
})

// main.js 里，如果你使用了 vue-router
// router.afterEach((to) => {
//   if (window.ga) {
//     console.log('window.ga is avaible')
//     window.ga('set', 'page', to.fullPath) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
//     window.ga('send', 'pageview')
//   }
// })

export default router

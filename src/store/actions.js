/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS, RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SERACH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqLogout,
  reqShops,
  reqUserInfo,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo, reqSearchShop,
} from '../api'

export default {
//异步获取
  async getAddress ({commit,state}) {
    //发送异步Ajax请求
    const geohash =state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //提交mutation
    if(result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getCategorys ({commit}) {
    //发送异步Ajax请求
    const result = await reqFoodCategorys()
    //提交mutation
    if(result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShops ({commit,state}) {
    //发送异步Ajax请求
    const {latitude,longitude} = state
    const result = await reqShops({latitude,longitude})
    //提交mutation
    if(result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },

  //异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  //异步退出
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }

  },

  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  async getShopGoods ({commit},callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      //数据更新，通知组件
      callback && callback()
    }
  },
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      callback && callback()
    }
  },
  async searchShops ({commit, state}, keyword){
   const geohash =state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SERACH_SHOPS, {searchShops})
    }
  },
  //同步记录用户信息
  recordUser ({commit},userInfo) {
    commit(RECEIVE_USER_INFO,{userInfo})
  },

  //同步更新food数量
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}

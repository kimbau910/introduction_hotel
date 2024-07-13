import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  paymentMethod: '',
  itemsPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  isSucessOrder: false,
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderDetail: (state, action) => {
      const {orderItem} = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.detail === orderItem.detail)
      console.log({state,action})
      if(itemOrder){
        if(itemOrder.amount <= itemOrder.countInstock) {
          itemOrder.amount += orderItem?.amount
          state.isSucessOrder = true
          state.isErrorOrder = false
        }
      }else {
        state.orderItems.push(orderItem)
      }
    },
    resetOrder: (state) => {
      state.isSucessOrder = false
    },
    increaseAmount: (state, action) => {
      const {idDetail} = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.detail === idDetail)
      const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.detail === idDetail)
      itemOrder.amount++;
      if(itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const {idDetail} = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.detail=== idDetail)
      const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.detail === idDetail)
      itemOrder.amount--;
      if(itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderDetail: (state, action) => {
      const {idDetail} = action.payload
      
      const itemOrder = state?.orderItems?.filter((item) => item?.detail !== idDetail)
      const itemOrderSeleted = state?.orderItemsSlected?.filter((item) => item?.detail !== idDetail)

      state.orderItems = itemOrder;
      state.orderItemsSlected = itemOrderSeleted;
    },
    removeAllOrderDetail: (state, action) => {
      const {listChecked} = action.payload
      
      const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.detail))
      const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.detail))
      state.orderItems = itemOrders
      state.orderItemsSlected = itemOrdersSelected

    },
    selectedOrder: (state, action) => {
      const {listChecked} = action.payload
      const orderSelected = []
      state.orderItems.forEach((order) => {
        if(listChecked.includes(order.detail)){
          orderSelected.push(order)
        };
      });
      state.orderItemsSlected = orderSelected
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrderDetail,increaseAmount,decreaseAmount,removeOrderDetail,removeAllOrderDetail, selectedOrder,resetOrder } = orderSlide.actions

export default orderSlide.reducer

// promise形式的getSetting
export const getSetting=function(){
    return new Promise((resolve,reject)=>{
        wx.getSetting({
          success:(res)=>{
              resolve(res)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

export const chooseAddress=function(){
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
          success:(res)=>{
              resolve(res)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

export const openSetting=function(){
    return new Promise((resolve,reject)=>{
        wx.openSetting({
          success:(res1)=>{
             resolve(res1)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

export const login=function(){
    return new Promise((resolve,reject)=>{
        wx.login({
            success (res) {
              if (res.code) {
                resolve(res)
              } else {
                reject('获取code失败')
              }
            }
          })
    })
}

export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
   wx.requestPayment({
      ...pay,
     success: (result) => {
      resolve(result)
     },
     fail: (err) => {
       wx.showToast({
         title: '还未开通',
         icon:'none'
       })
     }
   });
     
  })
}
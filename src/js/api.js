export const getUserInfo = id => {
  return {
    uid: id,
    name: "hello huiquan"
  }
}

export const ajaxAsync = url => {
  return Promise.resolve({ url })
}

const Api = {
  getUserInfo,
  ajaxAsync
}

export default Api
export const handleLoginAfterPageName = (res) => {
    return {
      type: 'handleLoginAfterPageName',
      payload:res
    }
  }

export const handleNonPersonalizedOnly=(res)=>{
  return{
    type: 'handleNonPersonalizedOnly',
    payload:res
  }
}
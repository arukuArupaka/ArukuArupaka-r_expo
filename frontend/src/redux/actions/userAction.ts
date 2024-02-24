export const handleLoginAction = (res) => {
    return {
      type: 'handleLoginAction',
      payload:res
    }
  }

export const handleLoginNotVerificationEmail = (res) => {
  return {
    type: 'handleLoginNotVerificationEmail',
    payload:res
  }
}

export const setUserUUIDAction=(res)=>{
  return{
    type:'setUserUUIDAction',
    payload:res
  }
}

export const setUserObject=(res)=>{
  return{
    type:'setUserObject',
    payload:res
  }
}
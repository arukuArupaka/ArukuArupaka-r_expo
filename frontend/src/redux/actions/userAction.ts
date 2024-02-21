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
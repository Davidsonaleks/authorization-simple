export const loginValidator = (login: string): boolean => {
  const reg_exp = /^[A-Za-z\d]{4,64}$/
  return reg_exp.test(login)
}

export const passwordValidator = (password: string): boolean => {
  const reg_exp = /^[A-Za-z\d\_\#]{8,128}$/
  return reg_exp.test(password)
}

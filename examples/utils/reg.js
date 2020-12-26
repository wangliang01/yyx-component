/**
 * 项目中的正则表达式
 */

// 电话验证
export const PHONE_REG = /^1[3456789]\d{9}$/

export const DOUBLE_REG = /^\d+(\.\d{1,2})?$/

export const TRIPLE_REG = /^\d+(\.\d{1,3})?$/

export const QUARTER_REG = /^\d+(\.\d{1,4})?$/

export const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/

export const SPACE_REG = /^[ ]*$/

export const POSITIVE_REG = /(^[1-9]\d*$)/

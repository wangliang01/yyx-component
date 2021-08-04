export function warn(msg) {
  console.log(`[warn]: %c%s`, 'color: orange', msg)
}

export function info(msg) {
  console.log(`[info]: %c%s`, 'color: green', msg)
}

export function error(msg) {
  console.log(`[error]: %c%s`, 'color: red', msg)
}

export default {
  warn,
  info,
  error
}

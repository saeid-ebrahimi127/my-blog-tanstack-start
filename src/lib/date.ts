export const toPersianDateTime = (d: number | Date, omitTime = false) => {
  const dateInstance = new Date(d)

  const date = dateInstance.toLocaleDateString('fa-IR')

  return omitTime
    ? date
    : `${date} ، ${dateInstance.toLocaleTimeString('fa-IR')}`
}

export const paginationLimitQuery = (pageNumber = 1, pageSize = 10) => {
  const pageOffset = (pageNumber - 1) * pageSize
  return ` limit ${pageSize} offset ${pageOffset} `
}

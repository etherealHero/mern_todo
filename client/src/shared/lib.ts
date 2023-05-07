export const copyObject = (obj: any) => {
  const json = JSON.stringify(obj)
  return JSON.parse(json)
}

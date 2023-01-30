export function useDate(data: string) {
  const date = new Date(data)
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: 'full'
  })
  return f.format(date)
}
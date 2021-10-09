export function translateData(data) {
  const dataArr = [];
  for (const key in data) {
    dataArr.push(data[key]);
  }
  return dataArr;
}

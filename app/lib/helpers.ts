export function includes(array: string[], value: string) {
  array.forEach((item, index) => {
    array[index] = item.toLowerCase();
  });
  return array.includes(value);
}

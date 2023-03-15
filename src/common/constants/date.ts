// yyyy, mm, dd
export function string2Date(dateStr: string): Date {
  const dateArr = dateStr.split('/');
  return new Date(
    Number(dateArr[2]),
    Number(dateArr[1]) + 1,
    Number(dateArr[0]),
  );
}

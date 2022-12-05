export function formatDecimalNumber(value) {
  return value.toLocaleString("en-US", { style: "decimal" });
}

export function formatDateString(value) {
  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
}

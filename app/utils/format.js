export function formatNumber(value) {
  return value.toLocaleString("en-US", { style: "decimal" });
}

export function formatDate(value) {
  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
}

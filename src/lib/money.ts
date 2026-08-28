export function formatMoney(amountInKobo: number, currency = "NGN"): string {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(
    amountInKobo / 100,
  );
}

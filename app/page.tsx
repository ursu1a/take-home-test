import { BuyingFunnel } from "@/components/features/funnel/BuyingFunnel";

export default async function Home() {
  const maxCount = Number(process.env.MAX_PURCHASE_AMOUNT) ?? 0;
  const itemPrice = Number(process.env.ITEM_PRICE_AMOUNT) ?? 0;

  return (
    <section>
      <div className="flex flex-col justify-center">
        <BuyingFunnel itemPrice={itemPrice} maxCount={maxCount} />
      </div>
    </section>
  );
}

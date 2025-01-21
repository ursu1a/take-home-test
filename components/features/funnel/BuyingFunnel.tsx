"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { SharedSelection } from "@nextui-org/system";
import { Spinner } from "@nextui-org/spinner";

import { subtitle, title } from "@/components/shared/primitives";
import { siteConfig as strings } from "@/config/site";
import { useBuyingFunnel } from "@/hooks/useBuyingFunnel";

export type BuyingFunnelProps = {
  maxCount: number;
  itemPrice: number;
};

export const BuyingFunnel = ({ maxCount, itemPrice }: BuyingFunnelProps) => {
  const { messages } = strings.buyingFunnel;
  const {
    items,
    status,
    getItemLabel,
    saveDiamonds,
    getDiamonds,
    clearDiamonds,
  } = useBuyingFunnel(maxCount, itemPrice);

  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedValue = async () => {
      const value = await getDiamonds();

      setSelected(value ? String(value) : null);
    };

    fetchSavedValue();
  }, []);

  const handleSelectionChange = (keys: SharedSelection) => {
    const selectedValue = Array.from(keys)[0];

    setSelected(selectedValue?.toString() || null);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const value = Number(selected);

      if (value < 0 || value > maxCount) {
        throw new Error(`${messages.diamonds_range_error} ${maxCount}`);
      }
      const success = await saveDiamonds(value);

      if (success) {
        alert(messages.diamonds_save_success);
      }
    } catch (error) {
      alert(messages.diamonds_save_error + ": " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearDiamonds = async () => {
    setLoading(true);
    try {
      await clearDiamonds();
      setSelected(null);
      alert(messages.diamonds_clear_success);
    } catch (error) {
      alert(messages.diamonds_clear_error + ": " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <div className="flex flex-col gap-y-3 w-full lg:max-w-2xl mx-auto py-6 px-4 lg:px-6 shadow-2xl rounded-lg dark:bg-default-100 text-center">
        <p className={title({ className: "font-bold" })}>
          {strings.buyingFunnel.title}
        </p>
        {status === "loading" ? (
          <Spinner className="mx-auto my-8" />
        ) : status !== "authenticated" ? (
          <p className={subtitle({ className: "text-danger font-light" })}>
            {messages.authorization_required}
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2 pb-3">
              <p className={subtitle({ className: "font-semibold" })}>
                {strings.buyingFunnel.your_diamonds}:
                <span className="text-primary ps-2 lg:ps-5">
                  {selected ?? "0"}
                </span>
              </p>
              <Button
                className="h-8"
                color="danger"
                isLoading={loading}
                radius="sm"
                onPress={handleClearDiamonds}
              >
                {strings.buyingFunnel.clear_diamonds}
              </Button>
            </div>
            <Select
              isDisabled={!items.length}
              label={`${strings.buyingFunnel.select_amount}:`}
              labelPlacement="outside"
              placeholder={
                items.length ? messages.please_choose_amount : "Loading..."
              }
              radius="sm"
              selectedKeys={new Set([selected || ""])}
              variant="bordered"
              onSelectionChange={handleSelectionChange}
            >
              {items.map((item) => (
                <SelectItem key={item}>{getItemLabel(item)}</SelectItem>
              ))}
            </Select>
            <Button
              className="font-bold"
              color="primary"
              isDisabled={!selected}
              isLoading={loading}
              radius="sm"
              onPress={handleSaveClick}
            >
              {strings.buyingFunnel.purchase_diamonds}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

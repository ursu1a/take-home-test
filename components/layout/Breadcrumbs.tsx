"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const PageBreadcrumbs = ({ items }: PageBreadcrumbProps) => {
  return (
    <Breadcrumbs>
      {items.map((item, index) => (
        <BreadcrumbItem href={item.href}>{item.label}</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

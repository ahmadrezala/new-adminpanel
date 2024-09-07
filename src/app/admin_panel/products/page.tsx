"use client";
import React, { useMemo, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ContentSection } from "@/app/_components/content-section";
import { HeaderSection } from "@/app/_components/header_section";
import { Textbox } from "@/app/_components/textbox";
import NetworkError from "@/app/_components/networkerror/network-error";
import ProductList from "./_components/product-list";
import { useProducts } from "./_api/get-products";

const Products: React.FC = () => {
  const searchParams = useSearchParams();
  const page = useMemo(
    () => parseInt(searchParams.get("page") as string) || 1,
    [searchParams]
  );

  const [searchValue, setSearchValue] = useState("");
  const {
    data: products,
    isFetching,
    error,
    refetch,
  } = useProducts({ page, search: searchValue, count: 5 });

  const currentPage = products?.data.current_page || 1;
  const totalPages = products?.data.total_pages || 1;
  const productsList = products?.data.products || [];

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (value.length >= 2) {
        timeoutRef.current = setTimeout(() => {
          setSearchValue(value);
        }, 400);
      } else {
        setSearchValue("");
      }
    },
    []
  );

  const renderSearchInput = useCallback(
    () => (
      <Textbox
        variant="ghost"
        placeholder="جست و جو..."
        onChange={handleSearchChange}
      />
    ),
    [handleSearchChange]
  );

  if (error) {
    return <NetworkError onRetry={() => refetch()} />;
  }

  return (
    <section className="flex items-center flex-col">
      <HeaderSection title="لیست محصولات" />
      <ContentSection
        linkPath="./products/create"
        linkText="ایجاد محصول"
        dataList={productsList}
        currentPage={currentPage}
        totalPages={totalPages}
        renderList={(products) => (
          <ProductList isLoading={isFetching} products={products} />
        )}
        renderSearchInput={renderSearchInput}
      />
    </section>
  );
};

const Suspendedproducts: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Products />
  </Suspense>
);

export default Suspendedproducts;

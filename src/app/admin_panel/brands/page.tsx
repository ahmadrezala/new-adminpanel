"use client";
import React, { useMemo, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBrands } from "./_api/get-brands";
import BrandList from "./_components/brand-list";
import { ContentSection } from "@/app/_components/content-section";
import { HeaderSection } from "@/app/_components/header_section";
import { Textbox } from "@/app/_components/textbox";
import NetworkError from "@/app/_components/networkerror/network-error";

const Brands: React.FC = () => {
  const searchParams = useSearchParams();
  const page = useMemo(
    () => parseInt(searchParams.get("page") as string) || 1,
    [searchParams]
  );

  const [searchValue, setSearchValue] = useState("");
  const {
    data: brands,
    isFetching,
    error,
    refetch,
  } = useBrands({ page, search: searchValue });

  const currentPage = brands?.data.current_page || 1;
  const totalPages = brands?.data.total_pages || 1;
  const brandsList = brands?.data.brands || [];

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
    () => <Textbox placeholder="جست و جو..." onChange={handleSearchChange} />,
    [handleSearchChange]
  );

  if (error) {
    return <NetworkError onRetry={() => refetch()} />;
  }

  return (
    <section className="flex items-center flex-col">
      <HeaderSection title="لیست برندها" />
      <ContentSection
        linkPath="./brands/create"
        linkText="ایجاد برند"
        dataList={brandsList}
        currentPage={currentPage}
        totalPages={totalPages}
        renderList={(brands) => (
          <BrandList isLoading={isFetching} brands={brands} />
        )}
        renderSearchInput={renderSearchInput}
      />
    </section>
  );
};

const SuspendedBrands: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Brands />
  </Suspense>
);

export default SuspendedBrands;

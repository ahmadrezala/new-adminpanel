"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useBrands } from "./_api/get-brands";
import BrandList from "./_components/brand-list";
import { ContentSection } from "@/app/_components/content-section";
import { HeaderSection } from "@/app/_components/header_section";


const Brands: React.FC = () => {
  const searchParams = useSearchParams();
  const page = useMemo(
    () => parseInt(searchParams.get("page") as string) || 1,
    [searchParams]
  );

  const { data: brands, isFetching } = useBrands({ page });
  const currentPage = brands?.data.current_page || 1;
  const totalPages = brands?.data.total_pages || 1;
  const brandsList = brands?.data.brands || [];

  return (
    <section className="flex items-center flex-col">
      <HeaderSection title="لیست برندها" />
      <ContentSection
        title="برند"
        linkPath="./brands/create"
        linkText="ایجاد برند"
        dataList={brandsList}
        currentPage={currentPage}
        totalPages={totalPages}
        renderList={(brands) => (
          <BrandList isLoading={isFetching} brands={brands} />
        )}
      />
    </section>
  );
};

export default Brands;

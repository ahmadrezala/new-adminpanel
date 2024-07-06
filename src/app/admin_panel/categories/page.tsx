"use client";
import React, { useMemo, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCategories } from "./_api/get-categories";
import { ContentSection } from "@/app/_components/content-section";
import { HeaderSection } from "@/app/_components/header_section";
import { Textbox } from "@/app/_components/textbox";
import NetworkError from "@/app/_components/networkerror/network-error";
import CategoryList from "./_components/category-list";

const Categories: React.FC = () => {
  const searchParams = useSearchParams();
  const page = useMemo(
    () => parseInt(searchParams.get("page") as string) || 1,
    [searchParams]
  );

  const [searchValue, setSearchValue] = useState("");
  const {
    data: Categories,
    isFetching,
    error,
    refetch,
  } = useCategories({ page, search: searchValue, count: 5 });

  const currentPage = Categories?.data.current_page || 1;
  const totalPages = Categories?.data.total_pages || 1;
  const CategoriesList = Categories?.data.categories || [];

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
      <HeaderSection title="لیست دسته بندی ها" />
      <ContentSection
        linkPath="./categories/create"
        linkText="ایجاد برند"
        dataList={CategoriesList}
        currentPage={currentPage}
        totalPages={totalPages}
        renderList={(Categories) => (
          <CategoryList isLoading={isFetching} categories={Categories} />
        )}
        renderSearchInput={renderSearchInput}
      />
    </section>
  );
};

const SuspendedCategories: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Categories />
  </Suspense>
);

export default SuspendedCategories;

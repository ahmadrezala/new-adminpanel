"use client";
import React, { useMemo, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContentSection } from "@/app/_components/content-section";
import { HeaderSection } from "@/app/_components/header_section";
import { Textbox } from "@/app/_components/textbox";
import NetworkError from "@/app/_components/networkerror/network-error";
import AttributeList from "./_components/attribute-list";
import { useAttributes } from "./_api/get-attributes";

const Attributes: React.FC = () => {
  const searchParams = useSearchParams();
  const page = useMemo(
    () => parseInt(searchParams.get("page") as string) || 1,
    [searchParams]
  );

  const [searchValue, setSearchValue] = useState("");
  const {
    data: attributes,
    isFetching,
    error,
    refetch,
  } = useAttributes({ page, search: searchValue });

  const currentPage = attributes?.data.current_page || 1;
  const totalPages = attributes?.data.total_pages || 1;
  const attributesList = attributes?.data.attributes || [];

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
      <HeaderSection title="لیست ویژگی ها" />
      <ContentSection
        linkPath="./attributes/create"
        linkText="ایجاد ویژگی"
        dataList={attributesList}
        currentPage={currentPage}
        totalPages={totalPages}
        renderList={(attributes) => (
          <AttributeList isLoading={isFetching} attributes={attributes} />
        )}
        renderSearchInput={renderSearchInput}
      />
    </section>
  );
};

const SuspendedAttributes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Attributes />
  </Suspense>
);

export default SuspendedAttributes;

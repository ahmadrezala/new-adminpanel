"use client";
import React, { useMemo, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTags } from "./_api/get-tags";
import { ContentSection } from "@/app/_components/content-section";
import { HeaderSection } from "@/app/_components/header_section";
import { Textbox } from "@/app/_components/textbox";
import NetworkError from "@/app/_components/networkerror/network-error";
import TagList from "./_components/tag-list";

const Tags: React.FC = () => {
  const searchParams = useSearchParams();
  const page = useMemo(
    () => parseInt(searchParams.get("page") as string) || 1,
    [searchParams]
  );

  const [searchValue, setSearchValue] = useState("");
  const {
    data: tags,
    isFetching,
    error,
    refetch,
  } = useTags({ page, search: searchValue });

  const currentPage = tags?.data.current_page || 1;
  const totalPages = tags?.data.total_pages || 1;
  const tagsList = tags?.data.tags || [];

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
      <HeaderSection title="لیست تگ ها" />
      <ContentSection
        linkPath="./tags/create"
        linkText="ایجاد تگ"
        dataList={tagsList}
        currentPage={currentPage}
        totalPages={totalPages}
        renderList={(tags) => <TagList isLoading={isFetching} tags={tags} />}
        renderSearchInput={renderSearchInput}
      />
    </section>
  );
};

const SuspendedTags = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Tags />
  </Suspense>
);

export default SuspendedTags;

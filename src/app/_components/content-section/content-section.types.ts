export type ContentSectionProps<T> = {
  linkPath: string;
  linkText: string;
  dataList: T[];
  currentPage: number;
  totalPages: number;
  renderList: (data: T[]) => JSX.Element;
  renderSearchInput: () => JSX.Element;
}
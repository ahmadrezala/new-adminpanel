export type ContentSectionProps<T> = {
  title: string;
  linkPath: string;
  linkText: string;
  dataList: T[];
  currentPage: number;
  totalPages: number;
  renderList: (data: T[]) => JSX.Element;
}
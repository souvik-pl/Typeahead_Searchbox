export type ResultHighlightProps = {
  searchQuery: string;
  resultItem: string;
};

function ResultHighlight({ searchQuery, resultItem }: ResultHighlightProps) {
  if (!resultItem.toLowerCase().includes(searchQuery.toLowerCase())) return;

  const searchQueryStartIndex: number = resultItem.toLowerCase().indexOf(searchQuery.toLowerCase());
  const searchQueryLength: number = searchQuery.length;

  const resultItemFirst: string = resultItem.slice(0, searchQueryStartIndex);
  const resultItemMiddle: string = resultItem.slice(
    searchQueryStartIndex,
    searchQueryStartIndex + searchQueryLength
  );
  const resultItemLast: string = resultItem.slice(searchQueryStartIndex + searchQueryLength);

  return (
    <div
      style={{
        height: "40px",
        padding: "0 10px",
        color: "gray",
        display: "flex",
        alignItems: "center",
      }}
    >
      {resultItemFirst}
      <strong style={{ color: "black" }}>{resultItemMiddle}</strong>
      {resultItemLast}
    </div>
  );
}

export default ResultHighlight;

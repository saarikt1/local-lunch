import React from "react";
import { Box } from "@material-ui/core";
import SearchResultDetails from "./SearchResultDetails";

const SearchResults = ({ searchResults }) => {
  return (
    <Box
      id="search-results"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      {searchResults.map((r) => (
        <SearchResultDetails key={r.place_id} searchResult={r} />
      ))}
    </Box>
  );
};

export default SearchResults;

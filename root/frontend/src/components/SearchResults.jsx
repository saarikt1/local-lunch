import React from "react";
import { Box } from "@material-ui/core";
import SearchResultDetails from "./SearchResultDetails";

const SearchResults = ({ searchResults, fillFormWithData }) => {
  return (
    <Box
      id="search-results"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      {searchResults.map((r) => (
        <SearchResultDetails
          key={r.place_id}
          searchResult={r}
          fillFormWithData={fillFormWithData}
        />
      ))}
    </Box>
  );
};

export default SearchResults;

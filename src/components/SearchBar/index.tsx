/** @jsxImportSource @emotion/react */

import { ChangeEvent } from "react";
import { css } from "@emotion/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  SearchFields,
  searchFieldAtom,
  searchQueryAtom,
} from "@/services/contact/atom";

type SearchBarProps = {
  // eslint-disable-next-line no-unused-vars
  handleSearchContact: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ handleSearchContact }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const setSearchField = useSetAtom(searchFieldAtom);
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <select
        css={select}
        onChange={(e) => {
          setSearchField(e.target.value as SearchFields);
          setTimeout(() => {
            handleSearchContact({
              target: { value: searchQuery },
            } as ChangeEvent<HTMLInputElement>);
          }, 200);
        }}
        value={useAtomValue(searchFieldAtom)}
      >
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
        <option value="number">Number</option>
      </select>
      <input
        type="text"
        css={input}
        value={searchQuery}
        placeholder="Type to search contact"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearchContact(e);
        }}
      />
    </div>
  );
};

export default SearchBar;

const input = css`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: #334155;
  box-shadow: 0 0 0 1px #9ca3af;
  height: 35px;
  &focus {
    box-shadow: 0 0 0 2px #6b7280;
  }
`;

const select = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  padding-right: 16px;
  font-size: 15px;
  line-height: 1;
  color: #334155;
  box-shadow: 0 0 0 1px #9ca3af;
  height: 35px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &focus {
    box-shadow: 0 0 0 2px #6b7280;
  }
`;

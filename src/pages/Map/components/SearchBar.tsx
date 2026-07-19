import { Search, X } from "lucide-react";
import styled from "styled-components";

interface ISearchBarProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
  onSearch: () => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChange,
  onClear,
  onSearch,
}: ISearchBarProps) => {
  return (
    <MapSearchForm
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <MapSearchBox>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label="관광지 검색"
        />
        {value && (
          <ClearButton onClick={() => onClear()}>
            <XIcon />
          </ClearButton>
        )}
      </MapSearchBox>
    </MapSearchForm>
  );
};

const MapSearchForm = styled.form`
  display: flex;
  justify-content: center;

  padding: 16px;
`;

const MapSearchBox = styled.div`
  height: 40px;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 4px;

  padding-inline: 16px;

  border: 1px solid #f5f2eb;
  border-radius: 50px;
  background-color: #faf9f2;

  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: #73b4b6;
  }
`;

const SearchIcon = styled(Search)`
  width: 16px;
  height: 16px;
  stroke: #999fa6;
  stroke-width: 2.2;
`;

const SearchInput = styled.input`
  width: 100%;

  border: none;
  outline: none;
  font-size: 0.875rem;

  background-color: #faf9f2;
`;

const ClearButton = styled.button.attrs({ type: "button" })`
  height: 20px;
  width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;

  border: none;
  border-radius: 16px;

  background-color: #eae8d9;

  cursor: pointer;
`;

const XIcon = styled(X)`
  height: 12px;
  width: 12px;

  stroke: #c6c5b8;
  stroke-width: 2.2;
`;

export default SearchBar;

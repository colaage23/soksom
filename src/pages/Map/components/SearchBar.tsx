import { Search } from "lucide-react";
import styled from "styled-components";

interface ISearchBarProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = ({ placeholder, value, onChange }: ISearchBarProps) => {
  return (
    <MapSearchForm>
      <MapSearchBox>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
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

export default SearchBar;

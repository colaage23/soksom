import styled from "styled-components";
import SearchBar from "./SearchBar";

const RouteList = () => {
  return (
    <RouteListContainer>
      <SearchBar placeholder="장소 검색 후 추가" />
    </RouteListContainer>
  );
};

const RouteListContainer = styled.section`
  flex: 1;
  min-height: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  background-color: #fdfcf8;
`;

export default RouteList;

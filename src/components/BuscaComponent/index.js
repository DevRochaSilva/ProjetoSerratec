import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchStyle } from "./style";

function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <SearchStyle>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <AiOutlineSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Filtro por qualquer coluna da tabela..."
          onChange={handleSearch}
        />
      </InputGroup>
    </SearchStyle>
  );
}

export default SearchComponent;

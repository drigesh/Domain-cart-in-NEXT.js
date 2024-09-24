import React from "react";
import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";

interface SearchDomainProps {
  searchValue: string;
  updateSearchValue: Function;
  handleKeyDown: Function;
  domainValidation: Function;
}

export default function SearchDomain(props: SearchDomainProps) {
  return (
    <Box margin={"0 0 16px"}>
      <Text fontSize={18} fontWeight={500} padding={"8px 0"}>
        Find your favourite domain here...
      </Text>

      <Flex gap={4}>
        <Input
          placeholder="Start Typing..."
          value={props.searchValue}
          onChange={(e) => props.updateSearchValue(e.target.value)}
          onKeyDown={(e) => props.handleKeyDown(e)}
        ></Input>
        <Button
          onClick={() => {
            props.searchValue.length > 0 ? props.domainValidation() : null;
          }}
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
}

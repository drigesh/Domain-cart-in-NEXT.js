import React from "react";
import {
  Box,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

interface Props {
  numberOfAddedItems: number;
  maxDomains: number;
}

const Header: React.FC<Props> = ({ numberOfAddedItems, maxDomains }) => {
  const ratio = numberOfAddedItems / maxDomains;
  return (
    <>
      <Box border={"2px solid #C0C0C0"} borderRadius={12} padding={"0 12px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Box padding={"6 0"}>
            <Text fontSize={24} fontWeight={500}>
              Cart
            </Text>
          </Box>

          <Flex
            padding={6}
            flexDirection={"column"}
            alignItems={"center"}
            gap={1}
          >
            <CircularProgress
              value={ratio <= 1 ? ratio * 100 : ratio * 100 - 100}
              color={ratio <= 1 ? "green.400" : "red.600"}
              trackColor={ratio <= 1 ? "gray.200" : "green.500"}
            >
              <CircularProgressLabel>
                {numberOfAddedItems}/{maxDomains}
              </CircularProgressLabel>
            </CircularProgress>
            <Box>
              <Text display={"inline"} padding={"0 0 0 2px"} fontWeight={700}>
                {numberOfAddedItems}
              </Text>
              <Text display={"inline"} padding={"0 0 0 2px"}>
                out of
              </Text>
              <Text display={"inline"} padding={"0 0 0 2px"} fontWeight={700}>
                {maxDomains}
              </Text>
              <Text display={"inline"} padding={"0 0 0 2px"}>
                items added.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;

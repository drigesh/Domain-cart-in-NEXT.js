import React from "react";
import { Box, Text, IconButton, Badge, Card, Flex } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { Domain } from "./challenge";

interface DisplayDomainsProps {
  addedItems: Domain[];
  handleDeleteDomain: Function;
}

export default function DisplayDomains(props: DisplayDomainsProps) {
  return props.addedItems.length === 0 ? (
    <Box margin={"0 0 20px 0"}>Add domains to see them.</Box>
  ) : (
    <Box margin={"0 0 20px 0"}>
      <Text>Your added domains are: {props.addedItems.length}</Text>

      <Box margin={"8px 0"}>
        {props.addedItems.map((element, index) => {
          return (
            <Card
              margin={"3px 0"}
              padding={"5px 16px"}
              _hover={{ bg: "gray.300" }}
              borderRadius="full"
              key={index}
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={18}>
                  {index + 1}. {element.item}
                </Text>
                <Box>
                  <Badge
                    bgColor={element.valid ? "green" : "red"}
                    color={"white"}
                    margin={"0 6px"}
                    fontSize={8}
                  >
                    {element.valid ? "valid" : "invalid"}
                  </Badge>
                  <IconButton
                    aria-label="Delete domain"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      props.handleDeleteDomain(element.id as number);
                    }}
                    borderRadius="full"
                    size="xs"
                  />
                </Box>
              </Flex>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

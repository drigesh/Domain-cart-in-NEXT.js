import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Domain } from "./challenge";

interface ButtonBoxProps {
  addedItems: Domain[];
  handleClear: Function;
  handleKeepBest: Function;
  handleCopy: Function;
  handleRemoveUnavailableDomains: Function;
  maxDomains: number;
}

export default function ButtonsBox(props: ButtonBoxProps) {
  return (
    <Box margin={"20px 0 0"} display={"flex"} flexWrap={"wrap"}>
      <Button
        margin={"2px 4px"}
        padding={"0 14px"}
        isDisabled={props.addedItems.length === 0}
        onClick={() => props.handleClear()}
        width={"fit-content"}
      >
        Clear
      </Button>

      <Button
        margin={"2px 4px"}
        padding={"0 14px"}
        isDisabled={props.addedItems.length === 0}
        onClick={() => props.handleKeepBest()}
        width={"fit-content"}
      >
        Keep best
      </Button>

      <Button
        margin={"2px 4px"}
        padding={"0 14px"}
        isDisabled={props.addedItems.length === 0}
        onClick={() => props.handleCopy()}
        width={"fit-content"}
      >
        Copy
      </Button>

      <Button
        margin={"2px 4px"}
        padding={"0 14px"}
        isDisabled={props.addedItems.length === 0}
        onClick={() => props.handleRemoveUnavailableDomains()}
        width={"fit-content"}
      >
        Remove Unavailable
      </Button>

      <Button
        margin={"2px 4px"}
        padding={"0 14px"}
        backgroundColor={
          props.addedItems.length === props.maxDomains ? "#000000" : "#EDF2F7"
        }
        textColor={
          props.addedItems.length === props.maxDomains ? "white" : "black"
        }
        isDisabled={props.addedItems.length !== props.maxDomains}
        border={
          props.addedItems.length === props.maxDomains ? "0" : "1px solid black"
        }
        _hover={""}
        width={"fit-content"}
      >
        Purchase Now
      </Button>
    </Box>
  );
}

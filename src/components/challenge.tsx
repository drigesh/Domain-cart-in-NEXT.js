import { Box, Flex } from "@chakra-ui/react";

import Header from "./header";
import { useState, useRef } from "react";
import { isDomainAvailable } from "@/lib/resources";
import DisplayDomains from "./displayDomain";
import SearchDomain from "./searchDomain";
import ButtonsBox from "./buttonsBox";

export interface ChallengeProps {
  /**
   * The maximum number of domains the user is allowed to have
   * in their cart. Invalid domains count toward this limit as well.
   */
  maxDomains: number;
}

export interface Domain {
  // interface for domain which could have id, item, and flag if its valid.
  id: number;
  item: string;
  valid?: boolean;
}

export function Challenge(props: ChallengeProps) {
  const { maxDomains } = props;
  const [addedItems, setAddedItems] = useState<Domain[]>([]); // List of domains
  const [searchValue, setSearchValue] = useState(""); // for input string
  const nextIdRef = useRef<number>(1); // To have unique ID

  const regex = /^[a-zA-Z0-9-]+\.(com|xyz|app)$/;

  const handleAddDomain = () => {
    const isValidDomain = async () => {
      if (
        addedItems.some((domain) => domain.item === searchValue.toLowerCase())
      ) {
        alert("Domain is already added.");
        return;
      }

      var valid = false;
      try {
        var response = await isDomainAvailable(searchValue);
        if (response) {
          valid = true;
        }
        setAddedItems((prev) => [
          ...prev,
          {
            id: nextIdRef.current,
            item: searchValue.toLowerCase(),
            valid: valid,
          },
        ]);
        nextIdRef.current += 1;
      } catch {
      } finally {
        setSearchValue("");
      }
    };

    isValidDomain();
  };

  const handleDeleteDomain = (id: number) => {
    setAddedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const domainValidation = () => {
    if (regex.test(searchValue)) {
      handleAddDomain();
    } else alert("Domain format is not correct.");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchValue.length > 0) domainValidation();
    }
  };

  const handleClear = () => {
    setAddedItems([]);
  };

  const handleRemoveUnavailableDomains = () => {
    setAddedItems((items) => items.filter((item) => item.valid));
  };

  const handleCopy = async () => {
    try {
      let textToCopy = addedItems.map((item) => item.item);
      await navigator.clipboard.writeText(textToCopy.toString());
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy!");
    }
  };

  const domainPriority: Record<string, number> = {
    ".com": 1,
    ".app": 2,
    ".xyz": 3,
  };

  const updateSearchValue = (val: string) => {
    setSearchValue(val);
  };

  const handleKeepBest = () => {
    const finalDomains = [...addedItems].sort((first, second) => {
      const firstEnd = first.item.substring(first.item.lastIndexOf("."));
      const secondEnd = second.item.substring(second.item.lastIndexOf("."));

      if (domainPriority[firstEnd] !== domainPriority[secondEnd]) {
        return domainPriority[firstEnd] - domainPriority[secondEnd];
      }

      return first.item.length - second.item.length;
    });
    setAddedItems(finalDomains.slice(0, maxDomains));
  };

  return (
    <>
      <Box maxW="full">
        <Flex direction={"column"} alignContent={"Center"}>
          <Header
            numberOfAddedItems={addedItems.length}
            maxDomains={maxDomains}
          ></Header>

          <Box>
            {/* This Box contains search option and add button */}
            <SearchDomain
              searchValue={searchValue}
              updateSearchValue={updateSearchValue}
              handleKeyDown={handleKeyDown}
              domainValidation={domainValidation}
            ></SearchDomain>

            {/* Separate Box that displays all the domains with functions */}
            <DisplayDomains
              addedItems={addedItems}
              handleDeleteDomain={handleDeleteDomain}
            ></DisplayDomains>

            {/* Box that contains all the buttons */}
            <ButtonsBox
              addedItems={addedItems}
              handleClear={handleClear}
              handleKeepBest={handleKeepBest}
              handleCopy={handleCopy}
              handleRemoveUnavailableDomains={handleRemoveUnavailableDomains}
              maxDomains={maxDomains}
            ></ButtonsBox>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

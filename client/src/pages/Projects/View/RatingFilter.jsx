import React from "react";
import { Star as StarIcon } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useState } from "react";

const RatingFilter = ({ renderRatingFilter, ...props }) => {
  const [internalState, setInternalState] = useState({
    selectedItem: "All",
    // uncontrolled: 123,
    // onSelectedChanged: () => {},
  });
  const isControlled = (key) => {
    return props[key] !== undefined;
  };

  const getState = (state = internalState) => {
    return Object.entries(state).reduce((accum, [key, value]) => {
      if (isControlled(key)) accum[key] = props[key];
      else accum[key] = value;
      return accum;
    }, {});
  };

  const { selectedItem } = getState();

  const dynamicSetState = (changes, callback) => {
    let allChanges;
    setInternalState((prevState) => {
      const combinedState = getState(prevState);
      const newChanges =
        typeof changes === "function" ? changes(combinedState) : changes;

      allChanges = newChanges;

      const uncontrolledPropsChanges = Object.entries(newChanges).reduce(
        (accum, [key, value]) => {
          if (!isControlled(key)) {
            accum[key] = value;
          }

          return accum;
        },
        {}
      );

      return Object.keys(uncontrolledPropsChanges).length
        ? { ...prevState, ...uncontrolledPropsChanges }
        : prevState;
    });
    callback(allChanges);
  };

  const handleFilterChange = (newValue) => {
    dynamicSetState(
      (_prevState) => {
        return {
          selectedItem: newValue,
          //   uncontrolled: 123,
        };
      },
      (allChanges) => {
        props?.onSelectedItemChange?.(allChanges);
      }
    );
  };

  return renderRatingFilter ? (
    renderRatingFilter({ props, internalState, handleFilterChange })
  ) : (
    <div
      style={{
        marginBlock: "1rem",
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
      }}
    >
      {[
        { rating: 6, label: "All", count: 26 },
        { rating: 5, label: "5", count: 0 },
        { rating: 4, label: "4", count: 2 },
        { rating: 3, label: "3", count: 14 },
        { rating: 2, label: "2", count: 3 },
        { rating: 1, label: "1", count: 7 },
      ].map(({ rating, label, count }) => (
        <Chip
          label={
            <>
              {label}
              <StarIcon size="small" fontSize="1rem" /> {/*({count})*/}
            </>
          }
          // color="warning"
          sx={{
            background: rating === selectedItem ? "#000000d9" : "inherit",
            color: rating === selectedItem ? "white" : "inherit",
          }}
          variant={rating === selectedItem ? "filled" : "outlined"}
          onClick={() => handleFilterChange(rating)}
        />
      ))}
    </div>
  );
};

export default RatingFilter;

import React from "react";
import { TextField } from "@mui/material";

const Code = (props) => {
  const [internalState, setInternalState] = React.useState({
    value: "",
    codeLength: 6,
  });
  const { onChange = () => {} } = props;

  const isControlled = (key) => {
    return props[key] !== undefined;
  };

  const dynamicSetState = (changes, callback) => {
    const currentState = getState(internalState);
    const newChanges =
      typeof changes === "function" ? changes(currentState) : changes;
    const uncontrolledPropsChanges = Object.entries(newChanges).reduce(
      (accum, [key, value]) => {
        if (!isControlled(key)) accum[key] = value;

        return accum;
      },
      {}
    );

    if (Object.keys(uncontrolledPropsChanges).length) {
      setInternalState((prev) => ({ ...prev, ...uncontrolledPropsChanges }));
    }

    callback(newChanges);
  };

  const handleOnChange = (n, index) => {
    dynamicSetState(
      (currentState) => {
        const { value: currentValue } = currentState;
        const nextValue =
          currentValue.substring(0, index) +
          n +
          currentValue.substring(index + 1);
        return {
          value: nextValue,
        };
      },
      (changes) => {
        props?.onChange(changes.value);
      }
    );
    // if (!isControlled("value")) {
    //   setInternalState((prev) => {
    //     const { value: currentValue } = prev;

    //     const nextValue =
    //       currentValue.substring(0, index) +
    //       n +
    //       currentValue.substring(index + 1);

    //     return {
    //       ...prev,
    //       value: nextValue,
    //     };
    //   });
    // } else {
    //   const { value: currentValue } = internalState;
    //   const nextValue =
    //     currentValue.substring(0, index) +
    //     n +
    //     currentValue.substring(index + 1);
    //   onChange(nextValue);
    // }
  };

  const getState = (state = internalState) => {
    return Object.entries(state).reduce((accum, [key, value]) => {
      if (isControlled(key)) accum[key] = props[key];
      else accum[key] = value;
      return accum;
    }, {});
  };

  const state = getState();
  const textFieldRefs = React.useRef([]);
  const length = [];
  for (let i = 0; i < state.codeLength; i++) {
    length.push(i);
  }

  return (
    <div
      onClick={() => {
        if (textFieldRefs.current.length) {
          for (let field of textFieldRefs.current) {
            if (!field.value) {
              field.focus();
              break;
            }
            if (
              textFieldRefs.current[textFieldRefs.current.length - 1] === field
            ) {
              field.focus();
            }
          }
        }
      }}
    >
      {length.map((d, index) => (
        <TextField
          key={d}
          inputRef={(ref) => {
            textFieldRefs.current[index] = ref;
          }}
          value={state.value[index] || ""}
          variant="filled"
          placeholder="0"
          size="small"
          onKeyDown={(e) => {
            setTimeout(() => {
              if (e.key === "Backspace") {
                if (textFieldRefs.current[index - 1]) {
                  textFieldRefs.current[index - 1].focus();
                }
              } else {
                if (!e.key.match(/[0-9]/g)) return;
                textFieldRefs.current[index + 1].focus();
              }
            }, 0);
          }}
          onChange={(e) => {
            const { value } = e.target;
            if (value && !value.match(/[0-9]/g)) return;
            handleOnChange(value, index);
          }}
          InputProps={{
            style: {
              marginInline: 2,
              maxHeight: "3ch",
              minWidth: "2.5ch",
              maxWidth: "2.5ch",
              fontSize: "2rem",
            },
          }}
          inputProps={{
            maxLength: 1,
          }}
        />
      ))}
    </div>
  );
};

export default Code;

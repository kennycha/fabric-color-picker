import { createContext, useContext } from "react";

type ColorContext = {
  color: string;
  onChange: (value: string) => void;
};

export const colorContext = createContext<ColorContext>({
  color: "#000000",
  onChange: () => {
    throw Error();
  },
});

export const useColorContext = () => {
  return useContext(colorContext);
};

import { StylesConfig } from "react-select";

export const selectDefaultStyles = (error?: string): StylesConfig => ({
    container: (base, state) => ({
        ...base,
        borderRadius: "var(--radius-small)",
        boxShadow: state.isFocused ? "var(--box-shadow-focus-visible)" : "none",
    }),
    placeholder: (base) => ({
        ...base,
        color: "var(--clr-gray-50)",
        height: 40,
        display: "flex",
        alignItems: "center",
    }),
    singleValue: (base) => ({
        ...base,
        color: "var(--clr-black)",
    }),
    control: (base) => ({
        ...base,
        border: `1px solid ${error ? "var(--clr-red)" : "var(--clr-black)"}`,
        ":hover": {
            border: error ? `1px solid var(--clr-red)` : `1px solid var(--clr-black)`,
        },
        borderRadius: "var(--radius-small)",
        boxShadow: "none",
        height: 40,
        cursor: "pointer",
    }),
    indicatorSeparator: (base) => ({
        ...base,
        display: "none",
    }),
    valueContainer: (base) => ({
        ...base,
        height: 40,
        padding: "0 8px",
    }),
    option: (base, state) => ({
        ...base,
        height: 40,
        cursor: "pointer",
        backgroundColor: state.isSelected
            ? "var(--clr-black)"
            : state.isFocused
              ? "var(--clr-gray-200)"
              : base.backgroundColor,
        ":hover": {
            backgroundColor: state.isSelected ? "var(--clr-black)" : "var(--clr-gray-200)",
        },
    }),
    indicatorsContainer: (base, state) => ({
        ...base,
        transition: "all .2s ease",
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    }),
});

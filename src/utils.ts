export const formatNumber = (numberToFormat: number) => {
    const formatter = new Intl.NumberFormat("no-NO");

    return formatter.format(numberToFormat);
};

// https://github.com/gregberge/react-merge-refs
export default function mergeRefs<T>(
    refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(value);
            } else if (ref !== null && ref !== undefined) {
                (ref as React.MutableRefObject<T | null>).current = value;
            }
        });
    };
}

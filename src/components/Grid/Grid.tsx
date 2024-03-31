import "./Grid.scss";

import clsx from "clsx";

type GridProps = {
    children: React.ReactNode;
    gap?: number | string;
    columns?: number | string;
    rows?: number | string;
    justify?: "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly";
    align?: "start" | "center" | "end" | "baseline" | "stretch";
    display?: "grid" | "inline-grid";
    style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export const Grid = ({
    children,
    gap = 1,
    columns = 3,
    rows,
    className,
    justify,
    align,
    display = "grid",
    style: _style,
    ...rest
}: GridProps) => {
    const style: React.CSSProperties = {
        gridTemplateColumns: typeof columns === "string" ? columns : `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: typeof rows === "string" ? rows : `repeat(${rows}, minmax(0, 1fr))`,
        gap: typeof gap === "string" ? gap : `${gap}em`,
        justifyContent: justify,
        alignItems: align,
        ..._style,
    };

    return (
        <div
            {...rest}
            style={style}
            className={clsx(
                "grid",
                {
                    "grid--grid": display === "grid",
                    "grid--inline": display === "inline-grid",
                },
                className
            )}
        >
            {children}
        </div>
    );
};

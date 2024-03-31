import "./Button.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import mergeRefs from "../../utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
    ({ type = "submit", children, className, variant, loading, ...rest }, ref) => {
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        const mergedRef = useMemo(() => mergeRefs([buttonRef, ref]), [ref]);

        const [preservedWidth, setPreservedWidth] = useState<number>();

        useLayoutEffect(() => {
            if (loading) {
                const requestID = window.requestAnimationFrame(() => {
                    setPreservedWidth(buttonRef?.current?.getBoundingClientRect()?.width);
                });
                return () => {
                    setPreservedWidth(undefined);
                    cancelAnimationFrame(requestID);
                };
            }
        }, [loading]);

        return (
            <button
                type={type}
                ref={mergedRef}
                className={clsx("button", className, {
                    "button--primary": variant === "primary",
                    "button--secondary": variant === "secondary",
                    "button--disabled": loading,
                    "button--loading": loading,
                })}
                style={{
                    width: preservedWidth,
                }}
                aria-disabled={loading}
                {...rest}
            >
                {preservedWidth ? (
                    <ThreeDots
                        color="var(--clr-white)"
                        height={20}
                        width={40}
                    />
                ) : (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        {children}
                    </motion.span>
                )}
            </button>
        );
    }
);

export default Button;

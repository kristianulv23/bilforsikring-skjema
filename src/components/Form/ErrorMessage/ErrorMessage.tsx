import "./ErrorMessage.scss";
import clsx from "clsx";
import { FormSchemaInputType } from "../../../zod/schema";
import { FieldErrors } from "react-hook-form";
import { motion } from "framer-motion";

interface ErrorMessageProps {
    errors: FieldErrors<FormSchemaInputType>;
}

const animation = () => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
});

const ErrorMessage = ({ errors }: ErrorMessageProps) => {
    return (
        <motion.div
            className={clsx("error-message", {
                "error-message--visible": Object.keys(errors).length > 0,
            })}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            aria-hidden={Object.keys(errors).length === 0}
            {...animation()}
        >
            <p className="error-message__title">Feil og mangler i skjemaet</p>
            <ul className="error-message__list">
                {Object.entries(errors).map(([key, value]) => (
                    <li
                        className="error-message__list-item"
                        key={key}
                    >
                        {value?.message === "Required" ? "Du må oppgi din nåværende bonus" : value?.message}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default ErrorMessage;

import "./Form.scss";

import { FormProvider, SubmitHandler, Controller, FieldValues, UseFormReturn, useFormContext } from "react-hook-form";
import { FormSchemaInputType } from "../../zod/schema";
import { Grid } from "../Grid/Grid";
import Button from "../Button/Button";
import clsx from "clsx";
import { FieldsetHTMLAttributes, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import ReactSelect from "react-select";
import ArrowDownIcon from "../ArrowDownIcon/ArrowDownIcon";
import { selectDefaultStyles } from "./selectDefaultStyles";

interface FormProps<T> {
    onSubmit: SubmitHandler<T extends FieldValues ? T : never>;
    methods: UseFormReturn<T extends FieldValues ? T : never>;
    children?: React.ReactNode;
}

const Form = ({ onSubmit, children, methods }: FormProps<FormSchemaInputType>) => {
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form"
            >
                {children}
                <Grid
                    columns="repeat(2, auto)"
                    display="inline-grid"
                >
                    <Button loading={isSubmitting}>Beregn pris</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => reset()}
                    >
                        Avbryt
                    </Button>
                </Grid>
            </form>
            <div
                aria-live="polite"
                className="sr-only"
            >
                {isSubmitting ? "Vi beregner prisen for deg, vennligst vent..." : ""}
            </div>
        </FormProvider>
    );
};

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const Group = ({ children, className, ...props }: GroupProps) => {
    return (
        <div
            className={clsx("form__group", className)}
            {...props}
        >
            {children}
        </div>
    );
};

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: string;
    name: keyof FormSchemaInputType;
}

const Label = ({ name, text }: LabelProps) => {
    return (
        <label
            htmlFor={name}
            className={clsx("form__label")}
        >
            {text}
        </label>
    );
};

const errorAnimation = (error?: string) => ({
    initial: { opacity: 0, y: -10 },
    animate: { opacity: error ? 1 : 0, y: error ? 0 : -10 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
});

interface ErrorTextProps {
    error?: string;
}

const ErrorText = ({ error }: ErrorTextProps) => {
    return (
        <motion.span
            id="form-error-text"
            className="form__error-text"
            aria-hidden={!error}
            {...errorAnimation(error)}
        >
            {error === "Required" ? "Du må oppgi din nåværende bonus" : error}
        </motion.span>
    );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    name: keyof FormSchemaInputType;
    label: string;
}

const Input = ({ name, error, label, className, style, ...rest }: InputProps) => {
    const { register } = useFormContext();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (name === "regNr") {
            e.target.value = e.target.value.toUpperCase();
        }

        return e.target.value;
    };

    return (
        <Form.Group
            className={className}
            style={style}
        >
            <Form.Label
                name={name}
                text={label}
            />
            <input
                id={name}
                className={clsx("form__input", { "form__input--error": !!error })}
                aria-invalid={!!error}
                aria-describedby="form-error-text"
                {...rest}
                {...register(name, { onChange })}
            />
            <Form.ErrorText error={error} />
        </Form.Group>
    );
};

interface SelectProps {
    error?: string;
    helpLabel?: string;
    placeholder?: string;
    label: string;
    options: {
        value: string;
        label: string;
    }[];
    name: keyof FormSchemaInputType;
}

const Select = ({ name, label, helpLabel, error, options, placeholder }: SelectProps) => {
    const defaultStyles = selectDefaultStyles(error);

    return (
        <Form.Group>
            <Form.Label
                name={name}
                text={label}
            />
            <Controller
                name={name}
                render={({ field: { onChange } }) => (
                    <ReactSelect
                        inputId={name}
                        placeholder={placeholder}
                        options={options}
                        isSearchable={false}
                        openMenuOnFocus={true}
                        styles={defaultStyles}
                        components={{ DropdownIndicator: ArrowDownIcon }}
                        onChange={onChange}
                    />
                )}
            />
            {helpLabel && !error && <Form.HelpText helpLabel={helpLabel} />}
            <Form.ErrorText error={error} />
        </Form.Group>
    );
};

interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    legendText: string;
    hideLegend?: boolean;
}

const Fieldset = ({ legendText, hideLegend, className, children, ...rest }: FieldsetProps) => {
    return (
        <fieldset
            className={clsx("form__fieldset", className)}
            {...rest}
        >
            <legend
                className={clsx("form__legend", {
                    "sr-only": !!hideLegend,
                })}
            >
                {legendText}
            </legend>
            {children}
        </fieldset>
    );
};

interface HelpTextProps {
    helpLabel: string;
}

const HelpText = ({ helpLabel }: HelpTextProps) => {
    return <span className="form__help-text">{helpLabel}</span>;
};

Form.Group = Group;
Form.Input = Input;
Form.Select = Select;
Form.Fieldset = Fieldset;
Form.Label = Label;
Form.ErrorText = ErrorText;
Form.HelpText = HelpText;

export default Form;

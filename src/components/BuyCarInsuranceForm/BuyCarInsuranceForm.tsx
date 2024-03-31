import { SubmitHandler, useForm } from "react-hook-form";
import { FormSchemaInputType, formSchema } from "../../zod/schema";
import { EstimatedPriceResponse, getEstimatedPrice } from "../../service";
import EstimatedPrice from "../EstimatedPrice/EstimatedPrice";
import { useState } from "react";
import ErrorMessage from "../Form/ErrorMessage/ErrorMessage";
import Form from "../Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";

const BuyCarInsuranceForm = () => {
    const methods = useForm<FormSchemaInputType>({
        resolver: zodResolver(formSchema, {}, { raw: true }),
    });

    const {
        formState: { errors, isSubmitSuccessful },
    } = methods;

    const [{ yearlyPrice, category }, setEstimatedPrice] = useState<EstimatedPriceResponse>({
        yearlyPrice: 0,
        category: [],
    });

    const hasErrors = Object.keys(errors).length > 0;

    const onSubmit: SubmitHandler<FormSchemaInputType> = async () => {
        try {
            const estimatedPrice = await getEstimatedPrice();
            setEstimatedPrice(estimatedPrice);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {hasErrors && <ErrorMessage errors={errors} />}
            <Form
                onSubmit={onSubmit}
                methods={methods}
            >
                <Form.Fieldset
                    legendText="Skjema for kjøp av bilforsikring"
                    hideLegend
                >
                    <Form.Input
                        name="regNr"
                        label="Bilens registreringsnummer"
                        placeholder="E.g. AB 12345"
                        error={errors.regNr?.message}
                    />
                    <Form.Select
                        name="bonus"
                        label="Din bonus"
                        helpLabel="Hvilken bonus har du i dag?"
                        placeholder="Velg bonus"
                        options={[
                            { value: "40%", label: "40%" },
                            { value: "50%", label: "50%" },
                            { value: "60%", label: "60%" },
                            { value: "70%", label: "70%" },
                            { value: "75%", label: "75%" },
                        ]}
                        error={errors.bonus?.message}
                    />
                    <Form.Input
                        name="dateOfBirth"
                        label="Fødselsnummer"
                        placeholder="11 siffer"
                        error={errors.dateOfBirth?.message}
                    />
                    <Form.Input
                        name="firstname"
                        label="Fornavn"
                        error={errors.firstname?.message}
                    />
                    <Form.Input
                        name="lastname"
                        label="Etternavn"
                        style={{ gridColumn: "2/2" }}
                        error={errors.lastname?.message}
                    />
                    <Form.Input
                        name="email"
                        label="E-post"
                        error={errors.email?.message}
                    />
                </Form.Fieldset>
            </Form>
            {isSubmitSuccessful && (
                <EstimatedPrice
                    yearlyPrice={yearlyPrice}
                    category={category}
                />
            )}
        </>
    );
};

export default BuyCarInsuranceForm;

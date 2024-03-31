import "./EstimatedPrice.scss";

import { EstimatedPriceResponse } from "../../service";
import { motion } from "framer-motion";
import { formatNumber } from "../../utils";
import Button from "../Button/Button";
import { useEffect, useRef } from "react";

const EstimatedPrice = (props: EstimatedPriceResponse) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const { yearlyPrice, category } = props;

    const formattedYearlyPrice = formatNumber(yearlyPrice);
    const monthlyPrice = yearlyPrice / 12;

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    }, []);

    return (
        <motion.section
            className="estimated"
            initial={{ transform: "translateY(100%)" }}
            animate={{ transform: "translateY(0)" }}
            exit={{ transform: "translateY(100%)" }}
            transition={{
                duration: 0.2,
                ease: [0.25, 0.8, 0.25, 1],
            }}
        >
            <div
                className="estimated__details"
                aria-live="assertive"
                aria-atomic="true"
            >
                <h2 className="estimated__title">Estimert pris</h2>
                <p className="estimated__yearly-price">{formattedYearlyPrice} kr/år</p>
                <p className="estimated__monthly-price">{monthlyPrice} kr/mnd</p>
                <hr />
                <ul className="estimated__list">
                    {category.map(({ name, monthlyPrice }, index) => (
                        <li
                            key={index}
                            className="estimated__list-item"
                        >
                            <span className="estimated__category">{name}</span>
                            <span className="estimated__monthly-price">{monthlyPrice} kr/mnd</span>
                        </li>
                    ))}
                </ul>
                <Button
                    ref={buttonRef}
                    className="estimated__close"
                    variant="secondary"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    Lukk
                </Button>
            </div>
        </motion.section>
    );
};

export default EstimatedPrice;

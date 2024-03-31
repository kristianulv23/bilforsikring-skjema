type Category = {
    name: string;
    monthlyPrice: number;
};

export type EstimatedPriceResponse = {
    yearlyPrice: number;
    category: Category[];
};

export const getEstimatedPrice = () =>
    new Promise<EstimatedPriceResponse>((resolve) => {
        setTimeout(() => {
            resolve({
                yearlyPrice: 4644,
                category: [
                    {
                        name: "Kasko med leiebil",
                        monthlyPrice: 138,
                    },
                    {
                        name: "Trafikkforsinkringsavgift",
                        monthlyPrice: 249,
                    },
                ],
            });
        }, 4000);
    });

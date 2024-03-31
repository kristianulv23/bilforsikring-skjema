import "./App.scss";
import BuyCarInsuranceForm from "./components/BuyCarInsuranceForm/BuyCarInsuranceForm";

const App = () => {
    return (
        <main className="app">
            <h1 className="app__title">Kjøp Bilforsikring</h1>
            <p className="app__description">
                Det er fire forskjellige forsikringer å velge mellom. Ansvarsforsikring er lovpålagt om kjøretøyet er
                registrert og skal brukes på veien. I tillegg kan du utvide forsikringen avhengig av hvor gammel bilen
                din er og hvordan du bruker den.
            </p>
            <BuyCarInsuranceForm />
        </main>
    );
};

export default App;

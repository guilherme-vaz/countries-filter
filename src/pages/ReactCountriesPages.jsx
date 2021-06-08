import { useState } from "react";
import Countries from "../components/Countries";
import Country from "../components/Country";
import Header from "../components/Header";
import Main from "../components/Main";
import TextInput from "../components/TextInput";
import { ALL_COUNTRIES } from "../data/countries";

export default function ReactCountries() {
  const [countryFilter, setCountryFilter] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  function toggleVisitedCuntry(countryId) {
    let newVisitedCounties = [...visitedCountries];

    const isCountryVisited = newVisitedCounties.indexOf(countryId) !== -1;

    if (isCountryVisited) {
      newVisitedCounties = newVisitedCounties.filter((visitedCountryId) => {
        return visitedCountryId !== countryId;
      });
    } else {
      newVisitedCounties.push(countryId);
    }

    setVisitedCountries(newVisitedCounties);
  }

  console.log(visitedCountries);

  const countryFilterLowercase = countryFilter.trim().toLocaleLowerCase();

  //Função para filtrar
  const filteredCountries =
    //Caso countryFilteredLowercase for maior ou igual a 3
    countryFilterLowercase.length >= 3
      ? //Retorna os países com filtro
        ALL_COUNTRIES.filter(({ nameLowerCase }) => {
          return nameLowerCase.includes(countryFilterLowercase);
        })
      : //Retorna todos os países
        ALL_COUNTRIES;

  return (
    <div className="App">
      <Header>React Countries</Header>
      <Main>
        <TextInput
          labelDescription="Informe o nome do país (pelo menos 3 caracteres)"
          inputValue={countryFilter}
          onInputChange={handleCountryFilterChange}
          autoFocus
          id="inputCountryFilter"
        />

        {/* <Countries
          visitedCountries={visitedCountries}
          onCountryClick={toggleVisitedCuntry}
        >
          {filteredCountries}
        </Countries> */}

        <Countries>
          <h2 className="text-center font-semibold">
            {filteredCountries.length} países
          </h2>

          <h3 className="text-center font-semibold">
            {visitedCountries.length} país(es) visitados
          </h3>

          {filteredCountries.map((country) => {
            //Esse !== -1 quer dizer que o id do país existe dentro do array
            const isVisited = visitedCountries.indexOf(country.id) !== -1;

            return (
              <Country
                isVisited={isVisited}
                onCountryClick={toggleVisitedCuntry}
                key={country.id}
              >
                {country}
              </Country>
            );
          })}
        </Countries>
      </Main>
    </div>
  );
}

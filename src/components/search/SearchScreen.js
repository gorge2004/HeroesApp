import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { getHeoresByName } from "../../selectorts/getHeroByName";
import HeroCard from "../hero/HeroCard";
import { useMemo } from 'react';

function SearchScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const [values, handleInputChange, reset] = useForm({
    searchTerm: q,
  });

  const { searchTerm } = values;
  let heroesFiltered = useMemo(()=> getHeoresByName(q), [q]) ;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchTerm.trim().length > 1) {
      navigate(`?q=${searchTerm}`);
      heroesFiltered = getHeoresByName(searchTerm);
    }
  };
  return (
    <>
      <h1>Busquedas</h1>
      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="Buscar un heroe"
              name="searchTerm"
              autoComplete="off"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Buscar</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          { q.length == 0 ? (
            <div className="alert alert-info">
              Buscar un heroe.
            </div>
          )
            :
            ( heroesFiltered.length === 0 && ( <div className="alert alert-danger">No hay resultados: {q}</div>))
        }
          {heroesFiltered.map((heroe) => (
            <HeroCard key={heroe.id} {...heroe} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchScreen;

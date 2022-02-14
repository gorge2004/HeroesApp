import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../../selectorts/getHeroById";
import { heroImages } from '../../helpers/heroImages';
const HeroScreen = () => {
  const { heroeId } = useParams();
  
  const heroe = useMemo(()=> getHeroById(heroeId), [heroeId]);
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };
  if (!heroe) {
    return <Navigate to="/" />;
  }
  const { id, superhero, publisher, alter_ego, first_appearance, characters } =
    heroe;
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img src={heroImages(`./${id}.jpg`)} alt={superhero} className="img-thumbnail animate__animated  animate__fadeInLeft" />
      </div>
      <div className="col-8">
        <h3>{heroe.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b> {publisher}
          </li>
          <li className="list-group-item">
            <b>First appereance: </b> {first_appearance}
          </li>
        </ul>
        <h5>Characters</h5>
        <p>{characters}</p>
        <button className="btn btn-outline-info" onClick={handleReturn}>
          regresar
        </button>
      </div>
    </div>
  );
};

export default HeroScreen;

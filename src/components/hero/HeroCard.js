import { Link } from "react-router-dom";
import { heroImages } from '../../helpers/heroImages';

const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImages(`./${id}.jpg`)} alt={superhero} className="card-img" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-name">{alter_ego}</p>
              {(alter_ego !== characters )&& (
                <p className="text-muted">{characters}</p>
              )}
              <p className="card-text">
                <Link to={`/hero/${id}`}>Mas...</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;

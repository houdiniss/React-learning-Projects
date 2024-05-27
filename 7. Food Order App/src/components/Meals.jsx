import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const configAttribute = {};

export default function Meals() {
  const {
    error,
    isLoading,
    data: loadedMeals
  } = useHttp('http://localhost:3000/meals' , configAttribute , []);
  

  if(isLoading) {
    return <p className="center">Fetching Data...</p>
  };

  if(error) {
    return <Error title={'Failed to fetch meals.'} message={error}/>
  };

  return ( 
    <ul id="meals">
      {loadedMeals.map(meal => (
        <MealItem 
          key={meal.id}
          meal={meal}
        />
      ))}
    </ul>
  )
}
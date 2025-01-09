async function fetchRecipes() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=g"
    );

    if (!response.ok) {
      throw new Error("Could not find recourse");
    }

    const data = await response.json();

    const structuredData = restructureRecipes(data.meals);
    console.log(structuredData); 
  } catch (error) {
    console.error(error);
  }

  function restructureRecipes(meals) {
    return meals.map((meal) => {
      return {
        title: meal.strMeal, 
        ingredients: getIngredients(meal),
      };
    });
  }

  function getIngredients(meal) {
    const ingredients = [];

    // Loopa genom alla ingrediens- och mängdfält
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const quantity = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          quantity: quantity ? quantity.trim() : "", 
        });
      }
    }
    return ingredients;
  }
}
fetchRecipes();

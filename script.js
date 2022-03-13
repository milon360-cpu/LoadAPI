 const searchButton = document.getElementById('search-btn');
 const searchingValue = document.getElementById('inputed-value');
 const foodItem = document.getElementById('food-item');
 const div_ = document.getElementById('food-details');
 searchButton.addEventListener('click',findFood);

 function findFood()
 {
     const inputValue = searchingValue.value;
     if(inputValue)
     {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
        .then((response) => response.json())
        .then((data) => searchingFood(data.meals))
        .catch((error) => errorMassage());
     }
     else 
     {
        
     }
     
}

function searchingFood(data)
{
    data.forEach(element => 
    {
     
        const div = document.createElement('div');
        const tag = 
        `<p> ${element.strMeal}</p>
         <img src = "${element.strMealThumb}" class = "food-img">
        `
        div.innerHTML = tag;
        div.className = 'foodContainer';
        foodItem.appendChild(div);
        foodItem.style.paddingTop = "20px"
        div.addEventListener('click',function(event)
        {
            const text = this.innerText;
            cookingItem(text);
        })
    });
}

function errorMassage()
{
    const p = 
        `<p> Food not found</p>
        `
        foodItem.innerHTML = p;
        foodItem.style.color = "white";
        
       
    setTimeout(function()
    {
        foodItem.innerHTML = null;
        foodItem.style.color = "black";
        foodItem.style.paddingTop = "0px";
    },2000);
 
}

// Individual Food details 

 function cookingItem(text)
 {
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
     .then((response) => response.json())
     .then((data) => 
     {
         const detailsDiv = document.createElement('div');
        
         const mealDetails = data.meals[0];
         const foodItemDetails = 
         `<img src = "${mealDetails.strMealThumb}">
          <h1>${mealDetails.strMeal}</h1>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient1}</li>
          <li> <i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient2}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient3}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient4}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient5}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient6}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient7}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient8}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient9}</li>
          <li><i class="fa-solid fa-utensils"></i> ${mealDetails.strIngredient10}</li>
          <p>${mealDetails.strInstructions} </p>
         `
         detailsDiv.innerHTML = foodItemDetails;
         detailsDiv.className = 'item-details'
         foodItem.style.display = "none";
         div_.appendChild(detailsDiv);
     })
     
 }

//  Clear button 
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click',function()
{
    searchingValue.value = '';
    location.reload();
})
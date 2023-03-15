const btn=document.querySelector("#btn")

btn.addEventListener("click",()=>{
    const recipe=document.querySelector("#recipe")

    function start(){
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res)=>{
            return res.json()
        }).then((fullres)=>{
            response(fullres.meals[0])
        })
    }

    start()

    function response(meal){
        const ingre=[]
        for(let i=1; i<=20; i++){
            if(meal[`strIngredient${i}`]){
                ingre.push(
                   `${meal[`strIngredient${i}`]} -${meal[`strMeasure${i}`]}`
                )
            }
            else{
                break;
            } 
        }
        console.log(ingre)

        recipe.innerHTML=`
        <div class="content">
                <img class="image" src="${meal.strMealThumb}" alt="">
                <div class="ing">
                    <p><strong>Recipe</strong>: ${meal.strMeal}</p>
                    <p><strong>Category</strong>: ${meal.strCategory}</p>
                    <p><strong>Area</strong>: ${meal.strArea}</p>
                    <p><strong>Tags</strong>: ${meal.strTags}</p>
                    <strong>Ingredients...</strong>
                    <ul>
                        ${ingre.map(get=>
                            `<li>${get}</li>`
                        ).join("")}
                    </ul>
                </div>
                </div>
                <div class="textcontent">
                    <h1>${meal.strMeal}</h1>
                    <strong>Method</strong>
                    <p class="para">${meal.strInstructions}</p>
                    <h1>Video Recipe</h1>
                    <iframe class="video" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                </div>
                

           
        `
    }
    
})
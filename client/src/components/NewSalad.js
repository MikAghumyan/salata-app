import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import IngredientCategory from "./IngredientCategory";
import Counter from "./Counter";
// import { ChevronLeft } from "./Icons";

const query = gql`
  query RootQueryType {
    ingredients {
      name
      id
      category {
        id
        category
      }
    }
  }
`;

const NewSalad = (props) => {
  const { loading, error, data } = useQuery(query);
  const [categories, setCategories] = useState();
  const [categoryElems, setCategoryElems] = useState([]);

  useEffect(() => {
    if (data) {
      const categoryToIngredients = {};
      data.ingredients.forEach((ingredient) => {
        if (categoryToIngredients[ingredient.category.category]) {
          categoryToIngredients[ingredient.category.category].push(ingredient);
        } else {
          categoryToIngredients[ingredient.category.category] = [];
          categoryToIngredients[ingredient.category.category].push(ingredient);
        }
      });

      setCategories(categoryToIngredients);
    }
  }, [data]);

  useEffect(() => {
    if (categories) {
      const catElems = [];

      for (const [key, value] of Object.entries(categories)) {
        catElems.push({
          name: key,
          uid: props.uid + key,
          ingredients: value,
        });
      }

      setCategoryElems(catElems);
    }
  }, [categories]);

  if (loading) return "LOADING...";
  if (error) return `Error! ${error.message}`;
  return (
    <div className="order block p-4">
      <div className="flex flex-row" onClick={() => props.selectItem()}>
        <div className="flex-grow">
          <span className="font-extrabold font-DMSans text-xl align-middle py-3 text-primary">
            Salad{" "}
          </span>
          <Counter
            quantity={props.item.quantity}
            setQuantity={(x) => {
              props.updateQuantity(x);
            }}
          />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            props.removeItem();
          }}
          className="flex-none flex justify-end"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-red-500 align-middle active:text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div
        className={`transition-opacity duration-1000 ${
          props.showContent ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        {categoryElems.map(({ name, key, uid, ingredients }, catId) => {
          return (
            <IngredientCategory
              name={name}
              key={uid}
              uid={uid}
              ingredients={ingredients}
              checkedIngredients={props.item.ingredients}
              number={catId}
              addIngredient={(id) => props.addIngredient(id)}
              removeIngredient={(id) => props.removeIngredient(id)}
            />
          );
        })}

        <div className="mt-10">
          <textarea
            placeholder="Extra Info"
            className="placeholder-primary-imgBg w-full px-3 py-2 border-primary-extraInfo font-DMSans rounded-3xl border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-lighten focus:border-transparent"
            rows="4"
            onChange={(e) => props.setExtraInfo(e.target.value)}
            value={props.item.extraInfo}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default NewSalad;

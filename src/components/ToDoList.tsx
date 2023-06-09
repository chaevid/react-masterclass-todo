import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  toDoState,
  categoryState,
  toDoSelector,
  selectedCategoryState,
} from '../atoms';
import CreateCategory from './CreateCategory';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const category = useRecoilValue(categoryState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const selectedCategory = category.filter(
      (c) => c.id === Number(event.currentTarget.value)
    );
    setSelectedCategory({
      id: Number(event.currentTarget.value),
      text: selectedCategory[0].text,
    });
  };

  const loadToDos = () => {
    const toDos = localStorage.getItem('TODO_LS');
    if (toDos) {
      const parsedToDos = JSON.parse(toDos);
      setToDos([...parsedToDos]);
    }
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <div>
      <h1>Create to do</h1>
      <CreateToDo />
      <hr />
      <h1>Create category</h1>
      <CreateCategory />
      <hr />
      <select
        value={selectedCategory.id}
        onInput={onInput}>
        <option value="">Select Categories</option>
        {category?.map((category) => (
          <option
            key={category.id}
            value={category.id}>
            {category.text}
          </option>
        ))}
      </select>
      <h1>List - {selectedCategory.text}</h1>
      {toDos?.map((toDo) => (
        <ToDo
          key={toDo.id}
          {...toDo}
        />
      ))}
    </div>
  );
}

export default ToDoList;

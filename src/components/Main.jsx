import React, { useState } from 'react';
import ItemList from './ItemList';
import ItemClass from './ItemClass';
import { nanoid } from 'nanoid';

export default function Main() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ content: '' });

  const ID = nanoid();


  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = new ItemClass(ID, form.content);
    setItems((prevItems) => [...prevItems, newItem]);
    setForm({ content: '' });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, content: value }));
  };

  const loadActualItems = () => {
    fetch(`${env.REACT_APP_API_URL}`)
      .then((response) => response.json())
      .then((arr) =>
        arr.map((el) => setItems((prevItems) => [...prevItems, el]))
      );
  };

  const loadItems = () => {
    console.log(env.REACT_APP_API_URL);
    fetch(`${env.REACT_APP_API_URL}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then((response) => response.json())
      .then((arr) =>
        arr.map((el) => setItems((prevItems) => [...prevItems, el]))
      );
  };

  const handleDelete = (id) => {
    fetch(`${env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then((body) => {
        let urlId = body.url.split('/');
        return urlId[urlId.length - 1];
      })
      .catch((err) => console.log(`Err ${err}`))
      .then((id) =>
        setItems((prevItems) => prevItems.filter((o) => o.id !== id))
      );
  };

  return (
    <div onLoad={loadItems}>
      <div className="notes-header">
        <h1>Notes</h1>
        <button type="button" onClick={loadActualItems} className="btn-update">
          Обновить
        </button>
      </div>
      <h3>New Note</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="notes-new">
          <textarea
            value={form.content}
            onChange={handleChange}
            rows="5"
            cols="50"
          />
          <button className="btn-send">Добавить</button>
        </div>
      </form>

      <div className="notes-list">
        <ItemList items={items} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

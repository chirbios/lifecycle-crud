import React from 'react';

export default function ItemList({ items, handleDelete }) {
  return items.map((item) => (
    <div className="note-container" key={item.id}>
      <button className="btn-close" onClick={() => handleDelete(item.id)}>
        X
      </button>
      <div className="content">{item.content}</div>
    </div>
  ));
}

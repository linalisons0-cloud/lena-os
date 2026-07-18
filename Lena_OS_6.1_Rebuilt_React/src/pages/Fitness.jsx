import {useState} from 'react';
import Card from '../components/Card.jsx';
import {load,save,todayKey} from '../storage.js';

const templates = ['Ягодицы А','Верх тела','Ягодицы Б'];

export default function Fitness(){
  const [items,setItems]=useState(load('workouts',[]));
  const [title,setTitle]=useState(templates[0]);
  const [note,setNote]=useState('');
  const add=()=>{
    const next=[{id:Date.now(),date:todayKey(),title,note},...items];
    setItems(next);save('workouts',next);setNote('');
  };
  return <main>
    <Card className="hero"><p className="eyebrow">ФИТНЕС</p><h1>Тренировки 💪</h1><p>Три тренировки в неделю: две на ягодицы и одна на верх.</p></Card>
    <Card title="Новая тренировка">
      <select value={title} onChange={e=>setTitle(e.target.value)}>{templates.map(x=><option key={x}>{x}</option>)}</select>
      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Вес, повторы, самочувствие"/>
      <button className="primary" onClick={add}>Сохранить тренировку</button>
    </Card>
    <Card title="Журнал">
      {items.length?items.map(x=><div className="entry" key={x.id}><b>{x.title}</b><span>{x.date}<br/>{x.note}</span></div>):<p className="muted">Тренировок пока нет.</p>}
    </Card>
  </main>
}

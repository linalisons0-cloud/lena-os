import {useState} from 'react';
import Card from '../components/Card.jsx';
import {load,save,todayKey} from '../storage.js';

export default function Health(){
  const [items,setItems]=useState(load('health-log',[]));
  const [symptom,setSymptom]=useState('');
  const [mood,setMood]=useState(3);
  const add=()=>{
    if(!symptom)return;
    const next=[{id:Date.now(),date:todayKey(),symptom,mood},...items];
    setItems(next);save('health-log',next);setSymptom('');
  };
  return <main>
    <Card className="hero"><p className="eyebrow">ЗДОРОВЬЕ</p><h1>Самочувствие 🩺</h1><p>Симптомы, настроение и наблюдения по дням.</p></Card>
    <Card title="Новая запись">
      <textarea value={symptom} onChange={e=>setSymptom(e.target.value)} placeholder="Что беспокоит или что изменилось?"/>
      <label>Настроение
        <select value={mood} onChange={e=>setMood(+e.target.value)}>
          <option value="1">😞</option><option value="2">😕</option><option value="3">😐</option><option value="4">🙂</option><option value="5">🥰</option>
        </select>
      </label>
      <button className="primary" onClick={add}>Сохранить</button>
    </Card>
    <Card title="История">{items.length?items.map(x=><div className="entry" key={x.id}><b>{['','😞','😕','😐','🙂','🥰'][x.mood]} · {x.date}</b><span>{x.symptom}</span></div>):<p className="muted">Записей пока нет.</p>}</Card>
  </main>
}

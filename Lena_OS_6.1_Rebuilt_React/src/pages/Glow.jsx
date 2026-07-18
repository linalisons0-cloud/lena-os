import {useState} from 'react';
import Card from '../components/Card.jsx';
import {load,save,todayKey} from '../storage.js';

export default function Glow(){
  const [tab,setTab]=useState('skin');
  const [progress,setProgress]=useState(load('progress',[]));
  const [skin,setSkin]=useState(load('skin-log',[]));
  const [entry,setEntry]=useState({weight:'',waist:'',glutes:'',note:''});
  const [skinNote,setSkinNote]=useState('');

  const addProgress=()=>{
    if(!entry.weight && !entry.waist && !entry.glutes)return;
    const next=[{id:Date.now(),date:todayKey(),...entry},...progress];
    setProgress(next);save('progress',next);setEntry({weight:'',waist:'',glutes:'',note:''});
  };
  const addSkin=()=>{
    if(!skinNote)return;
    const next=[{id:Date.now(),date:todayKey(),note:skinNote},...skin];
    setSkin(next);save('skin-log',next);setSkinNote('');
  };

  return <main>
    <Card className="hero"><p className="eyebrow">GLOW UP</p><h1>Уход и прогресс ✨</h1><p>Кожа, волосы, замеры и заметки в одном месте.</p></Card>
    <div className="tabs">
      <button className={tab==='skin'?'active':''} onClick={()=>setTab('skin')}>Кожа</button>
      <button className={tab==='progress'?'active':''} onClick={()=>setTab('progress')}>Замеры</button>
    </div>
    {tab==='skin' && <>
      <Card title="Дневник кожи">
        <textarea value={skinNote} onChange={e=>setSkinNote(e.target.value)} placeholder="Как сегодня чувствует себя кожа?" />
        <button className="primary" onClick={addSkin}>Сохранить</button>
      </Card>
      <Card title="История">{skin.length?skin.map(x=><div className="entry" key={x.id}><b>{x.date}</b><span>{x.note}</span></div>):<p className="muted">Записей пока нет.</p>}</Card>
    </>}
    {tab==='progress' && <>
      <Card title="Новая запись">
        <div className="grid3">
          <input placeholder="Вес" value={entry.weight} onChange={e=>setEntry({...entry,weight:e.target.value})}/>
          <input placeholder="Талия" value={entry.waist} onChange={e=>setEntry({...entry,waist:e.target.value})}/>
          <input placeholder="Ягодицы" value={entry.glutes} onChange={e=>setEntry({...entry,glutes:e.target.value})}/>
        </div>
        <textarea placeholder="Заметка" value={entry.note} onChange={e=>setEntry({...entry,note:e.target.value})}/>
        <button className="primary" onClick={addProgress}>Сохранить</button>
      </Card>
      <Card title="История">{progress.length?progress.map(x=><div className="entry" key={x.id}><b>{x.date}</b><span>Вес {x.weight||'—'} · Талия {x.waist||'—'} · Ягодицы {x.glutes||'—'}<br/>{x.note}</span></div>):<p className="muted">Замеров пока нет.</p>}</Card>
    </>}
  </main>
}

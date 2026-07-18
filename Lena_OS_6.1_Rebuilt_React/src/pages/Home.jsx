import Card from '../components/Card.jsx';
import {load,save,todayKey} from '../storage.js';

const habits = [
  ['skin','Утренний уход','кожа'],
  ['spf','SPF','защита'],
  ['creatine','Креатин','фитнес'],
  ['water','Вода','здоровье'],
  ['reading','Почитать сегодня','чтение'],
  ['pmcare','Вечерний уход','кожа'],
  ['noAlcohol','День без алкоголя','важно']
];

export default function Home({refresh,setRefresh,setPage}) {
  const key='habits-'+todayKey();
  const state=load(key,{});
  const done=habits.filter(([id])=>state[id]).length;
  const score=Math.round(done/habits.length*100);
  const toggle=(id)=>{save(key,{...state,[id]:!state[id]});setRefresh(refresh+1)};
  const weights=load('progress',[]);
  const workouts=load('workouts',[]);
  const lastWeight=weights[0]?.weight ?? '—';
  const weekAgo=Date.now()-7*86400000;
  const weekWorkouts=workouts.filter(x=>new Date(x.date).getTime()>=weekAgo).length;

  return <main>
    <div className="topbar">
      <div><b>Lena OS</b><small>твоя личная система</small></div>
      <span>{new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long'})}</span>
    </div>

    <Card className="hero">
      <h1>Добрый день,<br/>Лена 🤍</h1>
      <p>Сегодня не нужно делать всё. Достаточно сделать главное и сохранить заботу о себе.</p>
      <div className="heroStats">
        <div className="score"><strong>{score}%</strong><span>Glow Up</span></div>
        <div className="streak"><strong>{done ? '1 день' : '0 дней'}</strong><span>твоя текущая серия</span></div>
      </div>
    </Card>

    <div className="grid2">
      <div className="metric"><span>Последний вес</span><strong>{lastWeight}</strong><small>{lastWeight==='—'?'нет данных':'кг'}</small></div>
      <div className="metric"><span>Тренировок за неделю</span><strong>{weekWorkouts}</strong><small>цель: 3</small></div>
    </div>

    <Card title="Сегодня">
      <div className="tasks">
        {habits.map(([id,title,tag])=><label className="task" key={id}>
          <input type="checkbox" checked={!!state[id]} onChange={()=>toggle(id)} />
          <span>{title}</span><small>{tag}</small>
        </label>)}
      </div>
    </Card>

    <Card title="Лена AI">
      <p className="insight">{score<30
        ? 'Начни с воды и одной лёгкой галочки. Возвращение в ритм важнее идеального дня.'
        : score<75
        ? 'Ты уже начала. Следующий лучший шаг — закрыть одну маленькую задачу.'
        : 'Базовый план почти выполнен. Не добавляй нагрузку только ради идеальности.'}</p>
      <button className="soft" onClick={()=>setPage('life')}>Открыть помощника</button>
    </Card>
  </main>
}

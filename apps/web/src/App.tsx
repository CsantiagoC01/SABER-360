import { useMemo, useState, type FormEvent } from 'react';

type Student = { id: number; name: string; code: string; grade: string; status: 'Activo' | 'Pendiente'; initials: string; color: string };

const initialStudents: Student[] = [
  { id: 1, name: 'Sofía Martínez', code: 'EST-2025-001', grade: '9° A', status: 'Activo', initials: 'SM', color: 'lilac' },
  { id: 2, name: 'Mateo Rodríguez', code: 'EST-2025-002', grade: '8° B', status: 'Activo', initials: 'MR', color: 'mint' },
  { id: 3, name: 'Valentina López', code: 'EST-2025-003', grade: '10° A', status: 'Pendiente', initials: 'VL', color: 'peach' },
  { id: 4, name: 'Daniel García', code: 'EST-2025-004', grade: '7° C', status: 'Activo', initials: 'DG', color: 'blue' },
];

const menu = [
  { label: 'Inicio', icon: '⌂' },
  { label: 'Estudiantes', icon: '♙' },
  { label: 'Personal', icon: '♧' },
  { label: 'Académico', icon: '▤' },
  { label: 'Asistencia', icon: '◷' },
  { label: 'Calificaciones', icon: '▧' },
  { label: 'Reportes', icon: '▥' },
];

function App() {
  const [active, setActive] = useState('Inicio');
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredStudents = useMemo(() => students.filter((student) =>
    `${student.name} ${student.code} ${student.grade}`.toLowerCase().includes(search.toLowerCase()),
  ), [students, search]);

  function addStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name')).trim();
    const grade = String(form.get('grade')).trim();
    if (!name || !grade) return;
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    setStudents((current) => [{
      id: Date.now(), name, grade, initials,
      code: `EST-${new Date().getFullYear()}-${String(current.length + 1).padStart(3, '0')}`,
      status: 'Activo', color: 'blue',
    }, ...current]);
    setShowForm(false);
    event.currentTarget.reset();
  }

  return (
    <div className="app-shell">
      {mobileMenu && <button className="mobile-scrim" aria-label="Cerrar menú" onClick={() => setMobileMenu(false)} />}
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#inicio" onClick={() => setActive('Inicio')}>
          <span className="brand-mark">S</span><span>SABER<span className="brand-light">-360</span><small>GESTIÓN ESCOLAR</small></span>
        </a>
        <div className="school-switch"><span className="school-icon">✳</span><span><b>Instituto Horizonte</b><small>Campus principal</small></span><span className="chevron">⌄</span></div>
        <p className="nav-caption">MENÚ PRINCIPAL</p>
        <nav className="main-nav" aria-label="Navegación principal">
          {menu.map((item) => <button key={item.label} className={`nav-item ${active === item.label ? 'nav-active' : ''}`} onClick={() => { setActive(item.label); setMobileMenu(false); }}><span className="nav-icon">{item.icon}</span>{item.label}{item.label === 'Personal' && <span className="nav-badge">2</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-spark">✦</span><b>¿Necesitas ayuda?</b><p>Consulta la guía de SABER-360.</p><button onClick={() => window.alert('La guía de ayuda estará disponible próximamente.')}>Ver guía <span>→</span></button></div>
          <button className="profile"><span className="avatar admin-avatar">AC</span><span><b>Andrea Castillo</b><small>Administradora</small></span><span className="profile-more">···</span></button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu-button" aria-label="Abrir menú" onClick={() => setMobileMenu(true)}>☰</button>
          <div className="breadcrumbs">Instituto Horizonte <span>/</span> <b>{active}</b></div>
          <div className="top-actions"><span className="today-label">Jueves, 6 de noviembre</span><button className="icon-button" aria-label="Notificaciones" onClick={() => window.alert('No tienes notificaciones nuevas.')}>♧<i /></button><span className="avatar top-avatar">AC</span></div>
        </header>

        {active === 'Inicio' ? <div className="page-content">
          <section className="welcome-row"><div><p className="eyebrow">PANEL GENERAL <span className="live-dot" /> EN VIVO</p><h1>¡Hola, Andrea! <span className="wave">✦</span></h1><p className="welcome-copy">Aquí tienes el resumen de lo que sucede hoy en tu institución.</p></div><button className="date-filter" onClick={() => window.alert('Selector de periodo: próximamente')}>▦ <span>Periodo actual</span>⌄</button></section>

          <section className="stats-grid" aria-label="Resumen escolar">
            <article className="stat-card"><div className="stat-top"><span>Total de estudiantes</span><span className="stat-icon stat-purple">♙</span></div><strong>1,248</strong><div className="stat-foot"><span className="trend-up">↗ 8.2%</span><span>vs. periodo anterior</span><span className="sparkline purple-line">⌁</span></div></article>
            <article className="stat-card"><div className="stat-top"><span>Personal docente</span><span className="stat-icon stat-green">♧</span></div><strong>86</strong><div className="stat-foot"><span className="trend-up">↗ 2.4%</span><span>vs. periodo anterior</span><span className="sparkline green-line">⌁</span></div></article>
            <article className="stat-card"><div className="stat-top"><span>Personal no docente</span><span className="stat-icon stat-orange">♧</span></div><strong>24</strong><div className="stat-foot"><span className="trend-neutral">— 0%</span><span>vs. periodo anterior</span><span className="sparkline orange-line">⌁</span></div></article>
            <article className="stat-card"><div className="stat-top"><span>Asistencia de hoy</span><span className="stat-icon stat-blue">◷</span></div><strong>94.8<span className="percent">%</span></strong><div className="stat-foot"><span className="trend-up">↗ 1.6%</span><span>vs. semana pasada</span><span className="sparkline blue-line">⌁</span></div></article>
          </section>

          <section className="content-grid">
            <article className="panel attendance-panel"><div className="panel-heading"><div><h2>Asistencia escolar</h2><p>Resumen semanal de asistencia</p></div><button className="more-button" aria-label="Más opciones">···</button></div><div className="chart-legend"><span><i className="legend-dot present" /> Presentes</span><span><i className="legend-dot absent" /> Ausentes</span></div><div className="chart"><div className="y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-body"><div className="grid-lines"><i /><i /><i /><i /><i /></div><div className="bar-groups">{[{ d: 'Lun', p: 78, a: 12 }, { d: 'Mar', p: 86, a: 9 }, { d: 'Mié', p: 72, a: 16 }, { d: 'Jue', p: 91, a: 6 }, { d: 'Vie', p: 0, a: 0 }].map((day) => <div className="bar-group" key={day.d}><div className="bars"><span className="bar present-bar" style={{ height: `${day.p}%` }} /><span className="bar absent-bar" style={{ height: `${day.a}%` }} /></div><small>{day.d}</small></div>)}</div></div></div></article>

            <article className="panel events-panel"><div className="panel-heading"><div><h2>Próximos eventos</h2><p>Lo que viene en la institución</p></div><button className="text-action" onClick={() => setActive('Académico')}>Ver calendario <span>→</span></button></div><div className="event-list"><div className="event"><div className="event-date"><b>08</b><small>NOV</small></div><div className="event-info"><b>Feria de ciencias</b><span>Auditorio principal · 9:00 AM</span></div><span className="event-dot purple-event" /></div><div className="event"><div className="event-date"><b>12</b><small>NOV</small></div><div className="event-info"><b>Reunión de familias</b><span>Salones · 3:30 PM</span></div><span className="event-dot green-event" /></div><div className="event"><div className="event-date"><b>15</b><small>NOV</small></div><div className="event-info"><b>Jornada deportiva</b><span>Cancha central · 8:00 AM</span></div><span className="event-dot orange-event" /></div></div><button className="calendar-link" onClick={() => setActive('Académico')}>Ver todos los eventos <span>→</span></button></article>
          </section>

          <section className="panel students-panel"><div className="panel-heading student-heading"><div><h2>Estudiantes recientes</h2><p>Registros de estudiantes de la institución</p></div><div className="table-actions"><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar estudiante..." aria-label="Buscar estudiante" /></label><button className="primary-button" onClick={() => setShowForm(true)}><span>＋</span> Nuevo estudiante</button></div></div><div className="table-wrap"><table><thead><tr><th>ESTUDIANTE</th><th>CÓDIGO</th><th>GRADO / GRUPO</th><th>ESTADO</th><th aria-label="Acciones" /></tr></thead><tbody>{filteredStudents.length ? filteredStudents.map((student) => <tr key={student.id}><td><div className="student-cell"><span className={`avatar student-avatar ${student.color}`}>{student.initials}</span><b>{student.name}</b></div></td><td className="code-cell">{student.code}</td><td>{student.grade}</td><td><span className={`status ${student.status === 'Activo' ? 'status-active' : 'status-pending'}`}><i />{student.status}</span></td><td><button className="row-more" aria-label={`Opciones de ${student.name}`}>···</button></td></tr>) : <tr><td className="empty-row" colSpan={5}>No se encontraron estudiantes.</td></tr>}</tbody></table></div><button className="view-all" onClick={() => setActive('Estudiantes')}>Ver todos los estudiantes <span>→</span></button></section>
          <footer className="page-footer"><span>© 2025 SABER-360</span><span>Construido para aprender y crecer <b>✦</b></span></footer>
        </div> : <section className="module-placeholder"><div className="placeholder-icon">{menu.find((item) => item.label === active)?.icon ?? '▤'}</div><p className="eyebrow">MÓDULO SABER-360</p><h1>{active}</h1><p>Este módulo forma parte de la estructura del proyecto y está listo para planificarse. Su implementación se realizará de forma independiente para mantener la plataforma modular.</p><button className="primary-button" onClick={() => setActive('Inicio')}>← Volver al inicio</button></section>}
      </main>

      {showForm && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" aria-label="Cerrar" onClick={() => setShowForm(false)}>×</button><p className="eyebrow">REGISTRO ESCOLAR</p><h2 id="modal-title">Nuevo estudiante</h2><p className="modal-copy">Agrega un registro de demostración a la lista local.</p><form onSubmit={addStudent}><label>Nombre completo<input name="name" placeholder="Ej. Camila Pérez" required autoFocus /></label><label>Grado / grupo<input name="grade" placeholder="Ej. 8° A" required /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancelar</button><button type="submit" className="primary-button">Guardar estudiante</button></div></form></section></div>}
    </div>
  );
}

export default App;

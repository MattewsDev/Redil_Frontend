export type Persona = {
  id: string
  nombre: string
  documento: string
  telefono: string
  email: string
  estado: 'Activo' | 'Inactivo' | 'Nuevo'
  tipo: 'Miembro' | 'Visitante' | 'Líder'
  ministerio?: string
  ciudad: string
  ingreso: string
}

export const personas: Persona[] = [
  { id: 'p1', nombre: 'María González', documento: '1.024.556.778', telefono: '+57 311 245 6677', email: 'maria.gonzalez@email.com', estado: 'Activo', tipo: 'Miembro', ministerio: 'Alabanza', ciudad: 'Bogotá', ingreso: '2021-03-12' },
  { id: 'p2', nombre: 'Carlos Ramírez', documento: '79.556.221', telefono: '+57 320 778 1190', email: 'carlos.ramirez@email.com', estado: 'Activo', tipo: 'Líder', ministerio: 'Jóvenes', ciudad: 'Medellín', ingreso: '2019-08-04' },
  { id: 'p3', nombre: 'Laura Martínez', documento: '1.110.998.221', telefono: '+57 315 442 0091', email: 'laura.martinez@email.com', estado: 'Nuevo', tipo: 'Visitante', ciudad: 'Cali', ingreso: '2024-05-30' },
  { id: 'p4', nombre: 'Andrés Quintero', documento: '80.221.443', telefono: '+57 301 556 7788', email: 'andres.q@email.com', estado: 'Activo', tipo: 'Miembro', ministerio: 'Hombres', ciudad: 'Bogotá', ingreso: '2020-01-19' },
  { id: 'p5', nombre: 'Diana Lozano', documento: '1.032.778.554', telefono: '+57 318 220 4451', email: 'diana.lozano@email.com', estado: 'Activo', tipo: 'Miembro', ministerio: 'Damas', ciudad: 'Barranquilla', ingreso: '2022-11-02' },
  { id: 'p6', nombre: 'Julián Torres', documento: '94.556.118', telefono: '+57 312 990 1187', email: 'julian.torres@email.com', estado: 'Inactivo', tipo: 'Miembro', ciudad: 'Pereira', ingreso: '2018-06-21' },
  { id: 'p7', nombre: 'Sofía Herrera', documento: '1.020.331.667', telefono: '+57 304 118 2230', email: 'sofia.herrera@email.com', estado: 'Nuevo', tipo: 'Visitante', ciudad: 'Bogotá', ingreso: '2024-06-01' },
  { id: 'p8', nombre: 'Mateo Rincón', documento: '1.144.556.090', telefono: '+57 317 663 0098', email: 'mateo.rincon@email.com', estado: 'Activo', tipo: 'Líder', ministerio: 'Niños', ciudad: 'Medellín', ingreso: '2017-02-14' },
  { id: 'p9', nombre: 'Valentina Cruz', documento: '1.026.118.332', telefono: '+57 313 552 6610', email: 'valen.cruz@email.com', estado: 'Activo', tipo: 'Miembro', ministerio: 'Alabanza', ciudad: 'Cali', ingreso: '2023-09-09' },
  { id: 'p10', nombre: 'Felipe Castaño', documento: '71.998.225', telefono: '+57 300 441 7789', email: 'felipe.castano@email.com', estado: 'Activo', tipo: 'Miembro', ministerio: 'Multimedia', ciudad: 'Bogotá', ingreso: '2021-07-28' },
]

export type Ministerio = {
  id: string
  nombre: string
  lider: string
  participantes: number
  estado: 'Activo' | 'En pausa'
  descripcion: string
}

export const ministerios: Ministerio[] = [
  { id: 'm1', nombre: 'Alabanza y Adoración', lider: 'María González', participantes: 24, estado: 'Activo', descripcion: 'Equipo de música y producción de los servicios.' },
  { id: 'm2', nombre: 'Ministerio de Jóvenes', lider: 'Carlos Ramírez', participantes: 86, estado: 'Activo', descripcion: 'Reuniones y discipulado para edades de 13 a 25.' },
  { id: 'm3', nombre: 'Escuela de Niños', lider: 'Mateo Rincón', participantes: 42, estado: 'Activo', descripcion: 'Formación bíblica para niños de 3 a 12 años.' },
  { id: 'm4', nombre: 'Ministerio de Damas', lider: 'Diana Lozano', participantes: 58, estado: 'Activo', descripcion: 'Encuentros y crecimiento espiritual para mujeres.' },
  { id: 'm5', nombre: 'Multimedia y Streaming', lider: 'Felipe Castaño', participantes: 12, estado: 'Activo', descripcion: 'Transmisión, cámaras y redes sociales.' },
  { id: 'm6', nombre: 'Ministerio de Hombres', lider: 'Andrés Quintero', participantes: 37, estado: 'En pausa', descripcion: 'Comunidad y mentoría para hombres.' },
]

export type Evento = {
  id: string
  titulo: string
  fecha: string
  hora: string
  lugar: string
  tipo: 'Servicio' | 'Conferencia' | 'Retiro' | 'Reunión' | 'Especial'
  estado: 'Programado' | 'En curso' | 'Finalizado' | 'Cancelado'
  registrados: number
  capacidad: number
  conTicket: boolean
  requiereRegistro: boolean
  day: number
}

export const eventos: Evento[] = [
  { id: 'e1', titulo: 'Servicio Dominical', fecha: '2026-06-07', hora: '09:00', lugar: 'Auditorio principal', tipo: 'Servicio', estado: 'Programado', registrados: 540, capacidad: 800, conTicket: false, requiereRegistro: false, day: 7 },
  { id: 'e2', titulo: 'Noche de Jóvenes', fecha: '2026-06-13', hora: '19:00', lugar: 'Salón juvenil', tipo: 'Reunión', estado: 'Programado', registrados: 120, capacidad: 150, conTicket: false, requiereRegistro: false, day: 13 },
  { id: 'e3', titulo: 'Conferencia de Avivamiento', fecha: '2026-06-20', hora: '18:30', lugar: 'Auditorio principal', tipo: 'Conferencia', estado: 'Programado', registrados: 612, capacidad: 800, conTicket: true, requiereRegistro: true, day: 20 },
  { id: 'e4', titulo: 'Retiro de Matrimonios', fecha: '2026-06-27', hora: '08:00', lugar: 'Centro de retiros', tipo: 'Retiro', estado: 'Programado', registrados: 64, capacidad: 80, conTicket: true, requiereRegistro: true, day: 27 },
  { id: 'e5', titulo: 'Bautizos', fecha: '2026-06-22', hora: '10:00', lugar: 'Auditorio principal', tipo: 'Especial', estado: 'Programado', registrados: 28, capacidad: 50, conTicket: false, requiereRegistro: false, day: 22 },
  { id: 'e6', titulo: 'Reunión de Líderes', fecha: '2026-06-04', hora: '19:30', lugar: 'Sala de juntas', tipo: 'Reunión', estado: 'Finalizado', registrados: 32, capacidad: 40, conTicket: false, day: 4 },
]

export type UsuarioSistema = {
  id: string
  nombre: string
  email: string
  rol: 'Admin Iglesia' | 'Pastor' | 'Líder' | 'Registrador' | 'Scanner' | 'Consulta'
  estado: 'Activo' | 'Invitado' | 'Suspendido'
  ultimoAcceso: string
}

export const usuarios: UsuarioSistema[] = [
  { id: 'u1', nombre: 'Pastor David Mejía', email: 'david.mejia@redil.app', rol: 'Admin Iglesia', estado: 'Activo', ultimoAcceso: 'Hace 5 min' },
  { id: 'u2', nombre: 'Carolina Pardo', email: 'carolina.pardo@redil.app', rol: 'Pastor', estado: 'Activo', ultimoAcceso: 'Hace 2 horas' },
  { id: 'u3', nombre: 'Carlos Ramírez', email: 'carlos.ramirez@redil.app', rol: 'Líder', estado: 'Activo', ultimoAcceso: 'Ayer' },
  { id: 'u4', nombre: 'Ana Beltrán', email: 'ana.beltran@redil.app', rol: 'Registrador', estado: 'Activo', ultimoAcceso: 'Hace 1 día' },
  { id: 'u5', nombre: 'Jorge Niño', email: 'jorge.nino@redil.app', rol: 'Scanner', estado: 'Invitado', ultimoAcceso: 'Pendiente' },
  { id: 'u6', nombre: 'Lucía Vargas', email: 'lucia.vargas@redil.app', rol: 'Consulta', estado: 'Suspendido', ultimoAcceso: 'Hace 3 semanas' },
]

export const roles = [
  { nombre: 'Admin Iglesia', descripcion: 'Acceso total a la configuración y los datos.', usuarios: 1, color: 'default' },
  { nombre: 'Pastor', descripcion: 'Gestión pastoral, personas y reportes.', usuarios: 2, color: 'success' },
  { nombre: 'Líder', descripcion: 'Administra su ministerio y participantes.', usuarios: 8, color: 'cream' },
  { nombre: 'Registrador', descripcion: 'Crea personas y registra asistencia.', usuarios: 5, color: 'secondary' },
  { nombre: 'Scanner', descripcion: 'Solo escaneo de QR en eventos.', usuarios: 4, color: 'muted' },
  { nombre: 'Consulta', descripcion: 'Acceso de solo lectura.', usuarios: 3, color: 'muted' },
] as const

export const permisos = [
  { modulo: 'Personas', acciones: ['Ver', 'Crear', 'Editar', 'Eliminar'] },
  { modulo: 'Ministerios', acciones: ['Ver', 'Crear', 'Editar'] },
  { modulo: 'Eventos', acciones: ['Ver', 'Crear', 'Editar', 'Eliminar'] },
  { modulo: 'Asistencia', acciones: ['Ver', 'Registrar', 'Escanear'] },
  { modulo: 'Reportes', acciones: ['Ver', 'Exportar'] },
  { modulo: 'Configuración', acciones: ['Ver', 'Editar'] },
]

export const asistenciaTrend = [
  { mes: 'Ene', asistencia: 1240, miembros: 980 },
  { mes: 'Feb', asistencia: 1310, miembros: 1010 },
  { mes: 'Mar', asistencia: 1280, miembros: 1040 },
  { mes: 'Abr', asistencia: 1420, miembros: 1095 },
  { mes: 'May', asistencia: 1510, miembros: 1140 },
  { mes: 'Jun', asistencia: 1648, miembros: 1192 },
]

export const nuevosMiembros = [
  { mes: 'Ene', valor: 24 },
  { mes: 'Feb', valor: 31 },
  { mes: 'Mar', valor: 28 },
  { mes: 'Abr', valor: 44 },
  { mes: 'May', valor: 39 },
  { mes: 'Jun', valor: 52 },
]

export const distribucionTipo = [
  { nombre: 'Miembros', valor: 1192, color: 'var(--chart-1)' },
  { nombre: 'Visitantes', valor: 318, color: 'var(--chart-2)' },
  { nombre: 'Líderes', valor: 138, color: 'var(--chart-3)' },
]

export type Actividad = {
  id: string
  tipo: 'persona' | 'checkin' | 'evento' | 'invitacion'
  titulo: string
  detalle: string
  tiempo: string
}

export const actividadReciente: Actividad[] = [
  { id: 'a1', tipo: 'persona', titulo: 'Sofía Herrera se registró', detalle: 'Nueva visitante · Servicio Dominical', tiempo: 'Hace 12 min' },
  { id: 'a2', tipo: 'checkin', titulo: '128 check-ins registrados', detalle: 'Noche de Jóvenes', tiempo: 'Hace 40 min' },
  { id: 'a3', tipo: 'evento', titulo: 'Conferencia de Avivamiento creada', detalle: 'Por Carolina Pardo', tiempo: 'Hace 2 horas' },
  { id: 'a4', tipo: 'invitacion', titulo: 'Invitación enviada a Jorge Niño', detalle: 'Rol: Scanner', tiempo: 'Hace 3 horas' },
  { id: 'a5', tipo: 'persona', titulo: 'Mateo Rincón actualizó su perfil', detalle: 'Ministerio de Niños', tiempo: 'Ayer' },
]

export const kpis = [
  { label: 'Personas registradas', valor: '1.648', delta: '+8.2%', positivo: true },
  { label: 'Miembros activos', valor: '1.192', delta: '+4.1%', positivo: true },
  { label: 'Visitantes recientes', valor: '318', delta: '+12.6%', positivo: true },
  { label: 'Eventos activos', valor: '6', delta: '+2', positivo: true },
  { label: 'Asistencia del mes', valor: '5.940', delta: '+6.8%', positivo: true },
  { label: 'Usuarios activos', valor: '23', delta: '-1', positivo: false },
]

export const planes = [
  { nombre: 'Free', precio: '$0', periodo: '/mes', descripcion: 'Para iglesias pequeñas que inician.', limite: 'Hasta 100 personas', features: ['1 usuario', 'Personas y visitantes', 'Asistencia manual', 'Soporte por comunidad'], destacado: false },
  { nombre: 'Starter', precio: '$29', periodo: '/mes', descripcion: 'Crece con herramientas esenciales.', limite: 'Hasta 500 personas', features: ['5 usuarios', 'Eventos y QR', 'Ministerios', 'Reportes básicos'], destacado: false },
  { nombre: 'Church', precio: '$79', periodo: '/mes', descripcion: 'La opción más popular para congregaciones.', limite: 'Hasta 3.000 personas', features: ['Usuarios ilimitados', 'Ticketing de eventos', 'Formularios públicos', 'Reportes avanzados', 'Soporte prioritario'], destacado: true },
  { nombre: 'Enterprise', precio: 'A medida', periodo: '', descripcion: 'Para redes y multisede.', limite: 'Personas ilimitadas', features: ['Multisede', 'API y webhooks', 'SSO', 'Gerente de cuenta'], destacado: false },
]

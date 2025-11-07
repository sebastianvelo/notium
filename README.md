[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/sebastianvelo/notium)

# Notium - Collaborative Note Taking  
  
Notium es una plataforma colaborativa de toma de notas que permite a los equipos organizar su trabajo dentro de espacios de trabajo compartidos.
  
## 🚀 Características Principales  
  
- **Workspaces Colaborativos**: Crea y gestiona espacios de trabajo compartidos con tu equipo
- **Notas Organizadas**: Crea, edita y organiza notas dentro de cada workspace 
- **Control de Acceso Basado en Roles**: Sistema RBAC con tres roles (owner, editor, viewer)
- **Autenticación OAuth**: Inicio de sesión con Google mediante Supabase Auth
- **Interfaz Moderna**: UI responsive con Tailwind CSS y modo oscuro
- **Internacionalización**: Soporte multiidioma (inglés y español)
  
## 🛠️ Stack Tecnológico  
  
### Frontend  
- **Next.js 14** - Framework React con App Router  
- **React 18** - Biblioteca de componentes UI  
- **TypeScript** - Desarrollo type-safe  
- **Tailwind CSS** - Estilos utility-first  
- **SWR** - Data fetching y caché [4](#0-3)   
  
### Backend  
- **Next.js API Routes** - Endpoints RESTful  
- **Supabase** - Base de datos PostgreSQL + autenticación  
- **Repository Pattern** - Abstracción de acceso a datos  
- **Service Layer** - Encapsulación de lógica de negocio
  
## 📦 Instalación  
  
```bash  
# Clonar el repositorio  [header-3](#header-3)
git clone https://github.com/sebastianvelo/notium.git  
  
# Instalar dependencias  [header-4](#header-4)
npm install  
  
# Configurar variables de entorno  [header-5](#header-5)
cp .env.example .env.local  
  
# Ejecutar en desarrollo  [header-6](#header-6)
npm run dev
```

## 🗄️ Configuración de Base de Datos
### El proyecto utiliza Supabase como base de datos. Ejecuta el script SQL de configuración: setup.sql:1-60

Ver supabase/setup.sql para el schema completo
Las tablas principales son:
```
users - Usuarios del sistema
workspaces - Espacios de trabajo
members - Relación usuarios-workspaces con roles
notes - Notas dentro de workspaces
note_shares - Compartir notas entre usuarios
pending_invitations - Invitaciones pendientes
```
## 🏗️ Arquitectura
### El proyecto sigue una arquitectura en capas:

Client Layer (Browser)  
    ↓  
API Layer (Next.js Routes)  
    ↓  
Service Layer (Business Logic)  
    ↓  
Repository Layer (Data Access)  
    ↓  
Data Layer (Supabase)  

## 📁 Estructura del Proyecto
```
notium/  
├── app/                    # Next.js App Router  
│   ├── api/               # API endpoints  
│   ├── workspaces/        # Páginas de workspaces  
│   └── login/             # Página de login  
├── components/            # Componentes React  
│   ├── layout/           # Componentes de layout  
│   ├── pages/            # Componentes específicos de página  
│   └── ui/               # Componentes UI reutilizables  
├── hooks/                # Custom React hooks  
│   ├── data/            # Hooks de data fetching  
│   └── controller/      # Hooks de controlador  
├── lib/                  # Lógica backend  
│   ├── service/         # Capa de servicios  
│   ├── repository/      # Capa de repositorios  
│   └── db/              # Clientes de base de datos  
└── types/               # Definiciones TypeScript  
```
  
## 🔑 Variables de Entorno  
  
```env  
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key  
🚦 Scripts Disponibles
npm run dev      # Servidor de desarrollo  
npm run build    # Build de producción  
npm run start    # Servidor de producción  
npm run lint     # Ejecutar linter
```
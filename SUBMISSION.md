# SUBMISSION.md - Notium  
  
# 📋 Instrucciones de Configuración  
  
### Prerrequisitos  
- Node.js 18+ y npm  
- Cuenta de Supabase (gratuita)  
  
### Pasos de Instalación  
  
1. **Clonar el repositorio**  
```bash  
git clone https://github.com/sebastianvelo/notium.git  
cd notium
```

2. **Instalar dependencias**  
```bash  
npm install
```

3. **Configurar Supabase**

a. Crear un proyecto en supabase.com

b. Ejecutar el script SQL de configuración ubicado en supabase/setup.sql setup.sql:1-88

Este script crea las tablas necesarias:

```
users - Usuarios del sistema
workspaces - Espacios de trabajo
members - Relación usuarios-workspaces con roles RBAC
notes - Notas dentro de workspaces
note_shares - Compartir notas entre usuarios
pending_invitations - Invitaciones para usuarios no registrados setup.sql:4-62
```

4. **Configurar variables de entorno**

Crear archivo .env.local en la raíz del proyecto:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co  
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

5. **Configurar autenticación OAuth en Supabase**

a. En el dashboard de Supabase, ir a Authentication > Providers

b. Habilitar Google OAuth y configurar las credenciales

c. Agregar http://localhost:3000/api/auth/callback como URL de redirección

6. **Ejecutar la aplicación**
```bash  
npm run dev
```

## La aplicación estará disponible en http://localhost:3000

# 🏗️ Decisiones de Arquitectura

1. **Arquitectura en Capas (Layered Architecture)**
```
Client Layer → API Layer → Service Layer → Repository Layer → Database Layer  
```

**Ventajas:**
- Separación clara de responsabilidades
- Código testeable y mantenible
- Facilita cambios de implementación (ej: cambiar de Supabase a otro proveedor)
- Reutilización de lógica de negocio

**Desventajas:**
- Mayor complejidad inicial
- Más archivos y boilerplate

**¿Cómo lo implementé?**
- Client Layer: Componentes React y hooks personalizados
- API Layer: Next.js API Routes en app/api/
- Service Layer: Lógica de negocio en lib/service/
- Repository Layer: Abstracción de datos con patrón Repository en lib/repository/
- Database Layer: Supabase

2. **Repository Pattern**
```
Usar interfaces de repositorio con implementaciones intercambiables
```

**Ventajas:**
- Abstracción completa de la capa de datos
- Permite múltiples implementaciones (Supabase, in-memory para tests)
- Facilita testing con mocks

**Desventajas:**
- Overhead de código adicional
- Puede ser excesivo para proyectos pequeños

# 🔒 Enfoque de Seguridad
1. Autenticación
**Implementación**: OAuth 2.0 con Google vía Supabase Auth
- Tokens de sesión gestionados por Supabase
- Cookies HTTP-only para almacenar sesión
- Middleware de autenticación en todas las rutas protegidas

Flujo:
1. Usuario hace clic en "Login with Google"
2. Redirección a Google OAuth
3. Callback a /api/auth/callback con código de autorización
4. Exchange de código por sesión
5. Creación/actualización de usuario en DB
6. Procesamiento de invitaciones pendientes

2. Autorización (RBAC)
**Sistema de Roles**: Tres niveles de acceso

- **Owner**: Control total del workspace, puede eliminar workspace y gestionar miembros
- **Editor**: Puede crear, editar y eliminar notas
- **Viewer**: Solo lectura de notas

**Implementación**
1. Verificación en API Routes (en app/api)
2. Verificación de membresía: El servicio verifica que el usuario sea miembro del workspace antes de permitir operaciones.
3. Control en UI: Los componentes verifican el rol antes de mostrar acciones

3. Validación de Datos
En API Routes:
- Validación de campos requeridos
- Sanitización de inputs
- Type checking con TypeScript

En Base de Datos:
- Constraints de NOT NULL
- Foreign keys con CASCADE 
- UNIQUE constraints para prevenir duplicados 

4. Protección de Rutas
Middleware de Next.js:
- Redirige usuarios no autenticados a /login


# ⚠️ Limitaciones Conocidas - ¿Qué agregaría con más tiempo?
## Features
- Notificaciones
- Mejoraría la búsqueda (actualmente sólo busca por título y descripción)
- Agregaría tags a las notas
- Agregaría un historial a las notas
- Agregaría la función de exportar a .csv o .txt
- Agregaría paginación
- Editor de rich text

## Seguridad
- Validación de email en invitaciones: No se verifica que el email sea válido
- Auditoría: No hay logs de acciones sensibles

# KI Technologies — Landing page

Sitio corporativo estático de KI Technologies.

## Agregar un proyecto

1. Copia la imagen y el logo del proyecto dentro de `dist/assets/projects/`.
2. Abre `dist/projects.js`.
3. Duplica uno de los objetos dentro de `window.KI_PROJECTS`.
4. Cambia el nombre, categoría, descripción, imágenes, etiquetas y enlace.

El proyecto aparecerá automáticamente en la sección **Proyectos** del sitio.

## Datos de contacto

El correo, Instagram y dominio se pueden cambiar directamente en `dist/index.html`. El formulario de contacto prepara un correo desde el dispositivo del visitante, sin almacenar información en un servidor.

## Publicación

La carpeta publicable es `dist`, configurada en `.openai/hosting.json`.

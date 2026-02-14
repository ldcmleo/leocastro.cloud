---
title: "Puertos y Adaptadores: cuando la buena arquitectura es una mala decisión"
description: "En este articulo explico un poco de mi aprendizaje aplicando la arquitectura hexagonal, en un contexto erroneo"
pubDate: 2026-02-13
relatedPosts:
- welcome
---
En el transcurso de unos meses atrás implementé la arquitectura de Puertos y Adaptadores en una aplicación de escritorio “Sencilla” para Windows.

No se trataba de un sistema distribuido.
No tenía múltiples fuentes de datos.
No iba a escalar horizontalmente.
No tenía un roadmap incierto.

Se trataba de una aplicación cerrada con un alcance claro y aún así decidí aplicar arquitectura hexagonal. Fue, honestamente, una pérdida absoluta de tiempo.

## La decisión (con muy buenas intenciones)

La motivación para elegir arquitectura hexagonal era buena:
Por un lado separar el dominio de la infraestructura parecía una buena idea, diseñar para poder cambiar dependencias, evitar el clásico acoplamiento lógico de negocio y detalles técnicos y el típico pensamiento de “hacer lo correcto”.

En teoría, todo parecía perfecto.

Mi intención era poder demostrar mis capacidades para entender la lógica de negocios y como evitar el acoplamiento lo más posible. Puse manos a la obra y empecé a definir puertos, cree interfaces para persistencia y separé adaptadores y organice capas con disciplina, el resultado era formalmente correcto, pero lo más importante no estaba del todo preciso, lo cierto es que el sistema no necesitaba nada de eso.

## Lo que pasó en la practica

El costo real no fue técnico, sino cognitivo. Multiplique archivos, cree interfaces con una sola implementación y agregue niveles de indirección que no resolvían ningún problema concreto.
Cada cambio implicaba atravesar capas que, en este contexto, no protegían nada.
Al final, el sistema se sentía extremadamente complejo para tener siempre, misma implementación de tecnología para persistencia, mismos tipos de datos básicos para contemplar, sin tanta variabilidad en cuanto a como la lógica de negocios los trataba. 

Al inicio contemplar la idea de generar código mantenible con el tiempo y la capacidad de poder explicarlo mientras cada linea de código iba demostrando mis capacidades parecía increíblemente agradable, como si este fuese el camino correcto a seguir mientras continuaba por el camino de desarrollo. Lo cierto es que muchas veces confundimos nuestro impulso por destacar con miedo, con esa sensación de que si no hacemos todo perfecto el código hablara por si solo y demostrara que no estamos al nivel que se requiere para ser considerados buenos profesionales en esta industria tan competida.

## Sobre ingeniería: el miedo disfrazado de buenas practicas

Lo incomodo que se esconde detrás de este escenario es que a veces aplicamos arquitecturas formales, no porque el sistema los necesite, sino porque nosotros queremos sentir que lo hicimos de la “mejor manera”.
Es una forma de reducir ansiedad técnica: “¿Y si luego crece?”, “¿Y si luego necesito cambiar la base de datos?”, “Y si esto se convierte en algo grande?”. Diseñar para todos los futuros posibles es algo imposible pero si es posible inflar el presente y esto, tiene un costo.

#### El típico “Punto medio”: modularidad pragmática

Algo que no te suelen contar en los libros académicos o en los cursos donde se te vende la idea de que una vez domines la arquitectura hexagonal serás capaz de entender todo en la programación, es que: La abstracción solo debe introducirse cuando exista una presión real que la exija.
En mi caso en particular puedo sacar buenas ideas tanto a nivel practico como nivel teórico.

- **Los contratos del dominio deben existir solo si existe una demanda**: Lo cierto es que no todos los conceptos en el dominio deben tener sus propias interfaces, a veces es bueno jugar a la segura, en mi caso, todos los datos del modelo de negocio eran estáticos, incluso para hoy o mañana, las especificaciones para estos datos están definidos por reglas estrictas y definidas por estándares estipulados legalmente “este dato debe ir si o sí en el contenido informativo, de lo contrario, no se requiere” esto implicaba poca necesidad de cambios en los tipos de datos y los datos que terminan siendo almacenados en la base de datos, no se requiere cientos de miles de registros, los usuarios usaran esencialmente los datos para generar objetos estáticos, sin tanto cambio más que visual, en este escenario en especifico tener interfaces para los datos que son almacenados resulta irrelevante, la base de datos será estática, la misma casi que para todo el ciclo de vida del proyecto.
- **Modularizar por intención, no por capas ceremoniales**: Si te puedes quedar con algo de todo este articulo, que sea con esto. Mientras que los datos para almacenar en la base de datos serían casi los mismo con el paso del tiempo, la implementación del sistema de renderizado si parecía cambiar demasiado, el renderizado para vista previa generando imágenes bmp, generación en formato PDF, mandar directo a imprimir con Windows Print. Esta parte del sistema requería sin duda alguna de la implementación correcta y desacoplada de los datos, tener tantas formas de tratar los datos con distintos tipos de librerías requería de adaptadores que permitieran trabajar todo a su modo y forma, en esta parte del sistema, fue un completo acierto el poder implementarlo con arquitectura hexagonal, de hecho, en el momento en el que se decidió cambiar el formato base de tenerlo de forma programática a usar diseños de tipo SVG como base para generar los objetos a imprimir, la implementación fue fácil, fluida y hasta gratificante, “solo debo mover esto aquí para cambiar la forma donde obtengo los datos y los renderizados se encargan cada uno de tratar los datos como necesiten”.

#### Piensa de la lógica de negocios a la arquitectura, luego la tecnología, no al revés.

Tener un checklist de todos los datos que deben existir en tu sistema solo porque de esa manera cumplirás con la arquitectura que crees que es perfecta, es un error, con forme más aprendo de sistemas, más entiendo la diferencia entre “has un software que haga” con uno “que permita a los usuarios hacer” y entender esta diferencia te hace mejor desarrollador, sin duda alguna.
El flujo que hasta ahora parece servirme para obtener mejores resultados va primero, siempre, sin duda alguna, en analizar de forma extendida la lógica de negocios que debes implementar. Una vez que entiendes el origen del problema, solucionarlo es más fácil, incluso sin pensar en arquitecturas o tecnologías necesarias.

## Conclusión

Puertos y Adaptadores sigue siendo una arquitectura sólida. Pero su valor es contextual.
En sistemas pequeños, el exceso de formalidad puede generar más fricción que claridad.
La madurez técnica no está en aplicar patrones reconocidos.
Está en saber cuándo no aplicarlos.
Y esa decisión rara vez aparece en los diagramas.

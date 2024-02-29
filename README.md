# toku-simulation

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Consideraciones

Primero que todo, lamentablemente no tuve mucho tiempo para trabajar en la tarea, tuve un problema familiar entre medio y mi trabajo estuvo bastante demandante, me hubiese encantado entretenere más para agregar detalles. En honor al tiempo la pelea la simplifiqué bastante.

### Batalla

- Se crean dos equipos de 5 heroes válidos y únicos. Se validó que no tuviesen stats en null.
- Comienza a atacar un equipo al azar y luego se sigue por turnos.
- Si el heroe atacado queda sin HP, se procede a elegir el heroe siguiente del equipo.
- Gana el equipo que mata a todos los héroes del otro equipo.

### Aspectos técnicos

- La tarea está hecha en Vue 3 utilizando Pinia para guardar estados, tambien se utilizó Axios y Vuetify. Decidí utilizar Vue 3 por que la verdad nunca lo había hecho y aproveché la instancia para investigar un poquito las diferencias con Vue 2 y cómo funciona Pinia con respecto a Vuex.

- Si bien muchos types no los puse y tampoco manejé todos los errores hay algunos componentes donde sí lo hice para mostrarles que me preocupé.

- Se modularizó en carpetas para tener más ordenado el código.
    - utils/validations -> validaciones
    - utils/utils -> funciones que podrían utilizarse en distintas partes del código
    - utils/constants -> constantes que se utilizan en distintas partes del código
    - types/globalTypes -> acá definí algunos tipos (faltan varios pero la idea es tener bien tipado todo el código)
    - stores -> acá cree dos stores, una global y otra para la simulación. (Pinia)
    - services/api -> superheroApi.ts -> acá está el llamado a la API
    - componentes/base -> es bueno tener componentes Base que se reutilizan a lo largo del código, acá no fue el caso pero es para dar una idea.

### Logs

- Si bien los logs no entregan mucha información y me hubiese encantado mostrar gráficos o más tablas, sinceramente no me dio el tiempo.

### Bonus

- No desarrollé el bonus principalmente por que mailgun es una herramienta más de backend pero dejé un poco la lógica para llamar a la API en caso de tenerla. 

### Agradecimiento

- Muchas gracias equipo Toku por la oportunidad y flexibilidad en el proceso.



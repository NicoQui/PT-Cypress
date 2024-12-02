# PT-Cypress

Prueba técnica en cypress:
Automatización de 4 casos de prueba descritos en el archivo word

Para ejecutar (en carpeta deseada):
-git clone https://github.com/NicoQuino/PT-Cypress.git
-npm install
-npx cypress open

// Hay un error con el archivo filterCommands.js que indica un problema tipo case sensitive. No pude solucionarlo, únicamente sacandolo de la carpeta commands y que quede en /support

Sobre el proyecto:
Cypress v13.16.0
Se implementó el patrón de diseño POM (Page Object Model) con uso de Commands en la ejecución de los casos de prueba.


Consideraciones:
-Como se indica en unas partes, es mejorable la separación de dependencias sea creando mas clases o mas comandos para separar responsabilidades.
-Tambien son mejorables los nombres de los archivos y funciones.
-Se incluyó un método para evitar todos los errores generados por la página a testear, errores independientes de Cypress.
-Una validación no se logró hacer en el CP 001
-En la consigna, cuando se indica "de no estar disponible (...)" se interpretó como un reemplazo de un prerrequisito de la prueba.
-Se intentó aplicar uso de viewports, pero solo es aplicado en las situaciones donde el test falla.
-Entiendo que los assertions tambien son muy mejorables.
-No implemente fixtures. Estaria bueno hacerlo.

4to Caso:
CP004 - Validar función añadir al carrito de compras -HayMensaje -Url./chart -Equipo.Último de la lista 
Descripción: El objetivo del caso de prueba es visitar la tienda de Movistar (https://tiendaonline.movistar.com.ar), luego ingresar al último equipo de la lista inicial que se obtenga y verificar que funcione el botón para añadir al carro de compras. Debe cambiar la Url, mostrar un mensaje por pantalla y el precio del producto debe ser el total.
Resultado esperado: 
- Que se pueda ingresar a la página indicada.
- Que el equipo seleccionado pueda añadirse al carro de compras.
- Que la url se actualize.
- Que muestre un mensaje por pantalla avisando el resultado.
- Que el precio del producto sea el mismo del total del carro.


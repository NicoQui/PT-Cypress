import {ProductList} from "./PageObjects/HomePage"
import ProductPage from "./PageObjects/ProductPage";

<<<<<<< HEAD
// Seleccionar un producto basado en un filtro
=======
>>>>>>> 3033deac2574087ef307e19ec008136153769ab3
Cypress.Commands.add('selectProduct', (index,textFilter) => {
    const productList = new ProductList();

    productList.getProductItems()
        .eq(index)
        .should('contain',textFilter)
        .click();
})

<<<<<<< HEAD
// Buscar un producto por nombre
Cypress.Commands.add('searchProduct',searchText => {
    const productList = new ProductList();

    productList.getSearchInput().type(searchText+'{enter}');
})

// Ingreso de datos para el calculo de cuotas
=======
Cypress.Commands.add('searchProduct',searchText => {
    const productList = new ProductList();

    productList.getSearchInput().type(searchText);
})

>>>>>>> 3033deac2574087ef307e19ec008136153769ab3
Cypress.Commands.add('calculateInstallments',(bank,card) => {
    const productPage = new ProductPage();

    // Abre el link que permite ingreso de datos
<<<<<<< HEAD
    productPage.getInstallmentsLink()
        .scrollIntoView()
        .click();
=======
    productPage.getInstallmentsLink().click();
>>>>>>> 3033deac2574087ef307e19ec008136153769ab3
    // Completa los campos -> extraido en funcion genérica
    completeFields(productPage,'bank',bank);
    completeFields(productPage,'card',card);

    productPage.getCalulateBtn().click();    
})

<<<<<<< HEAD
// Verifica que no exista un plan de cuotas
=======
>>>>>>> 3033deac2574087ef307e19ec008136153769ab3
Cypress.Commands.add('notExistInstallments',installmentsText => {
    const productPage = new ProductPage();

    productPage.getInstallmentsTable()
        .children()
        .should('be.visible')
<<<<<<< HEAD
        .and('not.contain',installmentsText)
        .scrollIntoView();
})

// Función genérica para ingresar los datos del calculo de cuotas
=======
        .and('not.contain',installmentsText);
})

>>>>>>> 3033deac2574087ef307e19ec008136153769ab3
function completeFields(productPage,type,element){
    // Seleccion del input para desplegar opciones
    productPage.getInput(type).click();
    // Seleccion del banco o tarjeta
    productPage.getItems(type)
        .should('be.visible')
        .contains(element)
        .click({force: true});
}
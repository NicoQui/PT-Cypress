import {ProductList} from "./PageObjects/HomePage"
import ProductPage from "./PageObjects/ProductPage";

// Seleccionar un producto basado en un filtro
Cypress.Commands.add('selectProduct', (index,textFilter) => {
    const productList = new ProductList();

    productList.getProductItems()
        .eq(index)
        .should('contain',textFilter)
        .click();
})

// Buscar un producto por nombre
Cypress.Commands.add('searchProduct',searchText => {
    const productList = new ProductList();

    productList.getSearchInput().type(searchText+'{enter}');
})

// Ingreso de datos para el calculo de cuotas
Cypress.Commands.add('calculateInstallments',(bank,card) => {
    const productPage = new ProductPage();

    // Abre el link que permite ingreso de datos
    productPage.getInstallmentsLink()
        .scrollIntoView()
        .click();
    // Completa los campos -> extraido en funcion genérica
    completeFields(productPage,'bank',bank);
    completeFields(productPage,'card',card);

    productPage.getCalulateBtn().click();    
})

// Verifica que no exista un plan de cuotas
Cypress.Commands.add('notExistInstallments',installmentsText => {
    const productPage = new ProductPage();

    productPage.getInstallmentsTable()
        .children()
        .should('be.visible')
        .and('not.contain',installmentsText)
        .scrollIntoView();
})

// Función genérica para ingresar los datos del calculo de cuotas
function completeFields(productPage,type,element){
    // Seleccion del input para desplegar opciones
    productPage.getInput(type).click();
    // Seleccion del banco o tarjeta
    productPage.getItems(type)
        .should('be.visible')
        .contains(element)
        .click({force: true});
}
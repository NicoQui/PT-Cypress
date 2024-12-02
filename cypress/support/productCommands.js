import {ProductList} from "./PageObjects/HomePage"
import ProductPage from "./PageObjects/ProductPage";

Cypress.Commands.add('selectProduct', (index,textFilter) => {
    const productList = new ProductList();

    productList.getProductItems()
        .eq(index)
        .should('contain',textFilter)
        .click();
})

Cypress.Commands.add('searchProduct',searchText => {
    const productList = new ProductList();

    productList.getSearchInput().type(searchText);
})

Cypress.Commands.add('calculateInstallments',(bank,card) => {
    const productPage = new ProductPage();

    // Abre el link que permite ingreso de datos
    productPage.getInstallmentsLink().click();
    // Completa los campos -> extraido en funcion genérica
    completeFields(productPage,'bank',bank);
    completeFields(productPage,'card',card);

    productPage.getCalulateBtn().click();    
})

Cypress.Commands.add('notExistInstallments',installmentsText => {
    const productPage = new ProductPage();

    productPage.getInstallmentsTable()
        .children()
        .should('be.visible')
        .and('not.contain',installmentsText);
})

function completeFields(productPage,type,element){
    // Seleccion del input para desplegar opciones
    productPage.getInput(type).click();
    // Seleccion del banco o tarjeta
    productPage.getItems(type)
        .should('be.visible')
        .contains(element)
        .click({force: true});
}
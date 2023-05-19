import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const firtName = faker.name.firstName();
const lastName = faker.name.lastName();
const fullName = `${firtName} ${lastName}`;
describe('Editar nombre de usuario', () => {
    it('Editar el nombre de usuario del perfil Ghost y guardar los cambios', () => {
        /*
-------------
GIVEN
-------------
*/
        // Autenticar usuario
        cy.login();
        // Ir a la pestaña Staff
        adminMenu.staffTab.click();
        cy.wait(1000);
        staffSection.ghostStaffMember.click();
        cy.wait(1000);
        /*
-------------
WHEN
-------------
*/
        // Editar el nombre de usuario del perfil Ghost
        staffSection.nameField.clear();
        cy.wait(1000);
        staffSection.nameField.type(fullName, { force: true });
        cy.wait(1000);
        // Guardar cambios
        staffSection.saveChanges.click();
        /*
		-------------
		THEN
		-------------
		*/
        // Verificar que el nombre de usuario se haya editado correctamente
        staffSection.nameField.should('have.value', fullName);
        // Retornar a condición inicial
        staffSection.nameField.clear();
        cy.wait(1000);
        staffSection.nameField.type('Ghost', { force: true });
        staffSection.saveChanges.click();
    });
});
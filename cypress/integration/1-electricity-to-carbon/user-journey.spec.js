describe('User Journey', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.viewport(1280, 720);
        })
        describe('Initial state when user visits home', () => {
            beforeEach(() => {
                cy.visit('/');
            });

            it('should render correctly', () => {
                cy.get('.MuiGrid-container').should('exist');
                cy.get('.MuiTypography-h4').contains('Estimate your weekly carbon emissions!');
                cy.get(':nth-child(1) > .MuiStepLabel-root > .MuiStepLabel-labelContainer > .MuiTypography-root').contains('Your weekly electricity usage');
                cy.get('.MuiTypography-h6').contains('Enter your weekly electricity usage');
                continueButton().should('exist').should('be.disabled').should('have.text', 'Continue');
                backButton().should('not.exist');
            })

            it('sliders should have zero values initially', () => {
                // [id=slider][class*="valueLabel"] selects elements where [id=slider] AND [class*="valueLabel"] is present on same element
                // [id=slider], [class*="valueLabel"] selects elements where [id=slider] OR [class*="valueLabel"] is present on either element
                // [id=slider] [class*="valueLabel"] selects all descendants of [id=slider] with [class*="valueLabel"] on them
                cy.get(`[id=slider] [class*="valueLabel"]`).should('have.length', 7).each(($slider, index) => {
                    cy.wrap($slider).contains(0);
                })
            })
        })

        describe('Usage Form Interactions', () => {
            beforeEach(() => {
                cy.visit('/');
            });

            it('button should be enabled when slider value is set', () => {
                cy.get(':nth-child(4) > .MuiGrid-root > .MuiSlider-root').click();
                continueButton().should('be.enabled');
                backButton().should('not.exist');
            });

            it('button should be disabled when value is set and reset', () => {
                continueButton().should('be.disabled');
                cy.get(`[id=slider] [class*="thumb"]`).eq(5).focus().type('{uparrow}');
                continueButton().should('be.enabled');
                cy.get(`[id=slider] [class*="thumb"]`).eq(5).focus().type('{downarrow}');
                continueButton().should('be.disabled');
            });

            it('when navigating back to usage-form, value should remain set and equal', () => {
                cy.get(`[id=slider] [class*="thumb"]`).eq(3).focus().type('{uparrow}'.repeat(5));
                cy.get(`[id=slider] [class*="valueLabel"]`).eq(3).then(($sliderBefore) => {
                    expect($sliderBefore.text()).to.not.eq(undefined);
                    continueButton().click();
                    backButton().should('exist').should('be.enabled').click();
                    cy.get(`[id=slider] [class*="valueLabel"]`).eq(3).should(($sliderAfter) => {
                        expect($sliderBefore.text()).to.eq($sliderAfter.text());
                    })
                });
            })
        })
    })
})

function continueButton() {
    return cy.get('[id=continue-btn]');
}

function backButton() {
    return cy.get('[id=back-btn]');
}

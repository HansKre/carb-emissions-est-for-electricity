import countries from '../../../components/electricity-to-carbon/countries';

describe('User Journey', () => {
    beforeEach(() => {
        // redirect all real api-calls to mocked api
        cy.intercept('POST', '/api/estimates', (req) => {
            if (!req.url.includes('/mock')) {
                req.url = req.url + '/mock';
            }
        });
    });

    context('Desktop', () => {
        beforeEach(() => {
            cy.viewport(1280, 720);
        });
        describe('Initial state when user visits home', () => {
            beforeEach(() => {
                cy.visit('/');
            });

            it('should render correctly', () => {
                cy.get('.MuiTypography-h4').contains('Estimate your weekly carbon emissions!');
                cy.get(':nth-child(1) > .MuiStepLabel-root > .MuiStepLabel-labelContainer > .MuiTypography-root').contains('Your weekly electricity usage');
                formTitle().contains('Enter your weekly electricity usage');
                continueButton().should('exist').should('be.disabled').should('have.text', 'Continue');
                backButton().should('not.exist');
                cy.get('[id="copyright"]').should('exist').contains('Copyright 2021 © https://github.com/HansKre');
            });

            it('sliders should have zero values initially', () => {
                cy.get(`[id=slider] [class*="valueLabel"]`).should('have.length', 7).each(($slider, index) => {
                    cy.wrap($slider).contains(0);
                });
            });
        });

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
                sliderThumb(5).focus().type('{uparrow}');
                continueButton().should('be.enabled');
                sliderThumb(5).focus().type('{downarrow}');
                continueButton().should('be.disabled');
            });

            it('when navigating back to usage-form, value should remain set and equal', () => {
                sliderThumb(3).focus().type('{uparrow}'.repeat(5));
                sliderValueLabel(3).then(($sliderBefore) => {
                    expect($sliderBefore.text()).to.not.eq(undefined);
                    continueButton().click();
                    backButton().should('exist').should('be.enabled').click();
                    sliderValueLabel(3).should(($sliderAfter) => {
                        expect($sliderBefore.text()).to.eq($sliderAfter.text());
                    })
                });
            });
        });

        describe('Country Form Interactions', () => {
            beforeEach(() => {
                cy.visit('/');
            });

            it('continue-button should be disabled and back-button enabled', () => {
                navigateToCountryForm();
                continueButton().should('be.disabled');
                backButton().should('be.enabled');
            });

            it('continue-button should enable when country is selected', () => {
                navigateToCountryForm();
                continueButton().should('be.disabled');
                countrySelect().click();
                cy.get(`[data-value="${countries[0].value}"]`).click();
                continueButton().should('be.enabled');
            });

            it('selection of country and date should be possible', () => {
                navigateToCountryForm();
                countrySelect().click();
                // select random country
                const randomIndex = randomNumber(0, countries.length - 1);
                const val = countries[randomIndex].value;
                cy.get(`[data-value="${val}"]`).click();
                const label = countries[randomIndex].label;
                countrySelect().contains(label);
                cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
                cy.get(`:nth-child(${randomNumber(2, 4)}) > :nth-child(${randomNumber(1, 7)}) > .MuiButtonBase-root > .MuiIconButton-label`).click();
            });

            it('should keep selection when navigating back to previous step', () => {
                navigateToCountryForm();
                countrySelect().click();
                // select random country
                const randomIndex = randomNumber(0, countries.length - 1);
                const val = countries[randomIndex].value;
                cy.get(`[data-value="${val}"]`).click();
                // type in date from past
                datePicker().clear();
                const date = '07.08.2020';
                datePicker().type(date);
                datePicker().should('have.value', date);
                // navigate
                backButton().click();
                continueButton().click();
                // assess
                const label = countries[randomIndex].label;
                countrySelect().contains(label);
                datePicker().should('have.value', date);
            });

            it('should keep selection when navigating to next step', () => {
                navigateToCountryForm();
                countrySelect().click();
                // select random country
                const randomIndex = randomNumber(0, countries.length - 1);
                const val = countries[randomIndex].value;
                cy.get(`[data-value="${val}"]`).click();
                // type in date from past
                datePicker().clear();
                const date = '07.08.2019';
                datePicker().type(date);
                datePicker().should('have.value', date);
                // navigate
                continueButton().click();
                backButton().click();
                // assess
                const label = countries[randomIndex].label;
                countrySelect().contains(label);
                datePicker().should('have.value', date);
            });
        });

        describe('Emissions Interactions', () => {
            beforeEach(() => {
                cy.visit('/');
            });

            it('continue-button should be disabled and back-button enabled', () => {
                navigateToEmissions();
                continueButton().should('be.disabled');
                backButton().should('be.enabled');
            });

            it('should make api-call and render exactly one bar', () => {
                cy.intercept({
                    method: 'POST',
                    url: '/api/estimates*',
                }).as('apiCall');
                navigateToEmissions();
                cy.wait(['@apiCall'])
                cy.get('[id="chart"]').should('exist');
                cy.get('[id="errorMsg"]').should('not.exist');
                cy.get('.recharts-rectangle').should('have.length', 1);
            });

            it('should fail gracefully and show error message when api-call fails', () => {
                cy.intercept({
                    method: 'POST',
                    url: '/api/estimates*',
                }, {
                    statusCode: 500,
                    body: {
                        foo: 'bar',
                    }
                }).as('apiCall');
                navigateToEmissions();
                cy.wait(['@apiCall']);
                cy.get('[id="errorMsg"]').should('exist');
                cy.get('[id="chart"]').should('not.exist');
            })
        });
    });
});

function datePicker() {
    return cy.get('#date-picker-inline');
}

function countrySelect() {
    return cy.get('[id="country-select"]');
}

function navigateToCountryForm() {
    sliderThumb(3).click();
    continueButton().click();
    formTitle().contains('Please provide your Country and Date');
}

function navigateToEmissions() {
    navigateToCountryForm();
    countrySelect().click();
    cy.get(`[data-value="${countries[0].value}"]`).click();
    continueButton().click();
    formTitle().contains('Your carbon emissions');
}

function sliderValueLabel(n) {
    return cy.get(`[id=slider] [class*="valueLabel"]`).eq(n);
}

function sliderThumb(n) {
    // [id=slider][class*="valueLabel"] selects elements where [id=slider] AND [class*="valueLabel"] is present on same element
    // [id=slider], [class*="valueLabel"] selects elements where [id=slider] OR [class*="valueLabel"] is present on either element
    // [id=slider] [class*="valueLabel"] selects all descendants of [id=slider] with [class*="valueLabel"] on them
    return cy.get(`[id=slider] [class*="thumb"]`).eq(n);
}

function continueButton() {
    return cy.get('[id=continue-btn]');
}

function backButton() {
    return cy.get('[id=back-btn]');
}

function formTitle() { return cy.get('.MuiTypography-h6') }

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
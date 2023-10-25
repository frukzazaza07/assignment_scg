describe('template spec', () => {
  it('home page passed', () => {
    cy.visit('http://localhost:3000')
  })

  it('payload body backend passed', () => {
    cy.request('post', 'http://localhost:8080/api/restaurants/find-places', {searchPlace: 'Bang sue'})
  })
})
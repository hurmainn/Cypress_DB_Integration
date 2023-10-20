describe('DATABASE TESTING WITH CYPRESS', () => {
  it('DB Integration TEST 1', () => {
    //install cypress sql server
    //need to register the plugin in csetup node events in config file
    //installed mysql plugin
    //changes in config file
    //then import custom db commands in e2e.js


    //now you want t call a query
    //get informaton from database
    cy.task('queryDatabase', 'SELECT * FROM users2').then((results) => {
      // Handle the database results in your test
      //results will be a 2 dimensional array containing the tabel
      //see the table from the database and then write the code 
      cy.log(results)
      console.log(results)  //first see what come in results by logging the whole result
      //to get a certain name, row, column, treat is as a two dimensional array or if it returned as a one dimensional array , treat it like that
      console.log(results[1]["username"])
      //i cant write reuslts[1]][2] because i was not getting a sub arrau, the idividual element was stores as username and id etc, not a s sub array with columns
    });
  })

  it("Inputting values into the form from database",()=>{
    cy.visit("https://example.cypress.io/commands/waiting") //using this because this contains three input boxe to type

    cy.task('queryDatabase', 'SELECT * FROM users2').then((results) => {
      cy.log(results)
      console.log(results)  //first see what come in results by logging the whole result
      //let us get first name last name and email from databse and  fill into the input boxes:
      let firstName=results[3]["first_name"]
      let lastName=results[3]["last_name"]
      let email=results[3]["email"]

      cy.get("input").eq(0).type(firstName)
      cy.get("input").eq(1).type(lastName)
      cy.get("input").eq(2).type(email)

      cy.get('.network-btn').click()
    });

  })
})
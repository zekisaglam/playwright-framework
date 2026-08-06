Feature: Login

  Scenario: Successful login
    Given the user navigates to the login page
    When the user logs in with username "admin" and password "admin123"
    Then the user should be redirected to the dashboard
    Then the page title should be "Dashboard"
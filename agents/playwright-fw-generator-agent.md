# Enterprise UI Test Automation Framework Specification

## Role

You are a Senior QA Automation Architect.

Your responsibility is to design and implement a scalable, maintainable, reusable, enterprise-level UI automation framework.

The framework should follow software engineering best practices rather than simply making tests pass.

---

# Technology Stack

* Playwright
* TypeScript
* Cucumber (BDD)
* Page Object Model (POM)

---

# Design Principles

The framework must follow these principles:

* SOLID Principles
* DRY (Don't Repeat Yourself)
* KISS
* Clean Code
* Separation of Concerns
* High Reusability
* Easy Maintenance
* Enterprise Project Structure

---

# Framework Architecture

The project should include:

```
src
│
├── config
│      config.properties
│      ConfigurationReader.ts
│
├── pages
│      BasePage.ts
│      LoginPage.ts
│      DashboardPage.ts
│
├── utils
│      Driver.ts
│      BrowserUtils.ts
│      WaitUtils.ts
│      ElementUtils.ts
│      Logger.ts
│
├── hooks
│      Hooks.ts
│
├── step-definitions
│
├── runners
│
├── features
│
├── data
│
├── constants
│
└── reports
```

---

# Page Object Model Rules

Every page must:

* Extend `BasePage`
* Never contain assertions
* Never contain test logic
* Contain only:

  * locators
  * page actions
  * reusable page methods

Example:

```
LoginPage

Locators

Methods

login()

clickLogin()

enterUsername()

enterPassword()
```

---

# Locator Rules

Locators must always be stable and maintainable.

Priority order:

### 1. id (Highest Priority)

```
#username
```

Use `id` whenever it is available.

---

### 2. data-testid

```
[data-testid='login-button']
```

---

### 3. name

```
[name='email']
```

---

### 4. aria-label

```
[aria-label='Search']
```

---

### 5. role

Use Playwright's semantic locators whenever possible.

Example:

```
page.getByRole()
```

---

### 6. text

Use only when the text is stable.

---

### 7. XPath

Avoid XPath unless absolutely necessary.

---

# Dynamic Locator Rules

Hardcoded locators are prohibited.

Every dynamic locator should be implemented using reusable methods.

Example:

```
clickMenu(String menu)

clickButton(String buttonText)

selectDropdownOption(String option)

clickTableRow(String value)
```

Never create one locator for every button.

Correct approach:

```
locator(buttonText)
```

instead of

```
loginButton

saveButton

cancelButton

submitButton
```

---

# Base Page Responsibilities

`BasePage` should contain reusable methods such as:

* click()
* type()
* clear()
* hover()
* scrollIntoView()
* waitForVisible()
* waitForHidden()
* waitForClickable()
* getText()
* isDisplayed()
* selectDropdown()
* uploadFile()
* dragAndDrop()
* takeScreenshot()

No duplicated code should exist in page classes.

---

# Singleton Design Pattern

Only one browser instance should exist during execution.

Implement Singleton for:

* Browser
* Playwright instance
* BrowserContext
* Page
* Configuration Reader

The framework should prevent multiple browser instances from being created unintentionally.

---

# Configuration Management

All configurable values must be stored externally.

Example:

```
config.properties
```

Example properties:

```
browser=chromium
baseUrl=https://example.com

username=admin
password=admin123

headless=false

timeout=30000

slowMo=0
```

Never hardcode:

* URLs
* credentials
* timeouts
* browser names
* environment settings

---

# Configuration Reader

Create a singleton `ConfigurationReader`.

Responsibilities:

* Read properties
* Cache values
* Provide simple access methods
* Prevent duplicate file reads

Example:

```
ConfigurationReader.get("browser")
ConfigurationReader.get("baseUrl")
```

---
# Utils Folder Rules
 
* We should have BrowserUtils in every project.


---

# Cucumber Guidelines

Follow Behavior-Driven Development (BDD).

Feature files should be business-readable.

Example:

```
Feature: Login

Scenario: Successful Login

Given the user navigates to the login page

When the user enters valid credentials

Then the user should be redirected to the dashboard
```

---

# Step Definition Rules

Step definitions should:

* Contain no locators
* Contain no business logic
* Call page object methods only
* Be short and readable

Example:

```
loginPage.login(username,password)
```

---

# Reusable Utilities

Create reusable utility classes for:

* Browser Utilities
* Wait Utilities
* Element Utilities
* JavaScript Utilities
* Date Utilities
* File Utilities
* Screenshot Utilities
* Logger
* Random Data Generator
* Test Data Reader

---

# Wait Strategy

Avoid static waits.

Never use:

```
waitForTimeout()
Thread.sleep()
```

Prefer:

* Explicit waits
* Locator-based waits
* Expect-based synchronization
* Auto-waiting provided by Playwright

---

# Assertions

Assertions belong only in:

* Step Definitions
* Assertion Helper classes

Never place assertions inside page objects.

---

# Logging

Implement centralized logging.

Each important action should be logged.

Example:

```
Opening browser

Navigating to URL

Clicking Login button

Entering username

Taking screenshot

Closing browser
```

---

# Reporting

Support modern reporting tools, including:

* Playwright HTML Report
* Cucumber HTML Report
* Allure Report

Reports should include:

* Execution summary
* Screenshots on failure
* Environment details
* Browser information
* Execution time
* Failed step details

---

# Error Handling

Implement centralized exception handling.

The framework should:

* Capture screenshots on failures
* Log exceptions
* Attach screenshots to reports
* Close browser gracefully

---

# Code Quality Rules

* No duplicated code
* No magic numbers
* No hardcoded values
* Small methods
* Single Responsibility Principle
* Meaningful variable names
* Meaningful method names
* Self-documenting code

---

# Naming Conventions

Methods:

```
login()

logout()

clickLoginButton()

enterUsername()

searchProduct()

selectCountry()
```

Variables:

```
usernameInput

loginButton

searchTextbox

countryDropdown
```

Constants:

```
DEFAULT_TIMEOUT

BASE_URL
```

---

# Framework Goal

The final framework should be:

* Enterprise-grade
* Easily maintainable
* Highly reusable
* Scalable for large projects
* Suitable for CI/CD pipelines
* Easy for new automation engineers to understand
* Based on Playwright, TypeScript, Cucumber, Page Object Model, Singleton Design Pattern, and external configuration using `config.properties`
* Add README.md file to expalin the framework

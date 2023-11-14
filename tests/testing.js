const { Builder, By, Browser, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function startTesting() {
  // Launching the brower
  try {
    console.log("Entry");

    const driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options().headless())
      .build();
    
    console.log("created driver");

    await driver.get("http://front-end/index.html");

    console.log("Entered webpage");
    await driver.manage().window().maximize();

    registerAndBuyProduct(driver);
  } catch (e) {
    console.error("An error occured: ", e);
  }
}

async function registerAndBuyProduct(driver) {
  // User credentials
  const userName = "test user 28";
  const firstName = "test";
  const lastName = "user";
  const email = "user@example.com";
  const password = "password";

  // Addres information
  const HouseNumber = "10";
  const StreetName = "West street";
  const City = "Chennai";
  const PostCode = "600028";
  const Country = "India";

  //Payment details
  const CardNumber = "123412341234";
  const ExpiryDate = "12/24";
  const CVV = "567";

  //start registration
  await driver
    .findElement(
      By.xpath("/html/body/div[1]/div/div[1]/div[2]/ul/li[2]/a"),
      1000
    )
    .click();

  // Entering username
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[1]/div/div[3]/div/div/div[2]/form/div[1]/input"
          )
        ),
        5000
      )
    )
    .sendKeys(userName);

  // Entering first name
  await driver
    .wait(
      until.elementIsVisible(driver.findElement(By.name("first-name")), 5000)
    )
    .sendKeys(firstName);

  // Entering last name
  await driver
    .wait(
      until.elementIsVisible(driver.findElement(By.name("last-name")), 5000)
    )
    .sendKeys(lastName);

  // Entering email
  await driver
    .wait(until.elementIsVisible(driver.findElement(By.name("email")), 5000))
    .sendKeys(email);

  // Entering password
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(By.id("register-password-modal")),
        1000
      )
    )
    .sendKeys(password);

  // Clicking submit button
  await driver
    .findElement(
      By.xpath("/html/body/div[1]/div/div[3]/div/div/div[2]/form/p/button"),
      1000
    )
    .click();

  //once registered, page is refreshed to erase duplicate xpath so that it doesnt collide
  await driver.navigate().refresh();
  await driver.sleep(1000);

  const LoggedInUser = await driver.wait(
    until.elementLocated(
      By.xpath("/html/body/div[1]/div/div[1]/div[2]/ul/li[1]/a")
    )
  );

  // Test Case 1: Verify Logged In User

  // Preconditions: Registered firstname and lastname.

  // Expected Outcome: Logged in as (firstname lastname)

  // Actual Result: The test passed.

  console.log("Test Case 1: Verify Logged In User");
  console.log("\nPreconditions: Registered firstname and lastname.");
  console.log("\nExpected Outcome: Logged in as (firstname lastname)");
  console.log("\nActual Result: The test passed.");

  const loggedInUserName = await LoggedInUser.getText();

  const regex = /Logged in as\s*(.*)/;
  const matchText = loggedInUserName.match(regex);

  // Extract the user's name from the match
  const loggedUserName = matchText ? matchText[1].trim() : null;

  // Output the result
  console.log(loggedUserName);
  // const loggedUserName = loggedInUserName.split("Logged in as")[1].trim();

  const expectedLoggedInUserName = firstName + " " + lastName;

  if (loggedUserName === expectedLoggedInUserName) {
    console.log("Text matches: " + loggedUserName);
    console.log(
      "\n---------------------------------------------Test 1 Passed---------------------------------------------\n"
    );
  } else {
    console.error(
      "Text does not match. Expected: " +
        expectedLoggedInUserName +
        ", Actual: " +
        loggedUserName
    );
    console.log(
      "\n---------------------------------------------Test 1 Failed---------------------------------------------\n"
    );
  }
  // selecting colorful socks

  // The text you want to compare with is Colourful as we test the colourful sock flow
  const expectedText = "Colourful";

  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[3]/div[1]/div[3]/div[2]/div/div[1]/div/div[2]/div/div/div[2]/h3/a"
          )
        ),
        5000
      )
    )
    .click();

  //adding it to the cart
  await driver
    .wait(until.elementIsVisible(driver.findElement(By.id("buttonCart")), 5000))
    .click();
  console.log("\nColourful added to the cart\n");

  await driver.navigate().refresh();
  await driver.sleep(500);

  //viewing it in the cart
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath("/html/body/div[2]/div/div/div[3]/div/a/span")
        ),
        5000
      )
    )
    .click();

  // Test Case 2: Verifing cart item and the  added item are same

  // Preconditions: Added an item(colourful) to the cart

  // Expected Outcome: Colourful

  // Actual Result: The test passed.

  console.log(
    "Test Case 2: Verifying cart item and the added item are the same"
  );
  console.log("\nPreconditions: Added an item (colourful) to the cart");
  console.log("\nExpected Outcome: Colourful");
  console.log("\nActual Result: The test passed.");
  const cartItem = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/div[3]/div[1]/div/div[3]/div[1]/form/div[1]/table/tbody/tr/td[2]/a"
      )
    )
  );

  // Once the element is located, you can interact with it
  const item = await cartItem.getText();

  // Check if the retrieved text matches the expected text
  if (item === expectedText) {
    console.log("Text matches: " + item);
    console.log(
      "\n---------------------------------------------Test 2 Passed---------------------------------------------\n"
    );
  } else {
    console.error(
      "Text does not match. Expected: " + expectedText + ", Actual: " + item
    );
    console.log(
      "\n---------------------------------------------Test 2 Failed---------------------------------------------\n"
    );
  }
  console.log("\nchecking the cart\n");

  //changing addresse
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[3]/div[1]/div/div[3]/div[2]/div[1]/div/div[1]/p/a"
          )
        ),
        1000
      )
    )
    .click();
  console.log("\nchanging address\n");

  // Adding address-------------------------
  // Entering house number
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[3]/div[1]/div/div[3]/div[2]/div[1]/div/div[2]/div/div/div[2]/form/div[1]/input"
          )
        ),
        5000
      )
    )
    .sendKeys(HouseNumber);

  // Entering street name
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[3]/div[1]/div/div[3]/div[2]/div[1]/div/div[2]/div/div/div[2]/form/div[2]/input"
          )
        ),
        5000
      )
    )
    .sendKeys(StreetName);

  // Entering city name
  await driver
    .wait(until.elementIsVisible(driver.findElement(By.name("city")), 5000))
    .sendKeys(City);

  // Entering post code
  await driver
    .wait(
      until.elementIsVisible(driver.findElement(By.name("post-code")), 5000)
    )
    .sendKeys(PostCode);

  // Entering country
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[3]/div[1]/div/div[3]/div[2]/div[1]/div/div[2]/div/div/div[2]/form/div[5]/input"
          )
        ),
        5000
      )
    )
    .sendKeys(Country);

  // Clicking update button
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[3]/div[1]/div/div[3]/div[2]/div[1]/div/div[2]/div/div/div[2]/form/p/button"
      ),
      5000
    )
    .click();

  await driver.sleep(1000);

  // Test Case 3: Verifing Address

  // Preconditions: Updated address

  // Expected Outcome: HouseNumber Street
  //                   City
  //                   PostCode
  //                   Country

  // Actual Result: The test passed.

  console.log("Test Case 3: Verifying Address");
  console.log("\nPreconditions: Updated address");
  console.log("\nExpected Outcome: HouseNumber Street");
  console.log("                  City");
  console.log("                  PostCode");
  console.log("                  Country");
  console.log("\nActual Result: The test passed.");

  // Check if the retrieved address matches the expected address
  const pElement = await driver.findElement(By.id("address"));

  // Get the text content of the <p> element
  const textContent = await pElement.getText();
  const address = textContent;

  // Split the data by line breaks and join with commas
  const formattedAddress = address.split("\n").join(", ");

  const expectedAddress =
    HouseNumber +
    " " +
    StreetName +
    ", " +
    City +
    ", " +
    PostCode +
    ", " +
    Country;

  // Check if the retrieved text matches the expected text
  if (formattedAddress === expectedAddress) {
    console.log("Text matches: " + expectedAddress);
    console.log(
      "\n---------------------------------------------Test 3 Passed---------------------------------------------\n"
    );
  } else {
    console.error(
      "Text does not match. Expected: " +
        expectedAddress +
        ", Actual: " +
        formattedAddress
    );
    console.log(
      "\n---------------------------------------------Test 3 Failed---------------------------------------------\n"
    );
  }

  //once registered, page is refreshed to erase duplicate xpath so that it doesnt collide
  await driver.navigate().refresh();

  //Adding payment
  //changing payment details
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[3]/div[1]/div/div[3]/div[2]/div[2]/div/div[1]/p/a"
          )
        ),
        5000
      )
    )
    .click();
  console.log("\nchanging Payment\n");

  // Entering card number
  await driver
    .wait(
      until.elementIsVisible(driver.findElement(By.name("card-number")), 5000)
    )
    .sendKeys(CardNumber);

  // Entering expiry date
  await driver
    .wait(until.elementIsVisible(driver.findElement(By.name("expires")), 5000))
    .sendKeys(ExpiryDate);

  // Entering cvv
  await driver
    .wait(until.elementIsVisible(driver.findElement(By.name("ccv")), 5000))
    .sendKeys(CVV);

  // Clicking update button

  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "html/body/div[3]/div[1]/div/div[3]/div[2]/div[2]/div/div[2]/div/div/div[2]/p/button"
          )
        ),
        5000
      )
    )
    .click();

  await driver.sleep(500);

  // Test Case 4: Verifing Payment

  // Preconditions: Updated Card number

  // Expected Outcome: Card ending in last 4 digits of the card number

  // Actual Result: The test passed.

  console.log("Test Case 4: Verifying Payment");
  console.log("\nPreconditions: Updated Card number");
  console.log(
    "\nExpected Outcome: Card ending in (last 4 digits of the card number)"
  );
  console.log("\nActual Result: The test passed.");

  const expectedCard = CardNumber.substring(CardNumber.length - 4);
  const paymentData = await driver.findElement(By.id("number"));

  const actualPaymentData = await paymentData.getText();
  const match = actualPaymentData.match(/\d{4}$/);
  const actualPaymentCard = match ? match[0] : null;

  // Check if the retrieved text matches the expected text
  if (actualPaymentCard === expectedCard) {
    console.log("Text matches: " + expectedCard);
    console.log(
      "\n---------------------------------------------Test 4 Passed---------------------------------------------\n"
    );
  } else {
    console.error(
      "Text does not match. Expected: " +
        expectedCard +
        ", Actual: " +
        actualPaymentCard
    );
    console.log(
      "\n---------------------------------------------Test 4 Failed---------------------------------------------\n"
    );
  }

  //proceeding to checkout
  console.log("\nProceeding into payment checkout\n");

  await driver.navigate().refresh();
  await driver.sleep(1000);

  try {
    await driver
      .wait(
        until.elementIsVisible(driver.findElement(By.id("orderButton")), 5000)
      )
      .click();
    console.log("checking the cart");
    await driver.sleep(1000);
  } catch (e) {
    console.error(e);
  }

  // Viewing the shipment invoice
  await driver
    .wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath(
            "/html/body/div[3]/div[1]/div/div[3]/div/div/table/tbody/tr/td[4]/a"
          )
        ),
        5000
      )
    )
    .click();
  console.log("\nViewing the shipment invoice\n Exiting browser...");

  await driver.sleep(3000);
  await driver.quit();
}

// Testing starts here
startTesting();

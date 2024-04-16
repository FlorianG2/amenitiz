# README
*Overview*

Welcome to the Cash Register App! This application is designed to help you add products to a cart and calculate the total price according to specific pricing rules. It's a simple tool that allows you to handle various product discounts and promotions efficiently.

*Technical Stack*

This Cash Register App is built using Ruby and ReactJs and is designed to be readable, maintainable, and easily extendable. It is fully tested using the RSpec testing framework to ensure code reliability.

*Getting Started*

To get started with the Cash Register App, follow these steps:

Clone this repository to your local machine.

gh repo clone FlorianG2/cash-register-amenitiz cd cash-register-amenitiz

Ensure you have Ruby installed on your system.

You can download it from ruby-lang.org.

Install the necessary dependencies using Bundler. gem install bundler bundle install

*Usage*

To use the Cash Register App, you can interact with it via localhost:3000.
Run the following command to start the app:

1. rails db:create migrate seed
With this command you will create a database in your environment with the 3 products already define for the application.

2. bin/dev

Now that you have the 3 products, you can click on one to add 1 quantity of this product to your cart.
The app will guide you through the other functionality like remove 1 quantity, delete, ...
You will be able to see the total price and the discount you got depending the quantity and the pricing rules that you will see in the next point.

*Pricing Rules*

This app implements the following pricing rules for products:

Buy-One-Get-One-Free Offer for Green Tea (GR1): When you add two Green Teas to the cart, the second one is free.

Strawberries (SR1) Bulk Purchase Discount: If you buy three or more Strawberries, the price for each Strawberry drops to 4.50€, 10% discount.

Coffee (CF1) Bulk Purchase Discount: If you buy three or more Coffees, the price for each Coffee is reduced to 2/3 of the original price.

*Examples*

Here are some example baskets and their expected total prices:

CART: GR1, GR1
Total Price Expected: 3.11€

CART: SR1, SR1, GR1, SR1
Total Price Expected: 16.61€

CART: GR1, CF1, SR1, CF1, CF1
Total Price Expected: 30.57€

*Running Tests*

To run the unit tests for the Cash Register App, use the following command:

bundle exec rspec
This will execute all the tests and display the results.

*Contributing*

We welcome contributions to improve the Cash Register App! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and ensure the tests pass.
Submit a pull request with a clear description of your changes.

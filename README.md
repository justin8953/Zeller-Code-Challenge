# Zeller Code Challenge

## Prerequisite

1. Install yarn and node version 18
## Usage

1. Run `yarn test` to perform test cases

## Design Concept

I have implemented pricing rules that allow modification of the original items' prices. These rules are stored in a map called itemsPrice, which maps Sku values to their corresponding prices. In addition, I have created five functions to define customized pricing rules:

- `bundle`: This function defines the pricing rule when certain items are sold together, such as a Macbook Pro with a VGA cable.
- `ipd`: This function specifies the pricing rule for iPads.
- `mbp`: This function sets the pricing rule for Macbook Pros.
- `atv`: This function determines the pricing rule for Apple TVs.
- `vga`: This function establishes the pricing rule for VGA cables.

To ensure the functionality of these rules, I have written test cases located in the tests folder. For testing purposes, I have utilized Jest, a unit testing framework. 

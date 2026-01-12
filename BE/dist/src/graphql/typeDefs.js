import { gql } from "apollo-server-express";
const typeDefs = gql `
  enum Role {
    ADMIN
    MANAGER
    MEMBER
  }

  enum Country {
    INDIA
    AMERICA
  }

  enum OrderStatus {
    CREATED
    PLACED
    CANCELLED
  }

  type User {
    id: ID!
    name: String
    phone: String!
    role: Role!
    country: Country!
    orders: [Order!]
    payments: [PaymentMethod!]
  }

  type Restaurant {
    id: ID!
    name: String!
    country: Country!
    menus: [MenuItem!]
  }

  type MenuItem {
    id: ID!
    name: String!
    price: Float!
    restaurant: Restaurant!
  }

type Order {
  id: ID!
  user: User!
  restaurant: Restaurant!
  items: [OrderItem!]
  status: OrderStatus!
  totalAmount: Int!
  createdAt: String!
}

  type OrderItem {
    id: ID!
    menuItem: MenuItem!
    quantity: Int!
  }

  type PaymentMethod {
    id: ID!
    user: User!
    type: String!
  }

  type Query {
    me: User
    restaurants(page: Int, limit: Int): [Restaurant!]
    restaurant(id: ID!): Restaurant
    orders(page: Int, limit: Int): [Order!]
    paymentMethods: [PaymentMethod!]
  }


  type Mutation {
    login(phone: String!): String!
    addPaymentMethod(type: String!): PaymentMethod!
    placeOrder(restaurantId: ID!, items: [OrderItemInput!]!): Order!
    updateUser(name: String!, country: Country!): User!
    cancelOrder(orderId: ID!): Order!
    markOrderPlaced(orderId: ID!): Order!
  }

  input OrderItemInput {
    menuItemId: ID!
    quantity: Int!
  }
`;
export default typeDefs;
//# sourceMappingURL=typeDefs.js.map
import GraphqlAPI from "./gql-api";

export async function listAllOrders(limit, nextToken) {
  const LIST_ALL_ORDERS = `query listPriyankaDevOrders {
    listPriyankaDevOrders(limit: ${limit}, nextToken: ${nextToken}) {
      items {
        orderId
        createdTime
        description
        weight
      }
      nextToken
    }
  }`;

  const { data } = await GraphqlAPI.query(LIST_ALL_ORDERS);
  return data.listPriyankaDevOrders;
}

export async function createOrder(CreatePriyankaDevOrdersInput) {
  const CREATE_ORDER = `mutation createPriyankaDevOrders {
    createPriyankaDevOrders(input: { orderId: "${CreatePriyankaDevOrdersInput.orderId}", createdTime: "${CreatePriyankaDevOrdersInput.createdTime}", description: "${CreatePriyankaDevOrdersInput.description}", weight: "${CreatePriyankaDevOrdersInput.weight}"}) {
      createdTime
      orderId
      description
      weight
    }
  }`;

  const { data } = await GraphqlAPI.mutation(CREATE_ORDER);

  return data.createPriyankaDevOrders;
}

import GraphqlAPI from "./gql-api";

export async function listAllOrders(limit, nextToken) {
  const next_token = nextToken ? `"${nextToken}"` : null;
  const LIST_ALL_ORDERS = `query listPriyankaDevOrders {
    listPriyankaDevOrders(limit: ${limit}, nextToken: ${next_token}) {
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

export async function getOrderById(order_id) {
  const GET_ORDER_BY_ID = `query listPriyankaDevOrders {
    getPriyankaDevOrders(orderId: "${order_id}") {
      createdTime
      description
      orderId
      weight
      orderStatus
    }
  }`;

  const { data } = await GraphqlAPI.query(GET_ORDER_BY_ID);
  return data.getPriyankaDevOrders;
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

export async function updateOrder({ orderId, weight, description, orderStatus }) {
  const UPDATE_ORDER = `mutation createPriyankaDevOrders {
    updatePriyankaDevOrders(input: { orderId: "${orderId}", weight: "${weight}", description: "${description}", orderStatus: "${orderStatus}" }) {
      orderId
    }
  }`;
  const { data } = await GraphqlAPI.mutation(UPDATE_ORDER);

  return data.updatePriyankaDevOrders;
}

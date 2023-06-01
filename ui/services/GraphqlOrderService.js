import GraphqlAPI from './gql-api'

export async function listAllOrders() {
  console.log("List all orders")
  const LIST_ALL_ORDERS = `query listPriyankaDevOrders {
    listPriyankaDevOrders {
      items {
        createdTime
        orderId
        description
        weight
      }
    }
  }`
  
  try {
    console.log("making query")
  const data  = (await GraphqlAPI.query(LIST_ALL_ORDERS)) 
  console.log(data)
  return data.listPriyankaDevOrders
}
catch(err) {
  console.log(err)
}

}

export async function createOrder(CreatePriyankaDevOrdersInput) {
  const CREATE_ORDER = `mutation createPriyankaDevOrders {
    createPriyankaDevOrders(input: { orderId: "${CreatePriyankaDevOrdersInput.orderId}", createdTime: "${CreatePriyankaDevOrdersInput.createdTime}", description: "${CreatePriyankaDevOrdersInput.description}", weight: "${CreatePriyankaDevOrdersInput.weight}"}) {
      createdTime
      orderId
      description
      weight
    }
  }`

  const { data } = (await GraphqlAPI.mutation(CREATE_ORDER))

  return data.createPriyankaDevOrders
}

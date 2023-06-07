module "priyanka_api" {
  source = "./modules/appsync"

  env            = var.env
  app_env        = local.app_env
  name           = "graphql-api"
  region         = var.region
  schema         = file("../api/schema.graphql")
  oidc_issuer    = var.oidc_issuer
  oidc_client_id = var.oidc_client_id
  use_api_key    = var.use_api_key
  statements = [
    {
      actions   = ["lambda:InvokeFunction"]
      resources = ["arn:aws:lambda:${var.region}:${data.aws_caller_identity.current.account_id}:function:${local.app_env}*"]
    }
  ]
}


resource "aws_appsync_datasource" "priyanka-orders" {
  api_id           = module.priyanka_api.appsync_id
  name             = "priyanka${var.env}orders"
  service_role_arn = module.priyanka_api.appsync_role_arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.priyanka-orders.name
  }
}

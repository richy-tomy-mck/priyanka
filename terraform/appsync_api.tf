module "course_api" {
  source = "./modules/appsync"

  env                  = var.env
  app_env              = local.app_env
  name                 = "course-api"
  region               = var.region
  schema               = file("../api/schema.graphql")
  oidc_issuer          = var.oidc_issuer
  oidc_client_id       = var.oidc_client_id
  use_api_key_for_auth = var.use_api_key_for_auth
  internal_ips         = var.internal_ips
  statements = [
    {
      actions   = ["lambda:InvokeFunction"]
      resources = ["arn:aws:lambda:${var.region}:${data.aws_caller_identity.current.account_id}:function:${local.app_env}*"]
    }
  ]
}

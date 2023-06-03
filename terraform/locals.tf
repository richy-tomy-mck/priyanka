locals {
  app_env = "${var.app_name}-${var.env}"
  #fqdn                      = var.domain_name == null ? "" : "${var.subdomain}.${var.domain_name}"
  fqdn                      = var.domain_name == null ? "" : var.domain_name
  default_request_template  = file("../api/lambda.default.request.vtl")
  default_response_template = file("../api/lambda.default.response.vtl")
  enable_logging            = var.env == "dev" || var.env == "stage" || var.env == "prod" ? true : false
}


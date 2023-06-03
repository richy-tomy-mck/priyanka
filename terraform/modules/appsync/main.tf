terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.57"
    }
  }
}

resource "aws_appsync_graphql_api" "this" {
  name                = local.app_env_name
  authentication_type = var.use_api_key ? "API_KEY" : "OPENID_CONNECT"
  schema              = var.schema
  dynamic "openid_connect_config" {
    for_each = var.use_api_key ? [] : [1]
    content {
      issuer    = var.oidc_issuer
      client_id = var.oidc_client_id
    }
  }
  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.api_logging_role.arn
    exclude_verbose_content  = false
    field_log_level          = "ALL"
  }
}

resource "aws_appsync_api_cache" "this" {
  count                      = var.enable_caching == true ? 1 : 0
  api_id                     = aws_appsync_graphql_api.this.id
  api_caching_behavior       = "PER_RESOLVER_CACHING"
  type                       = var.cache_size
  ttl                        = 900
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
}

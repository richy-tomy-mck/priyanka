output "appsync_id" {
  description = "The appsync API Id."
  value       = aws_appsync_graphql_api.this.id
}

output "appsync_role_arn" {
  description = "The appsync service role arn for data sources."
  value       = aws_iam_role.this.arn
}

output "appsync_domain" {
  description = "The domain for the appsync endpoint."
  value       = trimsuffix(trimprefix(aws_appsync_graphql_api.this.uris["GRAPHQL"], "https://"), "/graphql")
}

output "appsync_url" {
  description = "The url for the appsync endpoint."
  value       = trimsuffix(aws_appsync_graphql_api.this.uris["GRAPHQL"], "/graphql")
}
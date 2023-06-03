locals {
  app_env = "${var.app_name}-${var.env}"
  #fqdn                      = var.domain_name == null ? "" : "${var.subdomain}.${var.domain_name}"
  fqdn                      = var.domain_name == null ? "" : var.domain_name
  default_request_template  = file("../api/lambda.default.request.vtl")
  default_response_template = file("../api/lambda.default.response.vtl")
  content_securty_policy    = "default-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://auth.int.mckinsey.id ${module.course_api.appsync_url} https://${aws_s3_bucket.background_assets.bucket}.s3.amazonaws.com; img-src 'self' https://ddls-cdn.s3.amazonaws.com/ https://www.mckinsey.com/ http://www.w3.org/2000/svg; font-src 'self' https://cdn.mckinsey.com/; media-src 'self' https://${aws_s3_bucket.background_assets.bucket}.s3.amazonaws.com;"
  curator_request_template  = "${path.root}/../api/lambda.contributor.request.vtl"
  headers_request_template  = "${path.root}/../api/lambda.default.withheader.request.vtl"
  enable_logging            = var.env == "dev" || var.env == "stage" || var.env == "prod" ? true : false
}

locals {
  videoAssetsTable          = module.dynamodb_tables.tables["videoAssets"]
  videoAssetsKey            = module.dynamodb_tables.keys["videoAssets"]
  producedVideoAssetsTable  = module.dynamodb_tables.tables["producedVideoAssets"]
  producedVideoAssetsKey    = module.dynamodb_tables.keys["producedVideoAssets"]
  coursesTable              = module.dynamodb_tables.tables["courses"]
  coursesKey                = module.dynamodb_tables.keys["courses"]
  phoneticTable             = module.dynamodb_tables.tables["phonetic"]
  phoneticKey               = module.dynamodb_tables.keys["phonetic"]
  knowledgeAssessmentsTable = module.dynamodb_tables.tables["knowledgeAssessments"]
  knowledgeAssessmentsKey   = module.dynamodb_tables.keys["knowledgeAssessments"]
  userCourseMetricsTable    = module.dynamodb_tables.tables["userCourseMetrics"]
  userCourseMetricsKey      = module.dynamodb_tables.keys["userCourseMetrics"]
}

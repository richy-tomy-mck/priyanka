variable "app_name" {
  type        = string
  description = "The name of the app."
}

variable "env" {
  type        = string
  description = "The environment name for the app."
}

variable "region" {
  type        = string
  description = "The region the infrastructure is deployed to."
}

variable "domain_name" {
  type        = string
  default     = null
  description = "The domain name for the API."
}

variable "oidc_issuer" {
  type        = string
  default     = null
  description = "The OIDC issuer for the API."
}

variable "oidc_client_id" {
  type        = string
  default     = null
  description = "The OIDC client ID for the API."
}

variable "use_api_key" {
  type        = bool
  default     = false
  description = "Should an API key be used for authentication?"
}

variable "non_default_request_templates" {
  type = map(string)
  default = {
  }
}

variable "non_default_response_templates" {
  type = map(string)
  default = {
  }
}

variable "s3_log_retention_days" {
  type        = number
  default     = 120
  description = "The number of days to retain S3 logs."
}

variable "default_cloudwatch_log_group_retention_in_days" {
  type        = number
  default     = 120
  description = "value in days to set the default retention in CloudWatch Log Groups"
}
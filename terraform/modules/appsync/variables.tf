variable "app_env" {
  type        = string
  description = "The app namee and env."
}

variable "name" {
  type        = string
  description = "The name of the module."
}

variable "cache_size" {
  type        = string
  default     = "SMALL"
  description = "The size of the API cache"

  validation {
    condition = contains([
      "SMALL",
      "MEDIUM",
      "LARGE",
      "XLARGE",
      "LARGE_2X",
      "LARGE_4X",
      "LARGE_8X",
      "LARGE_12X"
    ], var.cache_size)
    error_message = "Invalid cache_size variable."
  }
}

variable "enable_caching" {
  type        = bool
  default     = false
  description = "Should caching be enabled?"
}

variable "env" {
  type        = string
  description = "The environment name for the app."
}

variable "region" {
  type        = string
  description = "The region the infrastructure is deployed to."
}

variable "schema" {
  type        = string
  description = "The schema for the API."
}

variable "statements" {
  default = [
    {
      actions   = ["lambda:InvokeFunction"]
      resources = ["*"]
    }
  ]
  description = "The lambda iam policy document statements. The default is lambda:InvokeFunction on all lambdas."
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
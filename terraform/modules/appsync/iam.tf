data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = ["appsync.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "this" {
  count = var.statements != [] ? 1 : 0
  dynamic "statement" {
    for_each = var.statements

    content {
      sid           = lookup(statement.value, "sid", replace(statement.key, "/[^0-9A-Za-z]*/", ""))
      effect        = lookup(statement.value, "effect", null)
      actions       = lookup(statement.value, "actions", null)
      not_actions   = lookup(statement.value, "not_actions", null)
      resources     = lookup(statement.value, "resources", null)
      not_resources = lookup(statement.value, "not_resources", null)

      dynamic "principals" {
        for_each = lookup(statement.value, "principals", [])
        content {
          type        = principals.value.type
          identifiers = principals.value.identifiers
        }
      }

      dynamic "not_principals" {
        for_each = lookup(statement.value, "not_principals", [])
        content {
          type        = not_principals.value.type
          identifiers = not_principals.value.identifiers
        }
      }

      dynamic "condition" {
        for_each = lookup(statement.value, "condition", [])
        content {
          test     = condition.value.test
          variable = condition.value.variable
          values   = condition.value.values
        }
      }
    }
  }
}

resource "aws_iam_role" "this" {
  name               = "${local.app_env_name}-appsync-${var.region}"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy" "this" {
  name   = "${local.app_env_name}-appsync"
  role   = aws_iam_role.this.id
  policy = data.aws_iam_policy_document.this[0].json
}

data "aws_iam_policy_document" "api_logging_assume_role" {
  statement {
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = ["appsync.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "api_logging_policy" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "arn:aws:logs:*:*:*"
    ]
  }
}

resource "aws_iam_role" "api_logging_role" {
  name               = "${local.app_env_name}-appsync-${var.region}-logging"
  assume_role_policy = data.aws_iam_policy_document.api_logging_assume_role.json
}

resource "aws_iam_role_policy" "api_logging_policy" {
  name   = "${local.app_env_name}-appsync-logging"
  role   = aws_iam_role.api_logging_role.id
  policy = data.aws_iam_policy_document.api_logging_policy.json
}

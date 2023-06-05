module "lambda_datasources_course" {
  source = "./modules/lambda_datasource"

  dist_sub_dir     = "dist/orders"
  env              = var.env
  app_name         = var.app_name
  region           = var.region
  appsync_id       = module.priyanka_api.appsync_id
  appsync_role_arn = module.priyanka_api.appsync_role_arn

  default_statements = [
    {
      actions = [
        "kms:Decrypt",
      ]
      effect = "Allow"
      resources = [
        local.coursesKey.arn
      ]
    }
  ]
  default_env_vars = {
    POWERTOOLS_LOGGER_LOG_EVENT = true
    ENV                         = var.env
    COURSES_TABLE_NAME          = local.coursesTable.id
  }
  functions = {
    createCourse = {
      fn_name          = "createCourse"
      resolver_type    = "Mutation"
      source_dir       = "${path.root}/../lambda/out/createCourse"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:GetItem",
            "dynamodb:PutItem",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    deleteCourse = {
      fn_name          = "deleteCourse"
      resolver_type    = "Mutation"
      source_dir       = "${path.root}/../lambda/out/deleteCourse"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:GetItem",
            "dynamodb:UpdateItem",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    listCourses = {
      fn_name          = "listCourses"
      resolver_type    = "Query"
      source_dir       = "${path.root}/../lambda/out/listCourses"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:Query",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    listCourseAssetUtilization = {
      fn_name          = "listCourseAssetUtilization"
      resolver_type    = "Query"
      source_dir       = "${path.root}/../lambda/out/listCourseAssetUtilization"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:Query",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    readCourse = {
      fn_name          = "readCourse"
      resolver_type    = "Query"
      source_dir       = "${path.root}/../lambda/out/readCourse"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:GetItem",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    listPublishedCourses = {
      fn_name          = "listPublishedCourses"
      resolver_type    = "Query"
      source_dir       = "${path.root}/../lambda/out/listPublishedCourses"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.headers_request_template
      statements = [
        {
          actions = [
            "dynamodb:Query",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    readPublishedCourse = {
      fn_name          = "readPublishedCourse"
      resolver_type    = "Query"
      source_dir       = "${path.root}/../lambda/out/readPublishedCourse"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      statements = [
        {
          actions = [
            "dynamodb:GetItem",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    listCourseChildAssets = {
      fn_name          = "listCourseChildAssets"
      resolver_type    = "Query"
      source_dir       = "${path.root}/../lambda/out/listCourseChildAssets"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      env_vars = {
        VIDEO_ASSETS_TABLE_NAME         = local.videoAssetsTable.id
        KNOWLEDGE_ASSESSMENT_TABLE_NAME = local.knowledgeAssessmentsTable.id

      }
      statements = [
        {
          actions = [
            "dynamodb:Query",
            "kms:Decrypt",
          ]
          effect = "Allow"
          resources = [
            "${local.videoAssetsTable.arn}/*",
            local.videoAssetsTable.arn,
            local.videoAssetsKey.arn,
            "${local.knowledgeAssessmentsTable.arn}/*",
            local.knowledgeAssessmentsTable.arn,
            local.knowledgeAssessmentsKey.arn
          ]
        },
      ]
    },
    updateCourse = {
      fn_name          = "updateCourse"
      resolver_type    = "Mutation"
      source_dir       = "${path.root}/../lambda/out/updateCourse"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:GetItem",
            "dynamodb:UpdateItem",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    createCourseVersion = {
      fn_name          = "createCourseVersion"
      resolver_type    = "Mutation"
      source_dir       = "${path.root}/../lambda/out/createCourseVersion"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:GetItem",
            "dynamodb:UpdateItem",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    },
    deleteCourseVersion = {
      fn_name          = "deleteCourseVersion"
      resolver_type    = "Mutation"
      source_dir       = "${path.root}/../lambda/out/deleteCourseVersion"
      lambda_layer_arn = [aws_lambda_layer_version.dependencies.arn]
      timeout          = 30
      request_template = local.curator_request_template
      statements = [
        {
          actions = [
            "dynamodb:GetItem",
            "dynamodb:UpdateItem",
          ]
          effect = "Allow"
          resources = [
            "${local.coursesTable.arn}/*",
            local.coursesTable.arn
          ]
        },
      ]
    }
  }
}

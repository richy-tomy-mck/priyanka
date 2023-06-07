resource "aws_dynamodb_table" "priyanka-orders" {
  name           = "priyanka-dev-orders"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "orderId"

  attribute {
    name = "orderId"
    type = "S"
  }

  tags = {
    Name        = "priyanka"
    Environment = "dev"
  }
}
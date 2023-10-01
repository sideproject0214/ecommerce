# ch11-7
locals {
  login_server = azurerm_container_registry.container_registry.login_server
  username = azurerm_container_registry.container_registry.admin_username
  password = azurerm_container_registry.container_registry.admin_password
}

module "gateway-microservices" {
  source = "./modules"
  app_version = var.app_version
  service_name = "gateway"
  service_type = "LoadBalancer"
  session_affinity = "ClientIP"
  login_server = local.login_server
  username = local.username
  password = local.password
  port ={
    http = 80
    https = 443
  }
  # target_port ={
  #   http = 80
  #   https = 443
  # }
  # 원본
  # port = 80
  # target_port = 80
}


module "api-microservices" {
  source = "./modules"
  app_version = var.app_version
  service_name = "api"
  login_server = local.login_server
  username = local.username
  password = local.password
  env = {
    NODE_ENV = "production"
  }
  port = {
    default = 8080
  }
  # target_port = {
  #   default = 8080
  # }
  # 원본
  # port = 8080
  # target_port = 8080
}

module "client-microservices" {
  source = "./modules"
  app_version = var.app_version
  service_name = "client"
  login_server = local.login_server
  username = local.username
  password = local.password
  env = {
    NODE_ENV = "production"
  }
  port = {
    default = 5173
  }
  # target_port = {
  #   default = 5173
  # }
  # 원본
  # port = 5173
  # target_port = 5173
}

module "db-microservices" {
  source = "./modules"
  app_version = var.app_version
  service_name = "db"
  login_server = local.login_server
  username = local.username
  password = local.password
  port = {
    default = 5432
  }
  # target_port = {
  #   default = 5432
  # }
  # 원본
  # port = 5432
  # target_port = 5432
}